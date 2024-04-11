import React,{useState,useEffect} from 'react'
import MasterDataTable from './MasterDataTable'
import { Paginator } from 'primereact/paginator';
import { get, post, put } from "../../src/Services/http.service";
import * as MasterDataUtils from "./MasterDataUtils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PAGINATION_ARRAY } from '../AppConstant';





export default function ReferenceDataTable() {
    const [columnsMetaData, setColumnMetaData] = useState([]);
    const [refDataName, setRefDataName] = useState("");
    const [pagetitle, setpagetitle] = useState("");
    const [formData, setFormData] = useState<any>([]);
    const [columnsData, setcolumnsData] = useState([]);
    const [columns, setColumns] = useState([  
       
    ]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [lazyState, setlazyState] = useState<any>({
      first: 0,
      rows: 10,
      page: 1,
      sortField: "",
      sortOrder: 1,
      sortName: "ASC",
    });


    useEffect(() => {
        MasterDataUtils.metaData(id, setLoading, setColumns, setFormData,  setpagetitle, setRefDataName, setColumnMetaData
            );
        
        getMasterListing();
      }, [ lazyState.page, lazyState.rows,]);

    const onPage = (event:any) => {
        setlazyState({
          ...lazyState,
          rows: event.rows,
          first: event.first,
          page: event.page + 1,
        });
      };

      const getMasterListing = async () => {
        await MasterDataUtils.getMasterListing(
          id,
          setLoading,
          setcolumnsData,
          lazyState,
          setTotalRecords,
          setColumns
          
        );
      };

  return (
    <div >
        
    <MasterDataTable
      {... {
        columnsData, lazyState, totalRecords, columns
      }
      }
    />

    {columnsData.length > 0 && (
      <Paginator
        first={lazyState.first}
        // rowsPerPageOptions={[10, 20, 50, 100]}
        rowsPerPageOptions={PAGINATION_ARRAY}
        rows={lazyState.rows}
        totalRecords={totalRecords}
        onPageChange={onPage}
      />
    )}
    
  </div>
  )
}
