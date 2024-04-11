import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";


const MasterDataTable: React.FC<any> = ({
  columnsData,
  lazyState,
  totalRecords,
  columns,
}) => {
  console.log(columnsData)
  console.log(columns)
  return (
    <>
   <div className="card table-card">
      <DataTable
        stripedRows
        value={columnsData}
        dataKey="id"
        paginator={false}
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={totalRecords}
      >
        {columns.map((col:any) => (
          <Column
          key={col.field} field={col.field} header={col.header}
          />
        ))}
      </DataTable>
      </div>
    </>
  );
};

export default MasterDataTable;
