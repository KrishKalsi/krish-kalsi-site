import Panel from "@/components/Panel";
import ConformalChart from "@/components/project/ConformalChart";
import { summarise } from "@/lib/conformal";
import { conformalFigure } from "@/content/projects";

// The 1,000-split means are the expensive part, so all six (method, α)
// readouts are computed here at build time; the client only draws the band.
export default function ConformalFigure() {
  const summaries = summarise(
    conformalFigure.methods.map((m) => m.id),
    conformalFigure.alphas,
  );

  return (
    <Panel as="div">
      <ConformalChart summaries={summaries} />
    </Panel>
  );
}
