export const SUITES = [
  {
    key: "meridian",
    title: "Meridian Architecture",
    description: "Lakehouse, Medallion, Vault, Modeler for enterprise data foundations.",
    image: "https://picsum.photos/seed/meridian/640/360",
    apps: [
      { name: "Meridian Lakehouse", owner: "Platform", status: "Stable", url: "#" },
      { name: "Meridian Medallion", owner: "Data Gov", status: "Beta", url: "#" },
      { name: "Meridian Vault", owner: "DB Core", status: "Stable", url: "#" },
      { name: "Meridian Modeler", owner: "Data Eng", status: "Alpha", url: "#" },
    ],
  },
  {
    key: "kinetic",
    title: "Kinetic Data",
    description: "Pipelines, streaming, connectors, and data quality automation.",
    image: "https://picsum.photos/seed/kinetic/640/360",
    apps: [
      { name: "Kinetic Flow", owner: "Pipelines", status: "Stable", url: "#" },
      { name: "Kinetic Stream", owner: "Streaming", status: "Stable", url: "#" },
      { name: "Kinetic Bridge", owner: "Integrations", status: "Beta", url: "#" },
      { name: "Kinetic Purity", owner: "DQ", status: "Alpha", url: "#" },
    ],
  },
  {
    key: "mystic",
    title: "Mystic Intelligence",
    description: "Dashboards, natural-language SQL, forecasting, and action loops.",
    image: "https://picsum.photos/seed/mystic/640/360",
    apps: [
      { name: "Mystic Dashboard", owner: "BI", status: "Stable", url: "#" },
      { name: "Mystic SQL", owner: "Analytics", status: "Stable", url: "#" },
      { name: "Mystic Forecaster", owner: "AI", status: "Beta", url: "#" },
      { name: "Mystic LoopSync", owner: "Ops", status: "Alpha", url: "#" },
    ],
  },
  {
    key: "nexus",
    title: "Nexus Applications",
    description: "UI auto-generation, OLTP automation, logic, and workflow gates.",
    image: "https://picsum.photos/seed/nexus/640/360",
    apps: [
      { name: "Nexus UI", owner: "Frontend", status: "Beta", url: "#" },
      { name: "Nexus OLTP", owner: "Backend", status: "Stable", url: "#" },
      { name: "Nexus Logic", owner: "Platform", status: "Stable", url: "#" },
      { name: "Nexus FlowGate", owner: "Ops", status: "Alpha", url: "#" },
    ],
  },
];
