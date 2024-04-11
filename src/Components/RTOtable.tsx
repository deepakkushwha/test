import { useState } from "react";
import Header from "./Header";
import MenuSidebar from "./MenuSidebar";
import "./tableData.json";
import TDJSON from "./tableData.json";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function RTOtable() {
  const [dataTable, setdataTable] = useState([]);
  const data = [
    { name: "firstName", value: "Deep", age: "24" },
    { name: "firstName", value: "Deepu", age: "25" },
    { name: "firstName", value: "Vikas", age: "26" },
    { name: "firstName", value: "Vishal", age: "27" },
  ];
  //   const columnMetadata = TBJSON.columnMetadata;

  //   const columns = TDJSON.columnMetadata.map((column) => ({
  //     field: column.columnName,
  //     header: column.displayName,
  //   }));

  //   useEffect(() => {
  //     setdataTable(tableData);
  //   }, []);

  const columnMetadata = TDJSON.columnMetadata;

console.log("columnMetadata",columnMetadata)
  return (
    <>
      <div className="inner-wrapper">
        <Header />
        <div className="content-wrapper">
          <div className="sidebar-menu">
            <MenuSidebar />
          </div>
          {/* <div className="main-content">
            <div className="card">
            <DataTable value={columnMetadata} className="p-datatable-striped">
        {Object.keys(columnMetadata[0]).map(key => (
          <Column key={key} field={key} header={key} />
        ))}
      </DataTable> */}
          {/* <DataTable value={[TDJSON]}>
                {columns.map((col) => (
                  <Column
                    key={col.field}
                    field={col.field}
                    header={col.header}
                  />
                ))}
              </DataTable> */}
          {/* <DataTable value={dataTable} tableStyle={{ minWidth: "50rem" }}>
                {columns.map((col, i) => (
                  <Column
                    key={col.field}
                    body={(rowData) =>
                        col.name === "action" ? col.cell(rowData) : rowData[col.label]
                      }
                    field={col.field}
                    header={col.header}
                  />
                ))}
              </DataTable> */}
          <DataTable
           value={columnMetadata}
            className="p-datatable-striped">
            {Object.keys(columnMetadata[0]).map((key) => (
              <Column key={key} field={key} header={key} />
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
}
