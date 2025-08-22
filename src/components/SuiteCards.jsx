import React, { useState } from "react";
import Table from "./Table";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { SUITES } from "../data/suites";

const statusSeverityMap = {
  Stable: "success",
  Beta: "warning",
  Alpha: "info",
};

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
          <Button
            icon="pi pi-times"
            label="Close"
            onClick={() => setSelectedSuite(null)}
            className="p-button-sm"
          />
        )}
      </div>

      <div className="grid">
        {SUITES.map((suite) => (
          <div key={suite.key} className="col-12 md:col-6 lg:col-3">
            <Card
              title={suite.title}
              subTitle={suite.description}
              header={<img alt={suite.title} src={suite.image} />}
              footer={<span>Apps: {suite.apps.length}</span>}
              onClick={() => setSelectedSuite(suite)}
              className="cursor-pointer hover:shadow-lg"
            />
          </div>
        ))}
      </div>

      {selectedSuite && (
        <div className="mt-6">
          <Card title={`${selectedSuite.title} – Apps`}>
            <p className="mb-4 text-sm text-gray-600">All apps related to this suite.</p>
            <Table
              columns={[
                { key: "name", header: "App" },
                { key: "owner", header: "Owner" },
                {
                  key: "status",
                  header: "Status",
                  render: (r) => <Tag value={r.status} severity={statusSeverityMap[r.status]} />,
                },
                {
                  key: "url",
                  header: "Open",
                  render: (r) => (
                    <a href={r.url} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                      Open <i className="pi pi-external-link" />
                    </a>
                  ),
                },
              ]}
              rows={selectedSuite.apps}
            />
          </Card>
        </div>
      )}
    </section>
  );
}
