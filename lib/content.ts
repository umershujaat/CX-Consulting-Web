export type Problem = {
  title: string;
  description: string;
};

export type ServiceSummary = {
  slug: string;
  title: string;
  outcome: string;
};

export type ApproachStep = {
  step: number;
  name: string;
  purpose: string;
  exampleOutput: string;
};

export type EvaluationDimension = {
  dimension: string;
  measure: string;
};

export type EngagementModel = {
  title: string;
  description: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  questions: string[];
  deliverables: string[];
  note?: string;
};

export type PrincipalProfile = {
  id: "umer" | "deepak";
  name: string;
  title: string;
  bio: string;
  areasOfDepth: string[];
  experienceSummary: string;
  linkedIn: string;
};

export const problems: Problem[] = [
  {
    title: "Use-case ambiguity",
    description:
      "Teams automate what is easy to demo rather than what creates measurable business value.",
  },
  {
    title: "Vendor overload",
    description:
      "Feature lists obscure material differences in architecture, workflow depth, and operational maturity.",
  },
  {
    title: "Weak evaluations",
    description:
      "Happy-path scripts miss hallucinations, tool failures, edge cases, interruptions, and recovery behavior.",
  },
  {
    title: "Incomparable economics",
    description:
      "Per-minute, per-conversation, per-resolution, token, platform, and services fees hide true cost.",
  },
  {
    title: "Production risk",
    description:
      "Reliability, observability, security, privacy, residency, and escalation are addressed too late.",
  },
  {
    title: "Pilot-to-scale gap",
    description:
      "A successful demonstration does not provide a rollout plan, governance model, or production acceptance bar.",
  },
];

export const servicesSummary: ServiceSummary[] = [
  {
    slug: "ai-contact-center-strategy",
    title: "AI Contact Center Strategy",
    outcome:
      "Prioritize journeys where AI assists, automates, or hands off—and define how value will be measured.",
  },
  {
    slug: "vendor-selection-rfp",
    title: "Vendor Selection & RFP",
    outcome:
      "Run an auditable selection process that tests workflows, architecture, risk, and operating fit.",
  },
  {
    slug: "ai-evaluations-acceptance",
    title: "AI Evaluations & Acceptance",
    outcome:
      "Prove systems work across representative and difficult cases before production approval.",
  },
  {
    slug: "pricing-commercial-advisory",
    title: "Pricing & Commercial Advisory",
    outcome:
      "Normalize vendor economics and align pricing units with successful customer outcomes.",
  },
  {
    slug: "agentic-workflow-architecture",
    title: "Agentic Workflow & Architecture",
    outcome:
      "Design how agents retrieve context, call tools, recover from errors, and preserve human accountability.",
  },
  {
    slug: "production-readiness-risk-governance",
    title: "Production Readiness, Risk & Governance",
    outcome:
      "Confirm the platform can operate reliably, safely, and economically under real conditions.",
  },
];

export const approachSteps: ApproachStep[] = [
  {
    step: 1,
    name: "Align",
    purpose: "Prioritize use cases and define measurable outcomes",
    exampleOutput: "Use-case portfolio and business KPI tree",
  },
  {
    step: 2,
    name: "Select",
    purpose: "Compare platforms using buyer-specific requirements",
    exampleOutput: "RFP, weighted scorecard, shortlist, and TCO model",
  },
  {
    step: 3,
    name: "Prove",
    purpose: "Test real workflows, edge cases, and integrations",
    exampleOutput: "Eval dataset, rubric, test report, and acceptance thresholds",
  },
  {
    step: 4,
    name: "Scale",
    purpose: "Design architecture, operations, and rollout",
    exampleOutput: "Production readiness plan and phased deployment roadmap",
  },
  {
    step: 5,
    name: "Govern",
    purpose: "Monitor quality, economics, compliance, and change",
    exampleOutput: "Control framework, review cadence, and improvement backlog",
  },
];

export const evaluationDimensions: EvaluationDimension[] = [
  {
    dimension: "Business outcome",
    measure:
      "Correct resolution, task completion, containment with resolution, conversion, effort, handle-time impact",
  },
  {
    dimension: "AI quality",
    measure:
      "Accuracy, groundedness, hallucination rate, instruction adherence, reasoning consistency, policy compliance",
  },
  {
    dimension: "Workflow execution",
    measure:
      "Tool-selection accuracy, parameter accuracy, API success, state management, retries, idempotency, downstream completion",
  },
  {
    dimension: "Real-time experience",
    measure:
      "End-to-end latency, time to first audio, interruption detection, turn-taking, silence handling, transcription and synthesis quality",
  },
  {
    dimension: "Human handoff",
    measure:
      "Transfer success, context preservation, routing accuracy, failure recovery, customer disclosure",
  },
  {
    dimension: "Reliability",
    measure:
      "Availability, failover, graceful degradation, rate limits, capacity, observability, incident response",
  },
  {
    dimension: "Security and compliance",
    measure:
      "PII/PCI handling, access controls, encryption, retention, auditability, data residency, consent, model and vendor risk",
  },
  {
    dimension: "Economics",
    measure:
      "Cost per completed outcome, per-minute and per-conversation cost, token/tool usage, implementation cost, support and overage exposure",
  },
];

