import { Dialog } from "primereact/dialog";
import Header from "../Header";
import MenuSidebar from "../MenuSidebar";
import { Paginator } from "primereact/paginator";
import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
// import "react-loading-skeleton/dist/skeleton.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TableFilterDialog from "./TableFilterDialog";
// import { del } from "../../services/http.service";
// import Loader from "../../services/loader";
import FormModal from "./FormModal";

import MasterDataBreadcrumb from "./MasterDataBreadcrumb";
import * as MasterDataUtils from "./MasterDataUtils"; 
import "./masterData.scss";
// import { DATA_TABLE_INITIAL_STATE, PAGINATION_ARRAY } from '../../AppConstant';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
const MasterDataTable = lazy(() => import("./MasterDataTable"));
// const ConfirmationPopup = lazy(() => import('../../components/ConfirmationPopup'));

const MasterData: React.FC = () => {
  const location = useLocation();
  const pageTitle = location.state?.pageTitle;
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<any>([]);
  const [formValues, setFormValues] = useState({});
  const [columns, setColumns] = useState([]);
  const [columnsData, setcolumnsData] = useState([]);
  const [columnsMetaData, setColumnMetaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editFlag, seteditFlag] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [EditId, setEditId] = useState("");
  const [pagetitle, setpagetitle] = useState("");
  const [refDataName, setRefDataName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [histroy, sethistroy] = useState(false);
  const [action, setaction] = useState(false);
  const [formtitle, setformTitle] = useState<any>("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [numberOfElements, setTotalGetElements] = useState(0);
  const [lazyState, setlazyState] = useState<any>({
    first: 0,
    rows: 10,
    page: 1,
    sortField: "",
    sortOrder: 1,
    sortName: "ASC",
  });
  const [view, setView] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [isDisable, setIsDisabled] = useState(true);

  const [operator, setOperator] = useState<any>([
    {
      filterDataSet: "STARTS_WITH",
      value: "Start with",
    },
    { filterDataSet: "CONTAINS", value: "Contains" },
    { filterDataSet: "NOT_CONTAINS", value: "Not contains" },
    { filterDataSet: "ENDS_WITH", value: "Ends with" },
    { filterDataSet: "EQUALS", value: "Equals" },
    { filterDataSet: "NOT_EQUALS", value: "Not equals" },

    { filterDataSet: "EQUALS", value: "Equals" },
    { filterDataSet: "NOT_EQUALS", value: "Not equals" },
    { filterDataSet: "LESS_THAN", value: "Less than" },
    { filterDataSet: "LESS_THAN_OR_EQUAL_TO", value: "Less than or equal to" },
    { filterDataSet: "GREATER_THAN", value: "Greater than" },
    {
      filterDataSet: "GREATER_THAN_OR_EQUAL_TO",
      value: "Greater than or equal to",
    },

    { filterDataSet: "DATE_IS", value: "Date is" },
    { filterDataSet: "DATE_IS_NOT", value: "Date is not" },
    { filterDataSet: "DATE_BEFORE", value: "Date before" },
    { filterDataSet: "DATE_AFTER", value: "Date after" },
  ]);
  useEffect(() => {
    // MasterDataUtils.metaData(id, setLoading, setColumns, setFormData, handleView, handleDelete, Edit, setpagetitle, setRefDataName, setColumnMetaData
    // );
    // getMasterListing();
    (async () => {
      await getMasterListing();
    })();
    // const fetchData = async () => {
    //   await getMasterListing();
    // }

    // fetchData()
  }, [
    action,
    lazyState.page,
    lazyState.rows,
    filterData,
    filterFlag,
    lazyState?.sortOrder,
  ]);

  useEffect(() => {
    (async () => {
      await MasterDataUtils.metaData(
        id,
        setLoading,
        setColumns,
        setFormData,
        handleView,
        handleDelete,
        Edit,
        setpagetitle,
        setRefDataName,
        setColumnMetaData,
        setVisible,
        visible
      );
    })();
  }, []);

  const fetchHistory = async () => {
    await MasterDataUtils.history(
      id,
      setLoading,
      setColumns,
      setcolumnsData,
      sethistroy,
      columns
    );
  };
  const getMasterListing = async () => {
    await MasterDataUtils.getMasterListing(
      id,
      setLoading,
      setcolumnsData,
      lazyState,
      setTotalRecords,
      setTotalGetElements,
      filterData,
      filterFlag
    );
  };
  function isObjectValuesNotEmpty(obj:any) {
    for (const value of Object.values<any>(formData)) {
      let val = obj[value["payloadName"]];
      if (!val || (typeof val === "string" && val.trim() === "")) {
        return false;
      }
    }
    return true;
  }
  const handleInputChange = (e: any, regex = null) => {
    const { name, value } = e.target;
    delete errors[name];

    if (regex && (!value || (regex && !new RegExp(regex).test(value)))) {
      setErrors({
        ...errors,
        [name]: `Enter a valid ${name
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .toLowerCase()}`,
      });
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
    let isSubmitDisable = isObjectValuesNotEmpty({
      ...formValues,
      [name]: value,
    });
    let updatedFormValues = { ...formValues, [name]: value };

    // setIsDisabled(hasNonEmptyFields(formValues))
    setIsDisabled(hasNonEmptyExternalIdFields(updatedFormValues));
    // setIsDisabled(!isSubmitDisable);
  };

  const hasNonEmptyExternalIdFields = (obj:any) => {
    // Check if externalId is present and has a non-empty value
    if (obj?.hasOwnProperty("externalId") && obj.externalId !== "") {
      return false;
    } else {
      return true;
    }
  };

  const hasNonEmptyFields = (obj:any) => {
    if (Object.keys(obj).length === 0) {
      return false;
    }
    for (const key in obj) {
      if (obj[key]) {
        return true;
      }
    }
    return false;
  };


  const handleView = useCallback(
    (row: any) => {
      // setShowModal(true);
      // setformTitle("View");
      // const formDataCopy = { ...formValues };
      // for (const key in row) {
      //   formDataCopy[key.toString()] = row[key];
      // }
      // setFormValues(formDataCopy);
      // setView(true);
    },
    [setShowModal, setformTitle, setFormValues, setView]
  );

  const Edit = (row: any) => {
    // setView(false);
    // setShowModal(true);
    // setformTitle("Edit");
    // const formDataCopy = { ...formValues };
    // for (const key in row) {
    //   formDataCopy[key.toString()] = row[key];
    // }
    // setFormValues(formDataCopy);
    // setEditId(row["externalId"]);
    // seteditFlag(true);
  };

  // Edit and create
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if (isDisable) return true;
    // let validationErrors = { ...errors };
    // formData.forEach((field: any) => {
    //   if (
    //     field?.regex && field?.displayName &&
    //     field?.createEditDisplay &&
    //     !formValues[field.payloadName]
    //   ) {
    //     validationErrors[
    //       field.payloadName
    //     ] = `${field.displayName} is required`;
    //   } else {
    //     delete validationErrors[field.payloadName];
    //   }
    // });

    // // const isvalid = Object.values(errors).every((value) => value === "");
    // // if (!isvalid) return false;
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // } else {
    //   MasterDataUtils.createAndUpdate(editFlag, setLoading, id, EditId, formValues, getMasterListing, setShowModal, formData)
    // }
  };

  const openModal = () => {
    setIsDisabled(true);
    seteditFlag(false);
    setView(false);
    setFormValues({});
    setShowModal(true);
    setformTitle("Create");
  };

  const closeModal = () => {
    setErrors({});
    setShowModal(false);
  };

  const closedModal = () => {
    setDeleteModal(!DeleteModal);
  };
  const handleDelete = (row: any) => {
    setUserId(row["externalId"]);
    setDeleteModal(true);
  };

  const onPage = (event:any) => {
    setlazyState({
      ...lazyState,
      rows: event.rows,
      first: event.first,
      page: event.page + 1,
    });
  };

  const handleChildData = async (data: any) => {
    if (data) {
      // Do something with the data in the parent component
      setFilterData(data);
      setFilterFlag(true);
      setlazyState({
        ...lazyState,
        page: 1,
      });
      // setVisible(false)
      //getMasterListing();
    } // Pass data to the child component
  };

  const handleClearFilter = () => {
    setFilterData([]);
  };

  const handleSort = (event:any) => {
    let sort = lazyState?.sortOrder === 1 ? -1 : 1;
    let type = sort === 1 ? "ASC" : "DESC";
    let parameter = event?.sortField;
    setlazyState({
      ...lazyState,
      sortOrder: sort,
      sortName: type,
      sortField: parameter,
    });
    // setSortOrder(sortOrder === 1 ? -1 : 1);
    // const multiSortMeta = [{
    //   parameter: event.sortField,
    //   type: event.sortOrder === 1 ? 'ASC' : 'DESC'
    // }]
    // setMultiSortData(multiSortMeta)
    // search(multiSortMeta);
  };

  return (
    <>
      <div className="inner-wrapper">
        <Header />
        <div className="content-wrapper">
          <div className="sidebar-menu">
            <MenuSidebar />
          </div>


          <Suspense fallback={<></>}>
            <MasterDataBreadcrumb pagetitle={pagetitle} />
            <div className="inner-page-wrapper">
              <section>
                <div className="container">
                  <div className="pagetitle-actions">
                    <div>
                      <h2 className="inner-title">
                        <i
                          className="icon icon-back back-arrow"
                          onClick={() => navigate(`/master-data-list`)}
                        ></i>
                        &nbsp;
                        {histroy ? `${pagetitle} History` : `${pagetitle}`}{" "}
                      </h2>
                    </div>

                    {pagetitle && (
                      <div className="top-right-btn">
                        <>


                       <Tooltip target=".user-Filter" position="left" />
                          <Button className="btn datatable-btn first-btn user-Filter" data-pr-tooltip="Filter" onClick={() => setVisible(true)}>
                            <i className="pi pi-sliders-h " style={{ fontSize: '1rem' }}></i>
                          </Button>



                          {!histroy && (
                            <Button
                              className="btn datatable-btn"
                              onClick={openModal}
                            >
                              Create Master<i className="pi pi-plus"></i>
                            </Button>
                          )}
                        </>
                      </div>
                    )}
                  </div>

                  <div>
                    <Dialog
                      visible={visible}
                      header="Filter Criteria"
                      className="popup-form"
                      onHide={() => setVisible(false)}
                      draggable={false}
                    >
                      <div>
                        <TableFilterDialog
                          col={columns
                            .map(({ columnOrder }) =>
                              columnsMetaData.find(
                                (obj:any) => obj.columnOrder === columnOrder
                              )
                            )
                            .filter(Boolean)}
                          onDataReceived={handleChildData}
                          onFlagReceived={(data:any) => setVisible(data)}
                          filterFormData={filterData}
                        />
                      </div>
                    </Dialog>
                    {((filterData as any)?.filterField || []).length > 0 ? (
                      <div className="table-common-filter-row">
                        <div className="common-filter-content">
                          {(filterData as any)?.filterField.map(
                            (field:any, index:any) => (
                              <span key={index}>
                                <b>{field.filterColumn.displayName}:</b>{" "}
                                {field.textFilter &&
                                field.textFilter.length > 0 ? (
                                  <>
                                    {field.textFilter.map(
                                      (textFilter:any, textIndex:any) => (
                                        <span key={textIndex}>
                                          {
                                            operator.find(
                                              (op:any) =>
                                                op.filterDataSet ===
                                                textFilter.filterOperator
                                            )?.value
                                          }{" "}
                                          {textFilter.filterValue}{" "}
                                          {textIndex <
                                          field.textFilter.length - 1
                                            ? "AND "
                                            : ""}
                                        </span>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <p></p>
                                )}
                                {index <
                                (filterData as any).filterField.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            )
                          )}
                        </div>
                        <Button
                          className="clear-filter-tableBtn"
                          onClick={() => handleClearFilter()}
                        >
                          Clear Filter
                        </Button>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                  {!loading && (
                    <div className="data-table">
                      <MasterDataTable
                        {...{
                          columnsData,
                          lazyState,
                          totalRecords,
                          columns,
                          handleSort,
                          numberOfElements,
                        }}
                      />
                    </div>
                  )}
                  {totalRecords > 10 && (
                    <Paginator
                      first={lazyState.first}
                      rowsPerPageOptions={[10, 20, 50, 100]}
                      // rowsPerPageOptions={PAGINATION_ARRAY}
                      rows={lazyState.rows}
                      totalRecords={totalRecords}
                      onPageChange={onPage}
                    />
                  )}

                  <Dialog
                    className="popup-form"
                    visible={showModal}
                    onHide={closeModal}
                    closable={true}
                    draggable={false}
                    header={
                      formtitle !== "Create"
                        ? `${formtitle} Details`
                        : "Create Master"
                    }
                  >
                    {/* <div className="modaltitle">{formtitle} IDV </div> */}
                    <FormModal
                      handleSubmit={handleSubmit}
                      formData={formData}
                      handleInputChange={handleInputChange}
                      formValues={formValues}
                      errors={errors}
                      view={view}
                      isDisable={isDisable}
                    />
                  </Dialog>
                </div>
              </section>
            </div>
            {/* {loading && <Loader />}
        <ConfirmationPopup
          show={DeleteModal}
          onHide={closedModal}
          content="Are you sure you want to delete this user?"
          clickFunction={() => Delete()}
        /> */}
          </Suspense>
        </div>
      </div>





    </>
  );
};

export default MasterData;
