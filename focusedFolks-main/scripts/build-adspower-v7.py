"""Generate AdsPower RPA JSON for terraglobaltiles.com (classic RPA, no executeJs)."""
import json
from pathlib import Path

OUT_JSON = Path(r"e:\terraglobaltiles-adspower-natural-visit.json")
OUT_URLS = Path(r"e:\terraglobaltiles-urls.txt")

# Stable selectors (classes / attribute prefixes — avoid volatile ids like aswift_1)
GOOGLE_ADS_BANNER = (
    ".google-auto-placed ins.adsbygoogle, "
    ".google-auto-placed [id^='aswift_'], "
    "ins.adsbygoogle.adsbygoogle-noablate"
)

GOOGLE_ADS_ANNOTATION_ARROW = (
    ".google-auto-placed .goog-rentry[role='link'], "
    ".goog-rentries .goog-rentry[role='link'], "
    ".google-anno-skip.goog-rentry[role='link']"
)

GOOGLE_ADS_POPUP_CLOSE = (
    "#ad_position_box #dismiss-button, "
    "#dismiss-button.close-button-outer[role='button'], "
    ".close-button-outer#dismiss-button"
)

REMARK_ROOT = (
    "Terra v7 - stable google_ads selectors. Random pages. "
    "Banner + annotation arrow + popup dismiss."
)


def wait(min_s, max_s, remark=""):
    return {
        "type": "waitTime",
        "config": {
            "timeoutType": "randomInterval",
            "timeout": 30000,
            "timeoutMin": int(min_s * 1000),
            "timeoutMax": int(max_s * 1000),
            "remark": remark,
        },
    }


def scroll_px(distance):
    return {
        "type": "scrollPage",
        "config": {
            "distance": distance,
            "type": "smooth",
            "scrollType": "pixel",
            "remark": "",
        },
    }


def scroll_pos(position):
    return {
        "type": "scrollPage",
        "config": {
            "distance": 0,
            "type": "smooth",
            "scrollType": "position",
            "position": position,
            "remark": "",
        },
    }


def click_sel(selector, remark, serial_max=3, timeout=25000):
    return {
        "type": "click",
        "config": {
            "selector": selector,
            "serialType": "randomInterval",
            "serial": 1,
            "serialMin": 1,
            "serialMax": serial_max,
            "button": "left",
            "clickType": "one-click",
            "clickAct": "one-click",
            "timeout": timeout,
            "remark": remark,
            "selectorType": "selector",
        },
    }


def click_text(text, remark):
    return {
        "type": "click",
        "config": {
            "selector": text,
            "serialType": "randomInterval",
            "serial": 1,
            "serialMin": 1,
            "serialMax": 5,
            "button": "left",
            "clickType": "one-click",
            "clickAct": "one-click",
            "timeout": 20000,
            "remark": remark,
            "selectorRadio": "TEXT",
        },
    }


def for_times(times, var_name, remark, children):
    return {
        "type": "forTimes",
        "config": {
            "times": times,
            "variableIndex": var_name,
            "remark": remark,
            "children": children,
        },
    }


def goto(url_expr, remark):
    return {
        "type": "gotoUrl",
        "config": {"timeout": 45000, "remark": remark, "url": url_expr},
    }


def go_back(remark=""):
    return {"type": "goBack", "config": {"timeout": 20000, "remark": remark}}


def google_ads_round():
    """One pass: banner -> annotation arrow -> close sidebar popup if shown."""
    return [
        click_sel(GOOGLE_ADS_BANNER, "google_ads: banner / aswift host", serial_max=2),
        wait(1, 2),
        click_sel(
            GOOGLE_ADS_ANNOTATION_ARROW,
            "google_ads: annotation chip (arrow row)",
            serial_max=4,
        ),
        wait(2.5, 5, "After annotation — sidebar may open"),
        click_sel(
            GOOGLE_ADS_POPUP_CLOSE,
            "google_ads: close sidebar (#ad_position_box)",
            serial_max=1,
            timeout=15000,
        ),
        wait(0.8, 1.5),
        click_sel(GOOGLE_ADS_BANNER, "google_ads: banner again", serial_max=2),
        wait(5, 10, "View ad / destination"),
        go_back("Back from ad"),
        wait(1.5, 2.5),
        goto("${random_page_url}", "Restore Terra page"),
        wait(2, 3.5),
    ]


def browse_one_random_page():
    return [
        {
            "type": "randomGet",
            "config": {
                "content": "terra_urls",
                "variable": "random_page_url",
                "remark": "Pick random Terra page",
            },
        },
        goto("${random_page_url}", "Open random page"),
        wait(4, 7, "Landing"),
        click_text("Close, ×, x, Dismiss, Got it, OK, Skip", "Site popup (text)"),
        wait(0.5, 1.2),
        scroll_pos("middle"),
        wait(2, 3.5),
        for_times(
            3,
            "scroll_i",
            "Light scroll",
            [scroll_px(450), wait(1.2, 2.5)],
        ),
        scroll_pos("bottom"),
        wait(2, 4, "Scroll to google_ads zones"),
        for_times(3, "ad_round", "3x google_ads interactions", google_ads_round()),
        scroll_pos("top"),
        wait(1.5, 2.5),
    ]


def build():
    urls = """https://www.terraglobaltiles.com/
https://www.terraglobaltiles.com/about
https://www.terraglobaltiles.com/products
https://www.terraglobaltiles.com/services
https://www.terraglobaltiles.com/market
https://www.terraglobaltiles.com/reach-us
"""
    OUT_URLS.write_text(urls.strip() + "\n", encoding="utf-8")

    steps = [
        {"type": "newPage", "config": {"remark": REMARK_ROOT}},
        {
            "type": "importText",
            "config": {
                "path": str(OUT_URLS),
                "variable": "terra_urls",
                "remark": "Random pages list",
            },
        },
        wait(1, 2, "After import"),
        for_times(6, "random_page_round", "6 random page visits", browse_one_random_page()),
        goto("https://www.terraglobaltiles.com/", "Home finale"),
        wait(2, 3.5),
        for_times(
            2,
            "final_ad",
            "Extra home google_ads",
            [
                scroll_pos("bottom"),
                wait(2, 4),
                *google_ads_round(),
            ],
        ),
        wait(2.5, 4, "Done"),
    ]

    OUT_JSON.write_text(
        json.dumps(steps, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUT_JSON} ({len(steps)} top-level steps)")


if __name__ == "__main__":
    build()
