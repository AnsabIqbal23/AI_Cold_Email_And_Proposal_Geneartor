import type { BusinessInfo } from "@/lib/types";

interface Props {
  value: BusinessInfo;
  onChange: (patch: Partial<BusinessInfo>) => void;
}

export function BusinessInfoFields({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Your offer
        </h2>

        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--color-text-primary)" }}
          >
            Service or offer
          </label>
          <textarea
            id="service"
            rows={3}
            className="form-input resize-none"
            placeholder="e.g. React frontend development and UI/UX consulting for SaaS products"
            value={value.service}
            onChange={(e) => onChange({ service: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="targetCompany"
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Target company
            </label>
            <input
              id="targetCompany"
              type="text"
              className="form-input"
              placeholder="e.g. Acme Corp"
              value={value.targetCompany}
              onChange={(e) => onChange({ targetCompany: e.target.value })}
            />
          </div>

          <div>
            <label
              htmlFor="targetIndustry"
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--color-text-primary)" }}
            >
              Industry
            </label>
            <input
              id="targetIndustry"
              type="text"
              className="form-input"
              placeholder="e.g. SaaS, E-commerce, Healthcare"
              value={value.targetIndustry}
              onChange={(e) => onChange({ targetIndustry: e.target.value })}
            />
          </div>
        </div>
      </section>

      <div
        className="h-px"
        style={{ backgroundColor: "var(--color-border)" }}
      />

      <section className="flex flex-col gap-4">
        <h2
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-secondary)" }}
        >
          The pitch
        </h2>

        <div>
          <label
            htmlFor="painPoint"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--color-text-primary)" }}
          >
            Pain point you address
          </label>
          <textarea
            id="painPoint"
            rows={3}
            className="form-input resize-none"
            placeholder="e.g. Their checkout flow loses 40% of users at the payment step"
            value={value.painPoint}
            onChange={(e) => onChange({ painPoint: e.target.value })}
          />
        </div>

        <div>
          <label
            htmlFor="keyBenefit"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--color-text-primary)" }}
          >
            Key benefit or result you deliver
          </label>
          <input
            id="keyBenefit"
            type="text"
            className="form-input"
            placeholder="e.g. Reduced cart abandonment by 30% for similar clients"
            value={value.keyBenefit}
            onChange={(e) => onChange({ keyBenefit: e.target.value })}
          />
        </div>

        <div>
          <label
            htmlFor="personalizationHook"
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--color-text-primary)" }}
          >
            Personalization hook{" "}
            <span
              className="font-normal text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              optional
            </span>
          </label>
          <textarea
            id="personalizationHook"
            rows={2}
            className="form-input resize-none"
            placeholder="e.g. I saw your recent post about scaling the engineering team"
            value={value.personalizationHook ?? ""}
            onChange={(e) => onChange({ personalizationHook: e.target.value })}
          />
        </div>
      </section>
    </div>
  );
}