export const engagementModels: EngagementModel[] = [
  {
    title: "Executive AI Readiness Diagnostic",
    description:
      "A focused assessment of use cases, architecture, operating readiness, risks, and next decisions.",
  },
  {
    title: "Vendor Selection & RFP Sprint",
    description:
      "Requirements, RFP, scenario design, vendor scoring, references, commercial comparison, and recommendation.",
  },
  {
    title: "Pilot & Evaluation Program",
    description:
      "Evaluation dataset, rubrics, adversarial and edge-case testing, acceptance thresholds, and executive readout.",
  },
  {
    title: "Fractional Buyer-Side Advisor",
    description:
      "Ongoing support across architecture, vendor governance, rollout, executive decisions, and production performance.",
  },
];

export const engagementNote =
  "Typical scope confirmed after discovery.";

export const servicesDetail: ServiceDetail[] = [
  {
    slug: "ai-contact-center-strategy",
    title: "AI Contact Center Strategy",
    questions: [
      "Which customer journeys should use AI?",
      "Where should AI assist, automate, or hand off?",
      "How will value be measured?",
    ],
    deliverables: [
      "Current-state and capability assessment",
      "Use-case inventory and prioritization matrix",
      "Customer-journey and workflow maps",
      "Business KPI tree and value hypothesis",
      "Build, buy, partner, or extend recommendation",
      "Target operating model and phased roadmap",
    ],
  },
  {
    slug: "vendor-selection-rfp",
    title: "Vendor Selection & RFP",
    questions: [
      "Which platform fits our workflows, architecture, risk profile, and operating model?",
      "How do we make the decision auditable?",
    ],
    deliverables: [
      "Requirements and vendor landscape",
      "RFI/RFP document",
      "Weighted decision rubric",
      "Realistic demo and proof-of-concept scenarios",
      "Architecture, security, and integration questionnaire",
      "Shortlist, scorecard, reference-check guide, and recommendation",
    ],
  },
  {
    slug: "ai-evaluations-acceptance",
    title: "AI Evaluations & Acceptance",
    questions: [
      "Does the system work across representative and difficult cases?",
      "What evidence is sufficient to approve production?",
    ],
    deliverables: [
      "Golden dataset and scenario taxonomy",
      "Rubric and metric definitions",
      "Happy-path, edge-case, adversarial, and regression test suites",
      "Human and automated evaluation plan",
      "Voice and real-time experience test plan",
      "Pilot acceptance thresholds and executive results report",
    ],
  },
  {
    slug: "pricing-commercial-advisory",
    title: "Pricing & Commercial Advisory",
    questions: [
      "What will the platform cost at scale?",
      "Which pricing unit aligns vendor incentives with successful customer outcomes?",
    ],
    deliverables: [
      "Normalized price comparison",
      "Workload and volume model",
      "Three-year total cost of ownership model",
      "Cost-per-successful-outcome analysis",
      "Overage, minimum-commit, professional-services, support, and renewal risk review",
      "Negotiation priorities and commercial redlines in partnership with the customer's procurement and legal teams",
    ],
    note: "The firm provides commercial and product advice, not legal advice.",
  },
  {
    slug: "agentic-workflow-architecture",
    title: "Agentic Workflow & Architecture",
    questions: [
      "How will an agent retrieve context, make decisions, call tools, update systems, recover from errors, and preserve human accountability?",
    ],
    deliverables: [
      "End-to-end workflow and tool-call design",
      "CRM, CCaaS, identity, knowledge, data, and system-of-record integration map",
      "State, memory, permissions, and human-approval design",
      "Failure modes, retry, rollback, and escalation patterns",
      "Model, orchestration, and observability requirements",
      "Reference architecture and implementation backlog",
    ],
  },
  {
    slug: "production-readiness-risk-governance",
    title: "Production Readiness, Risk & Governance",
    questions: [
      "Can the platform operate reliably, safely, and economically under real production conditions?",
    ],
    deliverables: [
      "Production readiness review",
      "Reliability and capacity requirements",
      "Security, privacy, compliance, and data-handling controls",
      "Operational telemetry and quality dashboard design",
      "Incident, rollback, and business-continuity plan",
      "Model/prompt/workflow change-management and regression policy",
      "Executive governance cadence and KPI framework",
    ],
  },
];

