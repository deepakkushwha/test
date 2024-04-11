import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Header from "../Header";
import MenuSidebar from "../MenuSidebar";


const MasterDataTable: React.FC<any> = ({
  columnsData,
  lazyState,
  totalRecords,
  columns,
  handleSort,
  numberOfElements
}) => {
  // console.log('columnsDatacolumnsData',columnsData,lazyState);
  return (
    <>
    <section>
    <DataTable
        className={`${numberOfElements < 5 ? 'col-action-open' : ''}`}
        stripedRows
        value={columnsData}
        dataKey="id"
        paginator={false}
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={totalRecords}
        onSort={handleSort}
        sortField={lazyState?.sortField} sortOrder={lazyState?.sortName}
        scrollable
      >
        {columns.map((col) => (
          <Column
            style={{ width: col.width }}
            className={`${col.name === "action" ? col.actionsClass : ''}`}
            key={col.name}
            field={col.label}
            header={col.name === "action" ? "Action" : col.name}
            sortable={col.name === "action" ? false : true}
            body={(rowData) =>
              col.name === "action" ? col.cell(rowData) : rowData[col.label]
              // col.name === "action" ? col.cell("sdfs") : col.cell("sdfhbfeghnfs")
            }
            frozen={col.name === "action" ? true : false}
            alignFrozen="right"
          />
        ))}
      </DataTable>
    </section>
   
     
    </>
  );
};

export default MasterDataTable;
