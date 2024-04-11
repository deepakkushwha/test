import { get, post, put } from "../../src/Services/http.service";
import { formateDate_D_M_Y } from "../../src/utils/dateUtils";
import { toast } from "react-toastify";


export const metaData = async (id: any, setLoading: any, setColumns: any, setFormData: any, setpagetitle: any, setRefDataName: any, setColumnMetaData: any
    ) => {
      try {
        setLoading(true);
    
        const customHeaders = { "X-REF-DATA": id };
        const response = await get("/ref-data/meta-data", {}, customHeaders);
        setpagetitle(response?.refDataDisplayName);
        setRefDataName(response?.refDataName);
        setColumnMetaData(response?.columnMetadata)
        const dynamicColumns = response?.columnMetadata
          ?.filter((item:any) => item.selectDisplay === true)
          .map((apiColumn:any) => ({
            name: apiColumn.displayName,
            label: apiColumn.payloadName,
            columnOrder: apiColumn.columnOrder,
            sortable: true,
          }))
          .sort((a: any, b: any) => a.columnOrder - b.columnOrder);
    
        // const customIconColumn = {
        //   name: "action",
        //   cell: (row: any) => (
        //     <span className="table-action-row">
        //       <img
        //         src={CommonAssets.Action}
        //         alt=""
        //         data-bs-toggle="dropdown"
        //         aria-expanded="false"
        //         className="action-icon"
        //       />
        //       <div className="dropdown">
        //         <ul className="dropdown-menu">
        //           <li>
        //             <a
        //               className="dropdown-item action-icon"
        //               onClick={() => handleView(row)}
        //             >
        //               View Details
        //             </a>
        //           </li>
        //           <li>
        //             <a
        //               className="dropdown-item action-icon"
        //               onClick={() => Edit(row)}
        //             >
        //               Edit Details
        //             </a>
        //           </li>
        //           <li>
        //             <a
        //               className="dropdown-item action-icon"
        //               onClick={() => handleDelete(row)}
        //             >
        //               Delete
        //             </a>
        //           </li>
        //         </ul>
        //       </div>
        //     </span>
        //   ),
        // };
        setColumns([...dynamicColumns]);
        setFormData(
          response?.columnMetadata?.filter((item:any) => item.createEditDisplay === true)
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };


export const getMasterListing = async (id: any, setLoading: any, setcolumnsData: any, lazyState: any, setTotalRecords: any ,setColumns :any
    ) => {
      const formatedField = ['lastUpdatedDate', 'createdDate']
      try {
        setLoading(true);
          const response = await post(`/ref-data/filter?page=${lazyState?.page}&size=${lazyState?.rows}`,
        
          { filters: {}, sort: [] }, { "X-REF-DATA": id });
        
        let tabelData = response?.content || [];
        setTotalRecords(response?.totalElements);
        // const dataTabel = tabelData.map((apiColumn) => apiColumn );
        tabelData.forEach((item: any) => formatValues(item, formatedField));
    
        setcolumnsData(tabelData.length > 0 && tabelData);
        // setcolumnsData(dataTabel)
        // setaction(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    function formatValues(obj:any, keys:any) {
        keys.forEach((key: string | number) => obj[key] && (obj[key] = formateDate_D_M_Y(obj[key])));
      }