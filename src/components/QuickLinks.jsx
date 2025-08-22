import React, { useMemo, useState } from "react";
import { Grid as GridIcon, List as ListIcon, Search as SearchIcon, Star, Clock, BookText, ExternalLink } from "lucide-react";
import Fuse from "fuse.js";
import Table from "./Table";
import { FAVORITES } from "../data/favorites";
import { RECENTS } from "../data/recents";
import { BLOG } from "../data/blog";

const QUICK_LINKS = [
  ...FAVORITES.map((f) => ({ type: "favorite", title: f.title, url: f.path, suite: f.suite })),
  ...RECENTS.map((r) => ({ type: "recent", title: r.title, url: r.path, suite: r.suite })),
  ...BLOG.map((b) => ({ type: "blog", title: b.title, url: b.url, suite: "Blog" })),
];

const IconButton = ({ title, onClick, children, active = false }) => (
  <button
    title={title}
    onClick={onClick}
    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:shadow ${
      active ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
    }`}
  >
    {children}
  </button>
);

export default function QuickLinks() {
  const [q, setQ] = useState("");
  const [activeTab, setActiveTab] = useState("recent"); // recent | favorite | blog
  const [view, setView] = useState("grid"); // grid | list

  const fuse = useMemo(() => {
    return new Fuse(QUICK_LINKS, {
      includeScore: true,
      threshold: 0.38,
      keys: ["title", "suite", "type"],
    });
  }, []);

  const quickResults = useMemo(() => {
    const base = QUICK_LINKS.filter((x) => x.type === activeTab);
    if (!q.trim()) return base;
    const results = fuse.search(q).map((r) => r.item);
    return results.filter((x) => x.type === activeTab);
  }, [q, activeTab, fuse]);

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <BookText className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Quick Links</h2>
      </div>

      {/* Search + View Toggle */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search (fuzzy) favorites, recents, and blog..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-blue-200 focus:ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <IconButton title="Grid view" onClick={() => setView("grid")} active={view === "grid"}>
            <GridIcon className="h-4 w-4" />
          </IconButton>
          <IconButton title="List view" onClick={() => setView("list")} active={view === "list"}>
            <ListIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex items-center gap-2">
        {[
          { key: "recent", label: "Recent" },
          { key: "favorite", label: "Favorites" },
          { key: "blog", label: "Blog" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-all ${
              activeTab === t.key
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Results: Grid or List */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickResults.map((item, i) => (
            <a
              key={i}
              href={item.url}
              className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                {item.type === "favorite" && <Star className="h-5 w-5" />}
                {item.type === "recent" && <Clock className="h-5 w-5" />}
                {item.type === "blog" && <BookText className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs text-gray-600">{item.suite}</div>
              </div>
              <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>
      ) : (
        <Table
          columns={[
            { key: "title", header: "Title" },
            { key: "suite", header: "Suite" },
            {
              key: "open",
              header: "Open",
              render: (r) => (
                <a href={r.url} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                  Open <ExternalLink className="h-4 w-4" />
                </a>
              ),
            },
          ]}
          rows={quickResults}
        />
      )}
    </section>
  );
}
