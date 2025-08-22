import React, { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Table from "./Table";
import { FAVORITES } from "../data/favorites";
import { RECENTS } from "../data/recents";
import { BLOG } from "../data/blog";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { SelectButton } from 'primereact/selectbutton';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataView } from 'primereact/dataview';

const QUICK_LINKS = [
  ...FAVORITES.map((f) => ({ type: "favorite", title: f.title, url: f.path, suite: f.suite })),
  ...RECENTS.map((r) => ({ type: "recent", title: r.title, url: r.path, suite: r.suite })),
  ...BLOG.map((b) => ({ type: "blog", title: b.title, url: b.url, suite: "Blog" })),
];

const viewOptions = [
  { icon: 'pi pi-th-large', value: 'grid' },
  { icon: 'pi pi-bars', value: 'list' }
];

const iconMap = {
  favorite: "pi pi-star",
  recent: "pi pi-clock",
  blog: "pi pi-book",
};

export default function QuickLinks() {
  const [q, setQ] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [view, setView] = useState("grid");

  const fuse = useMemo(() => {
    return new Fuse(QUICK_LINKS, {
      includeScore: true,
      threshold: 0.38,
      keys: ["title", "suite", "type"],
    });
  }, []);

  const quickResults = useMemo(() => {
    const tabType = ["recent", "favorite", "blog"][activeTabIndex];
    const base = QUICK_LINKS.filter((x) => x.type === tabType);
    if (!q.trim()) return base;
    const results = fuse.search(q).map((r) => r.item);
    return results.filter((x) => x.type === tabType);
  }, [q, activeTabIndex, fuse]);

  const gridItemTemplate = (item) => {
    return (
      <div className="col-12 md:col-4">
        <a href={item.url} className="no-underline">
          <Card className="hover:shadow-lg">
            <div className="flex items-center gap-3">
              <i className={`${iconMap[item.type]} text-2xl text-gray-500`} />
              <div>
                <div className="font-bold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.suite}</div>
              </div>
              <i className="pi pi-external-link ml-auto text-gray-400" />
            </div>
          </Card>
        </a>
      </div>
    );
  };

  const listLayout = (
    <Table
      columns={[
        { key: "title", header: "Title" },
        { key: "suite", header: "Suite" },
        {
          key: "open",
          header: "Open",
          render: (r) => (
            <a href={r.url} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              Open <i className="pi pi-external-link" />
            </a>
          ),
        },
      ]}
      rows={quickResults}
    />
  );

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <i className="pi pi-book" />
        <h2 className="text-lg font-semibold m-0">Quick Links</h2>
      </div>
      <div className="flex items-center gap-2">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
        </IconField>
        <SelectButton value={view} onChange={(e) => setView(e.value)} options={viewOptions} />
      </div>
    </div>
  );

  return (
    <Card title={header}>
      <TabView activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.index)}>
        <TabPanel header="Recent">
          {view === 'grid' ? <DataView value={quickResults} itemTemplate={gridItemTemplate} layout="grid" /> : listLayout}
        </TabPanel>
        <TabPanel header="Favorites">
          {view === 'grid' ? <DataView value={quickResults} itemTemplate={gridItemTemplate} layout="grid" /> : listLayout}
        </TabPanel>
        <TabPanel header="Blog">
          {view === 'grid' ? <DataView value={quickResults} itemTemplate={gridItemTemplate} layout="grid" /> : listLayout}
        </TabPanel>
      </TabView>
    </Card>
  );
}
