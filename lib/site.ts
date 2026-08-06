export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  brandName: "CX AI Advisors",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
  positioning:
    "Senior, operator-led advisory for AI contact centers, real-time conversational AI, and agentic workflows.",
  credibilityLine:
    "Built by operators with experience across Meta, Salesforce, Five9, Genesys, and Uniphore.",
  disclaimer:
    "Company names referenced on this site identify prior professional experience and do not imply sponsorship or endorsement.",
  corePromise: "Make enterprise AI work before it meets your customers.",
  heroEyebrow: "Enterprise AI & Contact Center Advisory",
  heroBody:
    "Independent guidance for AI contact centers, real-time conversational AI, and agentic workflows - from strategy and vendor selection through evaluations, commercial design, compliance, and production readiness.",
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Approach", href: "/approach" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ] as const satisfies readonly NavItem[],
  cta: {
    primary: "Book an AI Readiness Call",
    secondary: "Explore Our Services",
    article: "Discuss Your AI Program",
    footer: "Tell Us What You Are Evaluating",
    evaluation: "Build Your Evaluation Framework",
    discussEngagement: "Discuss This Engagement",
    schedule: "Schedule a Time",
  },
  social: {
    title:
      "Enterprise AI Contact Center & Agentic Workflow Advisory | CX AI Advisors",
    description:
      "Independent guidance for AI contact centers and agentic applications: strategy, RFPs, vendor selection, evaluations, pricing, compliance, reliability, and production readiness.",
    twitterHandle: "",
  },
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL ?? "",
  analytics: {
    enabled: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN),
    domain: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN ?? "",
  },
  principals: {
    umer: {
      name: "Umer Rabbani",
      title: "Principal, AI Contact Center & Product Advisory",
      linkedIn: "https://www.linkedin.com/in/umer-rabbani/",
      imageSrc: "/images/umer-rabbani.jpg",
      imageAlt: "Professional headshot of Umer Rabbani",
      initials: "UR",
    },
    deepak: {
      name: "Deepak Dutta",
      title: "General Manager & Global Vice President",
      linkedIn: "https://www.linkedin.com/in/deepakdutta1/",
      imageSrc: "/images/deepak-dutta.png",
      imageAlt: "Professional headshot of Deepak Dutta",
      initials: "DD",
      hasPhoto: true,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function copyrightNotice(year = new Date().getFullYear()): string {
  return `© ${year} ${siteConfig.brandName}. All rights reserved.`;
}
