import Panel from "@/components/Panel";
import { certifications, beyondClass, aboutLabels } from "@/content/about";

function Column({ label, items }) {
  return (
    <div>
      <div className="text-xs uppercase text-dim">{label}</div>
      <div className="mt-6 flex flex-col gap-3.5 text-base text-strong sm:text-[17px]">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default function CertificationsPanel() {
  return (
    <Panel>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-[72px]">
        <Column label={aboutLabels.certifications} items={certifications} />
        <Column label={aboutLabels.beyondClass} items={beyondClass} />
      </div>
    </Panel>
  );
}