export const approachPage = {
  intro:
    "We meet teams where they are—whether you are prioritizing use cases, running an RFP, validating a pilot, or preparing for production. The Align → Select → Prove → Scale → Govern method is modular; you can engage for a single stage or a connected program.",
  metricLayers: [
    {
      title: "Business metrics",
      description:
        "Resolution quality, task completion, conversion, effort, and handle-time impact that leadership already cares about.",
    },
    {
      title: "AI metrics",
      description:
        "Accuracy, groundedness, hallucination rate, instruction adherence, and policy compliance under realistic prompts.",
    },
    {
      title: "System metrics",
      description:
        "Latency, interruption handling, tool success, failover, capacity, and observability across the real-time path.",
    },
    {
      title: "Risk metrics",
      description:
        "Security, privacy, residency, auditability, consent, and model/vendor risk that can block deployment.",
    },
    {
      title: "Unit economics",
      description:
        "Cost per completed outcome, usage drivers, overage exposure, and implementation and support load at scale.",
    },
  ],
  goodEvidence: [
    "Representative and adversarial scenarios tied to your workflows—not vendor happy paths.",
    "Acceptance thresholds agreed before the pilot, not after a polished demo.",
    "Evidence that covers business outcomes, AI behavior, system performance, risk, and economics together.",
    "Artifacts procurement, security, and executive stakeholders can audit later.",
  ],
  continuityNote:
    "Production monitoring must reuse the same evaluation taxonomy used during selection and pilot. Otherwise quality drifts, regressions hide in new prompts or tools, and leadership loses a shared definition of “good enough.”",
};

export const aboutPage = {
  jointStatement:
    "We built this advisory practice because enterprise AI contact-center and agentic programs stall for predictable reasons: unclear use cases, vendor demos that do not transfer to production, evaluations that miss edge cases, commercial models that hide true cost, and governance that arrives too late. We work as senior operators—directly involved—to help buyers make defensible decisions from strategy through production readiness. Both Umer and Deepak hold MBAs from UC Berkeley and Cornell, bring technical backgrounds, and have years of industry experience across enterprise AI and customer experience.",
};

export const principalProfiles: PrincipalProfile[] = [
  {
    id: "umer",
    name: "Umer Rabbani",
    title: "Director of Product Agentic Applications",
    bio: "Umer is a product executive with a technical background and 13+ years of industry experience across enterprise SaaS, customer-service AI, voice AI, and cloud contact centers. His experience includes building and scaling platforms at Salesforce, Five9, Genesys, and Uniphore; designing AI evaluation frameworks; and taking enterprise voice and agentic workflows from use-case definition through pilot and production readiness.",
    areasOfDepth: [
      "AI contact centers and voice AI",
      "AI evaluations and production telemetry",
      "Real-time voice infrastructure and telephony",
      "CCaaS product strategy and pricing",
      "Pilot-to-production execution",
      "Reliability, global voice compliance, and enterprise integrations",
    ],
    experienceSummary:
      "MBA (UC Berkeley / Cornell). Product leadership across Salesforce, Five9, Genesys, and Uniphore spanning contact-center platforms, voice AI, evaluations, and production readiness.",
    linkedIn: "https://www.linkedin.com/in/umer-rabbani/",
  },
  {
    id: "deepak",
    name: "Deepak Dutta",
    title: "General Manager & Global Vice President",
    bio: "Deepak is an enterprise product and customer-engagement executive with a technical background and more than 25 years of industry experience. At Meta, he worked across Business Messaging, real-time communications, conversational AI, and agentic business experiences supporting interactions at global scale. His experience also includes leading enterprise AI application portfolios and connecting customer experience, messaging, data, and workflow execution.",
    areasOfDepth: [
      "Enterprise and conversational AI strategy",
      "Agentic applications and customer engagement",
      "Business messaging and conversational commerce",
      "Real-time communications at global scale",
      "Portfolio strategy and 0-to-1 product creation",
      "AI platform and workflow ecosystems",
    ],
    experienceSummary:
      "MBA (UC Berkeley / Cornell). Enterprise product and customer-engagement leadership including Meta work across messaging, real-time communications, conversational AI, and agentic experiences.",
    linkedIn: "https://www.linkedin.com/in/deepakdutta1/",
  },
];

/** Seed titles only — do not invent fake published articles. */
export const insightSeedTitles: string[] = [
  "A Practical RFP for Enterprise AI Contact Centers",
  "How to Build an Evaluation Rubric for Voice AI",
  "Comparing the Real Cost of Agentic Customer Service Platforms",
  "Why Containment Is Not the Same as Resolution",
  "Production Readiness for Voice AI: Latency, Interruptions, and Handoff",
  "Governing Tool-Calling Agents Across Enterprise Systems",
];

export const programStages = [
  "Exploring",
  "Preparing an RFP",
  "Selecting a vendor",
  "Running a pilot",
  "Preparing for production",
  "Scaling an existing deployment",
] as const;

export const timingOptions = [
  "Immediately",
  "Within 30 days",
  "This quarter",
  "Later / researching",
] as const;

export type ProgramStage = (typeof programStages)[number];
export type TimingOption = (typeof timingOptions)[number];
