import katex from "katex";
import "katex/dist/katex.min.css";

// Rendered on the server; MathML is included so screen readers can read it.
export default function Formula({ tex }) {
  const html = katex.renderToString(tex, { output: "htmlAndMathml", throwOnError: true });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
