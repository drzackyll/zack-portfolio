export type Discipline = "Product" | "Frontend" | "Design systems" | "Data & AI";

export interface WorkItem {
  name: string;
  org: string;
  role: string;
  short: string;
  disciplines: Discipline[];
  href: string;
}

export const workItems: WorkItem[] = [
  {
    name: "Dispatch analytics platform",
    org: "Rescue.co",
    role: "Product owner",
    short: "Superset + Mapbox analytics for emergency response across Kenya.",
    disciplines: ["Product", "Data & AI"],
    href: "/work/rescue-analytics",
  },
  {
    name: "AI Dispatching",
    org: "Optimal Dynamics",
    role: "Tech lead",
    short: "Flagship AI product, concept to v1 in four months.",
    disciplines: ["Frontend", "Data & AI"],
    href: "/work/ai-dispatching",
  },
  {
    name: "Magasin",
    org: "UNICEF",
    role: "Frontend lead",
    short: "A UNICEF Digital Public Good for field-office dashboards.",
    disciplines: ["Frontend", "Product"],
    href: "/work",
  },
  {
    name: "Zyne design system",
    org: "Personal project",
    role: "Designer & engineer",
    short: "Tokens + accessible React primitives, browsable live.",
    disciplines: ["Design systems", "Frontend"],
    href: "/zyne",
  },
  {
    name: "Security Incident Reporting",
    org: "UNICEF EMOPS",
    role: "Project lead",
    short: "Offline-first reporting for highly sensitive field data.",
    disciplines: ["Product"],
    href: "/work",
  },
];

export const disciplines: Discipline[] = ["Product", "Frontend", "Design systems", "Data & AI"];
