import { OverlayPanel } from "primereact/overlaypanel";
import { get } from "../../Services/http.service";
import filter from "./filter.json";
import metadata from "./metadata.json";
// import React, { useRef } from 'react';

export const metaData = async (
  id: any,
  setLoading: any,
  setColumns: any,
  setFormData: any,
  handleView: any,
  handleDelete: any,
  Edit: any,
  setpagetitle: any,
  setRefDataName: any,
  setColumnMetaData: any,
  setVisible:any,
  visible:any
) => {
  try {
    setLoading(true);
    const customHeaders = { "X-REF-DATA": id };
    // const response = await get("/ref-data/meta-data", {}, customHeaders);
    const response = metadata;
    setpagetitle(response?.refDataDisplayName);
    setRefDataName(response?.refDataName);
    setColumnMetaData(response?.columnMetadata);
    const dynamicColumns = response?.columnMetadata
      ?.filter((item) => item.selectDisplay === true)
      .map((apiColumn) => ({
        name: apiColumn.displayName,
        label: apiColumn.payloadName,
        columnOrder: apiColumn.columnOrder,
        sortable: true,
      }))
      .sort((a: any, b: any) => a.columnOrder - b.columnOrder);
    // const op = useRef( );
    // const op = useState();

    const customIconColumn = {
      width: "50px",
      actionsClass: "action-col-right",
      name: "action",
      cell: (row: any) => (
        <span className="table-action-row">
          <div className="action-icons">
            <span className="pi pi-pencil icon" onClick={Edit}></span> 
            <span className="pi pi-trash icon" onClick={Edit}></span> 
            </div>

          {/* <span className="pi pi-ellipsis-v" onClick={() => setVisible(true)}></span>  */}
          {/* <OverlayPanel show={visible} onHide={() => setVisible(false)}>
          <div className="dropdown">
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => handleView(row)}
                >
                  View Details
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => Edit(row)}
                >
                  Edit Details
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
 
          </OverlayPanel> */}
          
          <OverlayPanel >
               <div className="dropdown">
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => handleView(row)}
                >
                  View Details
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => Edit(row)}
                >
                  Edit Details
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </a>
              </li>
            </ul>
           </div> 
            </OverlayPanel>

          {/* <div className="dropdown">
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => handleView(row)}
                >
                  View Details
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => Edit(row)}
                >
                  Edit Details
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item action-icon"
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </a>
              </li>
            </ul>
          </div> */}
        </span>
      ),
    };

    setColumns([...dynamicColumns, customIconColumn]);
    setFormData(
      response?.columnMetadata?.filter(
        (item) => item.createEditDisplay === true
      )
    );
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const history = async (
  id: any,
  setLoading: any,
  setColumns: any,
  setcolumnsData: any,
  sethistroy: any,
  columns: any
) => {
  sethistroy(true);
  const filteredData = columns.filter((item) => item.name !== "");
  setColumns(filteredData);
  try {
    setLoading(true);
    const response: any = await get(
      "/ref-data/delete-history?page=1&size=10",
      {},
      { "X-REF-DATA": id }
    );
    const tabelData = response?.content || [];
    setcolumnsData(tabelData);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const getMasterListing = async (
  id: any,
  setLoading: any,
  setcolumnsData: any,
  lazyState: any,
  setTotalRecords: any,
  setTotalGetElements: any,
  filterData: any,
  filterFlag: any
) => {
  let response = filter;
  console.log("dfghjkl;", filter);
  let tabelData = response?.content || [];
  setTotalRecords(response?.totalElements);
  setTotalGetElements(response?.numberOfElements);
  // tabelData.forEach((item) => formatValues(item, formatedField));
  setcolumnsData(tabelData.length > 0 && tabelData);

  // console.log('lazyStatelazyState',lazyState);
  const formatedField = ["lastUpdatedDate", "createdDate"];
  // try {
  // let filterByCriteria: { [key: string]: [{"value":any ,"matchMode":any,"operator":any}] } = {};
  // filterData.filterField?.forEach((filterBy) => {
  //   const category = filterBy?.filterColumn?.payloadName;
  //   console.log(filterBy?.filterColumn,"filterColumn")
  //     const filterObj={"value":filterBy?.textFilter[0]?.filterValue,"matchMode":filterBy?.textFilter[0]?.filterOperator,"operator":"AND"}
  //   if (!filterByCriteria[category]) {
  //     filterByCriteria[category] =  [filterObj];
  //   }else{
  //     filterObj.operator = 'OR';
  //   filterByCriteria[category].push(filterObj);
  //   }
  // })
  // let filterByCriteria: { [key: string]: { value: any; matchMode: any; operator: any }[] } = {};

  // filterData.filterField?.forEach((filterField) => {
  //   const category = filterField?.filterColumn?.payloadName;

  //   filterField?.textFilter?.forEach((textFilter) => {
  //     const filterObj = {
  //       value: textFilter?.filterValue,
  //       matchMode: textFilter?.filterOperator,
  //       operator: 'AND',
  //     };

  //     if (!filterByCriteria[category]) {
  //       filterByCriteria[category] = [filterObj];
  //     } else {
  //       filterObj.operator = 'OR';
  //       filterByCriteria[category].push(filterObj);
  //     }
  //   });
  // });
  // let sortObj = {
  //   parameter: lazyState?.sortField,
  //   type: lazyState?.sortName

  // }
  // const transformedFilterData = { ...filterByCriteria };
  // setLoading(true);
  // if (filterFlag) {
  //   const response = await post(
  //     `/ref-data/filter?page=${lazyState?.page}&size=${lazyState?.rows}`,

  //     {
  //       filters: filterByCriteria,
  //       sort: lazyState?.sortField ? [sortObj] : [],
  //     },
  //     { "X-REF-DATA": id }
  //   );

  //   let tabelData = response?.content || [];
  //   setTotalRecords(response?.totalElements);
  //   setTotalGetElements(response?.numberOfElements);
  //   tabelData.forEach((item) => formatValues(item, formatedField));
  //   setcolumnsData(tabelData.length > 0 && tabelData);
  //   setLoading(false);
  // } else {
  // const response = await post(`/ref-data/filter?page=${lazyState?.page}&size=${lazyState?.rows}`,

  //   { filters: {}, sort: lazyState?.sortField ? [sortObj] : [] }, { "X-REF-DATA": id });

  // let response = filterData;

  // setTotalRecords(response?.totalElements);
  // setTotalGetElements(response?.numberOfElements);
  // // const dataTabel = tabelData.map((apiColumn) => apiColumn );
  // tabelData.forEach((item) => formatValues(item, formatedField));
  // console.log('tabelData',tabelData);
  // setcolumnsData(tabelData.length > 0 && tabelData);
  // setcolumnsData(dataTabel)
  // setaction(false);
  // setLoading(false);
  //   }
  // } catch (error) {
  //   setLoading(false);
  // }
};

export const createAndUpdate = async (
  editFlag: any,
  setLoading: any,
  id: any,
  EditId: any,
  formValues: any,
  getMasterListing: any,
  setShowModal: any,
  formData: any
) => {
  // console.log('EditId',EditId);
  // if (editFlag) {
  //   const filteredData = {};
  //   formData.forEach((element) => {
  //     if (
  //       element.createEditDisplay &&
  //       formValues.hasOwnProperty(element.payloadName)
  //     ) {
  //       filteredData[element.payloadName] = formValues[element.payloadName];
  //     }
  //   });
  //   try {
  //     setLoading(true);
  //     const headers = { "X-REF-DATA": id, "EXTERNAL-SOURCE": "INLEAS" };
  //     const response: any = await put(
  //       "ref-data/" + EditId,
  //       filteredData,
  //       headers
  //     );
  //     getMasterListing();
  //     toast.success(response?.message);
  //     setLoading(false);
  //     setShowModal(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // } else {
  //   let newFormData = removeEmptyKeys(formValues);
  //   try {
  //     setLoading(true);
  //     const url = `/ref-data`;
  //     const headers = { "X-REF-DATA": id, "EXTERNAL-SOURCE": "INLEAS" };
  //     // const response: any = await post(url, formValues, headers);
  //     const response: any = await post(url, newFormData, headers);
  //     getMasterListing();
  //     toast.success(response.message);
  //     setLoading(false);
  //     setShowModal(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // }
};

function formatValues(obj, keys) {
  // keys.forEach((key) => obj[key] && (obj[key] = formateDate_D_M_Y(obj[key])));
}
