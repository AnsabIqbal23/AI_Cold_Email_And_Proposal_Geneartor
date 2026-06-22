import type { BusinessInfo } from "@/lib/types";

interface Props {
  value: BusinessInfo;
  onChange: (patch: Partial<BusinessInfo>) => void;
}

function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <span
        className="flex h-5 w-5 shrink-0 mt-px items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        {step}
      </span>
      <div>
        <h2
          className="text-sm font-semibold leading-none"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export function BusinessInfoFields({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-7">
      <section>
        <SectionHeader
          step={1}
          title="Your offer"
          subtitle="What you do and who you're pitching to"
        />

        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="service"
              className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
              style={{ color: "var(--color-text-secondary)" }}
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
                className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
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
                className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Industry
              </label>
              <input
                id="targetIndustry"
                type="text"
                className="form-input"
                placeholder="e.g. SaaS, E-commerce"
                value={value.targetIndustry}
                onChange={(e) => onChange({ targetIndustry: e.target.value })}
              />
            </div>
          </div>
        </div>
      </section>

      <div
        className="h-px"
        style={{ backgroundColor: "var(--color-border)" }}
      />

      <section>
        <SectionHeader
          step={2}
          title="The pitch"
          subtitle="The problem you solve and the outcome you deliver"
        />

        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="painPoint"
              className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
              style={{ color: "var(--color-text-secondary)" }}
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
              className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Key benefit or result
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
              className="block text-xs font-medium mb-1.5 uppercase tracking-wide"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Personalization hook{" "}
              <span
                className="normal-case"
                style={{ color: "var(--color-text-secondary)", opacity: 0.7 }}
              >
                (optional)
              </span>
            </label>
            <textarea
              id="personalizationHook"
              rows={2}
              className="form-input resize-none"
              placeholder="e.g. I saw your recent post about scaling the engineering team"
              value={value.personalizationHook ?? ""}
              onChange={(e) =>
                onChange({ personalizationHook: e.target.value })
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
