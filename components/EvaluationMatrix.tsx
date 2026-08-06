import type { EvaluationDimension } from "@/lib/content";

type EvaluationMatrixProps = {
  dimensions: EvaluationDimension[];
};

export function EvaluationMatrix({ dimensions }: EvaluationMatrixProps) {
  return (
    <div>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-hidden rounded-lg border border-navy/10 md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Evaluation dimensions and what to measure
          </caption>
          <thead className="bg-navy text-white">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                Dimension
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                What to measure
              </th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((row, index) => (
              <tr
                key={row.dimension}
                className={index % 2 === 0 ? "bg-white" : "bg-off-white"}
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-5 py-4 align-top font-semibold text-navy"
                >
                  {row.dimension}
                </th>
                <td className="px-5 py-4 leading-relaxed text-slate">
                  {row.measure}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <ul className="grid gap-3 md:hidden">
        {dimensions.map((row) => (
          <li
            key={row.dimension}
            className="rounded-lg border border-navy/10 bg-white p-4"
          >
            <h3 className="text-sm font-semibold text-navy">{row.dimension}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              {row.measure}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-3 hidden text-xs text-slate sm:block md:hidden">
        Tip: swipe or scroll the section if needed; each dimension is listed as
        a card for easier reading on small screens.
      </p>
    </div>
  );
}
