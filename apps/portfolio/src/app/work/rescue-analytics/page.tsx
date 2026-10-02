import { CaseStudy } from "@/components/CaseStudy";

export default function RescueAnalyticsPage() {
  return (
    <CaseStudy
      eyebrow="Rescue.co · Product owner & engineer · 2025–"
      title="Real-time dispatch data for everyone who needs it"
      lede="I owned the product lifecycle for Rescue.co's emergency dispatch analytics platform — Superset as the shared data hub, Mapbox for live incident tracking, and role-based access so teams, partners and funders each see exactly what they should."
      heroImage={{
        src: "/images/rescue-dashboard.png",
        aspect: "3410/1780",
        caption: "Executive overview in Superset — KPIs by product, pickup heatmap, county breakdown.",
      }}
      facts={[
        { label: "Role", value: "Product owner + engineer" },
        { label: "Stack", value: "Superset · Mapbox · Auth0" },
        { label: "Audiences", value: "Ops, partners, funders" },
        { label: "Coverage", value: "Ambulance, air, roadside" },
      ]}
      whatIDid={[
        {
          label: "Product",
          body: "Requirements, roadmap, delivery coordination, iterating on user feedback.",
        },
        {
          label: "Design",
          body: "Distinct experiences per audience; reporting readable by non-technical stakeholders.",
        },
        {
          label: "Engineering",
          body: "Superset as BI hub, Mapbox dashboards, Auth0 role-based access, partner data exchange.",
        },
      ]}
      chapters={[
        {
          number: "01",
          title: "The problem",
          body: "Answering a simple stakeholder question — “What was our average response time last month?” — meant exporting a CSV and digging through it by hand. Partners and funders each needed their own safe slice of the data, and most of them weren't technical. Leadership also wanted a live view of operations on the wall of the dispatch centre.",
        },
        {
          number: "02",
          title: "Answers ready to go",
          body: "Apache Superset became the shared data layer between Rescue.co and its stakeholders. Dashboards for common metrics — response times, bookings by type, coverage by county — are ready before anyone asks, and easy to extend when someone has a new question. Auth0-backed roles limit internal teams, partners and funders to the data they're authorised to see.",
        },
        {
          number: "03",
          title: "A big screen for dispatchers",
          body: "For the dispatch centre, a real-time wall display shows ongoing incidents, active bookings, calls, and response times against target, alongside a Mapbox view of every unit with pickup and drop-off ETAs. Dispatchers glance up instead of digging through tools.",
          image: "/images/rescue-bigscreen-v2.png",
          imageAspect: "2880/1864",
          caption:
            "Dispatch-centre big screen: live bookings, response times against target, fleet status, and active units on the map.",
        },
        {
          number: "04",
          title: "The outcome",
          body: "Stakeholder questions that used to take a CSV and an afternoon now take a dashboard link. Reporting suites translate operations into impact for leadership, investors and donors.",
        },
      ]}
      nextProject={{ href: "/work/ai-dispatching", title: "AI dispatching at Optimal Dynamics" }}
    />
  );
}
