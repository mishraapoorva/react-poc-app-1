import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Table({ columns = [], rows = [] }) {
  return (
    <DataTable value={rows} tableStyle={{ minWidth: '50rem' }}>
      {columns.map((col, i) => (
        <Column key={col.key} field={col.key} header={col.header} body={col.render} />
      ))}
    </DataTable>
  );
}
