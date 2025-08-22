import React from "react";
import Banner from "./components/Banner";
import ChatbotSection from "./components/ChatbotSection";
import SuiteCards from "./components/SuiteCards";
import Table from "./components/Table";
import QuickLinks from "./components/QuickLinks";
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { FAVORITES } from "./data/favorites";
import { RECENTS } from "./data/recents";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Banner />

      <main className="flex-1 mx-auto px-6 py-8 space-y-6">
        <ChatbotSection />
        <SuiteCards />
        <Divider />
        <Card title={
          <div className="flex items-center gap-2">
            <i className="pi pi-star" />
            <h2 className="text-lg font-semibold m-0">My Favorite Pages</h2>
          </div>
        }>
          <Table
            columns={[
              { key: "title", header: "Title" },
              { key: "suite", header: "Suite" },
              { key: "updated", header: "Updated" },
              {
                key: "open",
                header: "Open",
                render: (r) => (
                  <a href={r.path} className="text-blue-600 hover:underline">Open</a>
                ),
              },
            ]}
            rows={FAVORITES}
          />
        </Card>
        <Divider />
        <Card title={
          <div className="flex items-center gap-2">
            <i className="pi pi-clock" />
            <h2 className="text-lg font-semibold m-0">Recently Visited</h2>
          </div>
        }>
          <Table
            columns={[
              { key: "title", header: "Title" },
              { key: "suite", header: "Suite" },
              { key: "visited", header: "Last Visited" },
              {
                key: "open",
                header: "Open",
                render: (r) => (
                  <a href={r.path} className="text-blue-600 hover:underline">Open</a>
                ),
              },
            ]}
            rows={RECENTS}
          />
        </Card>
        <Divider />
        <QuickLinks />
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 text-xs text-gray-600 flex justify-between">
          <span>© {new Date().getFullYear()} Techrobotica • SEN Platform</span>
          <span>Made with ❤ for a quick POC</span>
        </div>
      </footer>
    </div>
  );
}


export default App;