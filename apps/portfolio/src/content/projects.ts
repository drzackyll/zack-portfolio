export interface Project {
  name: string;
  org: string;
  role: string;
  short: string;
  disciplines: string;
  image: string | null;
  imagePosition: string;
  href: string;
}

export const projects: Project[] = [
  {
    name: "Dispatch analytics platform",
    org: "Rescue.co",
    role: "Product owner",
    short: "Superset + Mapbox analytics for emergency response across Kenya.",
    disciplines: "Product · Data & AI",
    image: "/images/rescue-dashboard.png",
    imagePosition: "center 62%",
    href: "/work/rescue-analytics",
  },
  {
    name: "AI Dispatching",
    org: "Optimal Dynamics",
    role: "Tech lead",
    short: "Flagship AI product, concept to v1 in four months.",
    disciplines: "Frontend · Data & AI",
    image: "/images/home-dispatch-v4.png",
    imagePosition: "center top",
    href: "/work/ai-dispatching",
  },
  {
    name: "Magasin",
    org: "UNICEF",
    role: "Frontend lead",
    short: "A UNICEF Digital Public Good for field-office dashboards.",
    disciplines: "Frontend · Product",
    image: null,
    imagePosition: "center",
    href: "/work",
  },
  {
    name: "Zyne design system",
    org: "Personal project",
    role: "Designer & engineer",
    short: "Tokens + accessible React primitives, browsable live.",
    disciplines: "Design systems · Frontend",
    image: "/images/home-zyne-v4.png",
    imagePosition: "center top",
    href: "/zyne",
  },
];

export const jobs = [
  { org: "Rescue.co", role: "Product + analytics" },
  { org: "Optimal Dynamics", role: "Sr. engineer · Tech lead" },
  { org: "UNICEF HQ", role: "Engineer · Data" },
];
