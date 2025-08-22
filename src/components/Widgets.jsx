import React from "react";
import { Briefcase, BarChart, Users } from "lucide-react";

const WIDGETS = [
  {
    title: "Active Projects",
    value: "12",
    icon: <Briefcase className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Data Sources",
    value: "4",
    icon: <BarChart className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Team Members",
    value: "8",
    icon: <Users className="h-6 w-6 text-yellow-500" />,
  },
];

export default function Widgets() {
  return (
    <section className="mb-6">
       <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {WIDGETS.map((widget) => (
          <div key={widget.title} className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              {widget.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{widget.title}</p>
              <p className="text-2xl font-semibold">{widget.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
