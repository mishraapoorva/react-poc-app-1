import React, { useMemo, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { SelectButton } from 'primereact/selectbutton';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataView } from 'primereact/dataview';
import { FAVORITES } from "../data/favorites";
import { RECENTS } from "../data/recents";
import { BLOG } from "../data/blog";

const QUICK_LINKS = [
  ...FAVORITES.map((f) => ({ type: "favorite", title: f.title, url: f.path, suite: f.suite })),
  ...RECENTS.map((r) => ({ type: "recent", title: r.title, url: r.path, suite: r.suite })),
  ...BLOG.map((b) => ({ type: "blog", title: b.title, url: b.url, suite: "Blog" })),
];

const viewOptions = [
  { icon: 'pi pi-th-large', value: 'grid' },
  { icon: 'pi pi-bars', value: 'list' }
];

const viewTemplate = (option) => {
    return <i className={option.icon} />;
};

const iconMap = {
  favorite: "pi pi-star",
  recent: "pi pi-clock",
  blog: "pi pi-book",
};

export default function QuickLinks() {
  const [filter, setFilter] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [view, setView] = useState("grid");

  const filteredData = useMemo(() => {
    const tabType = ["recent", "favorite", "blog"][activeTabIndex];
    const data = QUICK_LINKS.filter((x) => x.type === tabType);
    if (!filter) {
      return data;
    }
    return data.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.suite.toLowerCase().includes(filter.toLowerCase())
    );
  }, [activeTabIndex, filter]);

  const gridItemTemplate = (item) => {
    return (
      <div className="col-12 md:col-6 lg:col-3 p-2">
        <a href={item.url} className="no-underline h-full">
          <Card className="hover:shadow-lg h-full">
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

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <i className="pi pi-book" />
        <h2 className="text-lg font-semibold m-0">Quick Links</h2>
      </div>
      <div className="flex items-center gap-2">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." />
        </IconField>
        <SelectButton value={view} onChange={(e) => setView(e.value)} options={viewOptions} itemTemplate={viewTemplate} />
      </div>
    </div>
  );

  const renderContent = () => {
    if (view === 'grid') {
      return <DataView value={filteredData} itemTemplate={gridItemTemplate} layout="grid" />;
    }
    return (
      <DataTable value={filteredData} dataKey="url">
        <Column field="title" header="Title" />
        <Column field="suite" header="Suite" />
        <Column header="Open" body={(r) => <a href={r.url} className="inline-flex items-center gap-1 text-blue-600 hover:underline">Open <i className="pi pi-external-link" /></a>} />
      </DataTable>
    );
  };

  return (
    <Card title={header}>
      <TabView activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.index)}>
        <TabPanel header="Recent">
          {renderContent()}
        </TabPanel>
        <TabPanel header="Favorites">
          {renderContent()}
        </TabPanel>
        <TabPanel header="Blog">
          {renderContent()}
        </TabPanel>
      </TabView>
    </Card>
  );
}
