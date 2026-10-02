import { CaseStudy } from "@/components/CaseStudy";
import { DispatchDemo } from "@/components/dispatch-demo/DispatchDemo";

export default function AiDispatchingPage() {
  return (
    <CaseStudy
      eyebrow="Optimal Dynamics · Tech lead, frontend · 2021–25"
      title="Dispatching: AI recommendations people can trust"
      lede="The flagship product of an AI decision platform for freight logistics. I led its frontend from concept to v1 in four months — the interfaces where dispatchers act on, question and override machine recommendations."
      demo={<DispatchDemo />}
      demoCaption="Illustrative recreation — not the production UI. All data is fictional. Click a row to open the slide-out."
      facts={[
        { label: "Role", value: "Tech lead · frontend" },
        { label: "Timeline", value: "Concept → v1 in 4 months" },
        { label: "Stack", value: "React · TypeScript · LaunchDarkly" },
        { label: "Uptime", value: "99.99%+" },
      ]}
      whatIDid={[
        {
          label: "Product",
          body: "Wrote user stories and ran sprint planning and retros as team second-in-command.",
        },
        {
          label: "Design",
          body: "Human-in-the-loop flows: when to trust, question or override the model.",
        },
        {
          label: "Engineering",
          body: "Live-updating UI, feature flags, canaries and kill-switches; component library foundation.",
        },
      ]}
      chapters={[
        {
          number: "01",
          title: "The problem",
          body: "Freight dispatchers make dozens of high-stakes assignment decisions a shift. An ML model could recommend better ones — but only if people understood and trusted it enough to act.",
        },
        {
          number: "02",
          title: "Recommendations that move",
          body: "Recommendations refresh on 1–5 minute cycles. The UI updates in place without losing a dispatcher's place or selection, and makes it obvious what changed.",
        },
        {
          number: "03",
          title: "Explain the why",
          body: "LLM-powered explanations sit beside each recommendation, so dispatchers can see the reasoning before committing a truck.",
        },
        {
          number: "04",
          title: "Overrides that teach",
          body: "When a dispatcher chooses differently, the override flow records why — feeding the model team real signal instead of silent disagreement.",
        },
        {
          number: "05",
          title: "Shipping safely",
          body: "Mission-critical tooling can't go down mid-shift. Feature flags (LaunchDarkly), canary deployments and instant kill-switches kept uptime at 99.99%+ while we shipped weekly.",
        },
      ]}
      nextProject={{ href: "/work/rescue-analytics", title: "Dispatch analytics at Rescue.co" }}
    />
  );
}
