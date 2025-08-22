import React, { useState } from "react";
import Table from "./Table";
import { ExternalLink, X } from "lucide-react";
import { SUITES } from "../data/suites";

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${className}`}>{children}</span>
);

export default function SuiteCards() {
  const [selectedSuite, setSelectedSuite] = useState(null);

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold">SEN Suites</h2>
          <p className="text-sm text-gray-600">Explore apps by suite. Click a card to reveal suite apps.</p>
        </div>
        {selectedSuite && (
          <button
            onClick={() => setSelectedSuite(null)}
            className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:shadow"
          >
            <X className="h-4 w-4" /> Close
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {SUITES.map((suite) => (
          <button
            key={suite.key}
            onClick={() => setSelectedSuite(suite)}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img src={suite.image} alt={suite.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-base font-semibold">{suite.title}</h3>
              <p className="line-clamp-3 text-sm text-gray-600">{suite.description}</p>
              <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-gray-500">
                <span>Apps: {suite.apps.length}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>Click to View</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedSuite && (
        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
          <div className="mb-3">
            <h3 className="text-base font-semibold">{selectedSuite.title} – Apps</h3>
            <p className="text-sm text-gray-600">All apps related to this suite.</p>
          </div>

          <Table
            columns={[
              { key: "name", header: "App" },
              { key: "owner", header: "Owner" },
              {
                key: "status",
                header: "Status",
                render: (r) => (
                  <Badge
                    className={
                      r.status === "Stable"
                        ? "border-emerald-200 text-emerald-700"
                        : r.status === "Beta"
                        ? "border-amber-200 text-amber-700"
                        : "border-blue-200 text-blue-700"
                    }
                  >
                    {r.status}
                  </Badge>
                ),
              },
              {
                key: "url",
                header: "Open",
                render: (r) => (
                  <a href={r.url} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                    Open <ExternalLink className="h-4 w-4" />
                  </a>
                ),
              },
            ]}
            rows={selectedSuite.apps}
          />
        </div>
      )}
    </section>
  );
}
