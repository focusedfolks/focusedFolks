"use client";

import { useState, useTransition } from "react";
import { saveContactSettings } from "@/app/admin/(dashboard)/content-actions";

export type ContactValue = {
  email: string;
  phones: { region: string; display: string; href: string }[];
  offices: {
    city: string;
    country: string;
    address: string;
    phone: string;
    phoneHref: string;
    email: string;
    mapQuery: string;
  }[];
};

export function ContactAdminClient({ initial }: { initial: ContactValue | null }) {
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phones, setPhones] = useState(initial?.phones ?? []);
  const [offices, setOffices] = useState(initial?.offices ?? []);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <div>
      <p className="admin-eyebrow">Content</p>
      <h1 className="admin-page-title">Contact settings</h1>
      <p className="admin-page-sub">
        Single source for email, phones, and offices (footer + contact page).
      </p>
      {message && <p className="mt-3 admin-muted">{message}</p>}

      <form
        className="mt-6 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          start(async () => {
            const res = await saveContactSettings({ email, phones, offices });
            setMessage(res.ok ? "Contact settings saved" : res.error);
          });
        }}
      >
        <label className="admin-label">
          Primary email
          <input className="admin-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <div>
          <h2 className="admin-heading text-base font-medium">Phones</h2>
          {phones.map((p, i) => (
            <div key={i} className="admin-tier-card mt-2 grid gap-2 sm:grid-cols-3">
              <input className="admin-input !mt-0" placeholder="Region" value={p.region} onChange={(e) => {
                const next = [...phones]; next[i] = { ...p, region: e.target.value }; setPhones(next);
              }} />
              <input className="admin-input !mt-0" placeholder="Display" value={p.display} onChange={(e) => {
                const next = [...phones]; next[i] = { ...p, display: e.target.value }; setPhones(next);
              }} />
              <input className="admin-input !mt-0" placeholder="tel: link" value={p.href} onChange={(e) => {
                const next = [...phones]; next[i] = { ...p, href: e.target.value }; setPhones(next);
              }} />
            </div>
          ))}
          <button
            type="button"
            className="admin-btn-ghost mt-2"
            onClick={() => setPhones([...phones, { region: "", display: "", href: "" }])}
          >
            + Add phone
          </button>
        </div>

        <div>
          <h2 className="admin-heading text-base font-medium">Offices</h2>
          {offices.map((o, i) => (
            <div key={i} className="admin-tier-card mt-2 space-y-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <input className="admin-input !mt-0" placeholder="City" value={o.city} onChange={(e) => {
                  const next = [...offices]; next[i] = { ...o, city: e.target.value }; setOffices(next);
                }} />
                <input className="admin-input !mt-0" placeholder="Country" value={o.country} onChange={(e) => {
                  const next = [...offices]; next[i] = { ...o, country: e.target.value }; setOffices(next);
                }} />
              </div>
              <input className="admin-input !mt-0" placeholder="Address" value={o.address} onChange={(e) => {
                const next = [...offices]; next[i] = { ...o, address: e.target.value }; setOffices(next);
              }} />
              <div className="grid gap-2 sm:grid-cols-2">
                <input className="admin-input !mt-0" placeholder="Phone" value={o.phone} onChange={(e) => {
                  const next = [...offices]; next[i] = { ...o, phone: e.target.value }; setOffices(next);
                }} />
                <input className="admin-input !mt-0" placeholder="Email" value={o.email} onChange={(e) => {
                  const next = [...offices]; next[i] = { ...o, email: e.target.value }; setOffices(next);
                }} />
              </div>
              <input className="admin-input !mt-0" placeholder="Map query" value={o.mapQuery} onChange={(e) => {
                const next = [...offices]; next[i] = { ...o, mapQuery: e.target.value }; setOffices(next);
              }} />
            </div>
          ))}
          <button
            type="button"
            className="admin-btn-ghost mt-2"
            onClick={() =>
              setOffices([
                ...offices,
                { city: "", country: "", address: "", phone: "", phoneHref: "", email: "", mapQuery: "" },
              ])
            }
          >
            + Add office
          </button>
        </div>

        <button type="submit" disabled={pending} className="admin-btn-primary">
          Save contact settings
        </button>
      </form>
    </div>
  );
}
