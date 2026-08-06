import type { ApproachStep } from "@/lib/content";

type ApproachStepsProps = {
  steps: ApproachStep[];
  detailed?: boolean;
};

export function ApproachSteps({ steps, detailed = false }: ApproachStepsProps) {
  return (
    <ol className="grid gap-4 sm:gap-5">
      {steps.map((step) => (
        <li
          key={step.step}
          className="grid gap-3 rounded-lg border border-navy/10 bg-white p-5 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-6"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
            {step.step}
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-navy">
              {step.name}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate sm:text-base">
              {step.purpose}
            </p>
            <p
              className={`mt-2 text-sm ${detailed ? "text-body" : "text-teal"}`}
            >
              <span className="font-semibold text-navy">Example output: </span>
              {step.exampleOutput}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
