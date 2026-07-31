import { formatComparisonCell } from "@/lib/inr-currency";
import type { InrCurrency, InrExchangeRates, InrPricingComparisonRow } from "@/types/inr-pricing";

type InrPricingComparisonTableProps = {
  title: string;
  description?: string;
  starterLabel: string;
  businessLabel: string;
  enterpriseLabel: string;
  rows: InrPricingComparisonRow[];
  currency: InrCurrency;
  rates: InrExchangeRates;
  tabId?: string;
};

export function InrPricingComparisonTable({
  title,
  description,
  starterLabel,
  businessLabel,
  enterpriseLabel,
  rows,
  currency,
  rates,
  tabId,
}: InrPricingComparisonTableProps) {
  return (
    <div className="inr-pricing-comparison mt-12">
      <h3 className="inr-pricing-comparison-title">{title}</h3>
      {description && <p className="inr-pricing-comparison-desc">{description}</p>}

      <div
        className={`inr-pricing-comparison-table-wrap mt-6 overflow-hidden rounded-3xl${
          tabId === "transformation" ? " inr-pricing-comparison-transformation" : ""
        }`}
      >
        <div className="overflow-x-auto">
          <table className="inr-pricing-comparison-table w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">{starterLabel}</th>
                <th scope="col" className="inr-pricing-comparison-col-featured">
                  {businessLabel}
                </th>
                <th scope="col">{enterpriseLabel}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  {(["starter", "business", "enterprise"] as const).map((col) => (
                    <td
                      key={col}
                      className={col === "business" ? "inr-pricing-comparison-col-featured" : undefined}
                    >
                      {formatComparisonCell(row[col], currency, rates)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
