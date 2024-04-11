import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";     

const TableFilterDialog = (props:any) => {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [receivedData, setReceivedData] = useState(props.col);

  const [TextFilterOperator, setTextFilterOperator] = useState<any>([
    {
      filterDataSet: "STARTS_WITH",
      value: "Start with",
      matchMode: "startsWith",
    },
    { filterDataSet: "CONTAINS", value: "Contains", matchMode: "contains" },
    {
      filterDataSet: "NOT_CONTAINS",
      value: "Not contains",
      matchMode: "notContains",
    },
    { filterDataSet: "ENDS_WITH", value: "Ends with", matchMode: "endsWith" },
    { filterDataSet: "EQUALS", value: "Equals", matchMode: "equals" },
    {
      filterDataSet: "NOT_EQUALS",
      value: "Not equals",
      matchMode: "notEquals",
    },
  ]);
  const [NumericFilterOperator, setNumericFilterOperator] = useState<any>([
    { filterDataSet: "EQUALS", value: "Equals", matchMode: "equals" },
    {
      filterDataSet: "NOT_EQUALS",
      value: "Not equals",
      matchMode: "notEquals",
    },
    { filterDataSet: "LESS_THAN", value: "Less than", matchMode: "lessThan" },
    {
      filterDataSet: "LESS_THAN_OR_EQUAL_TO",
      value: "Less than or equal to",
      matchMode: "endsWith",
    },
    {
      filterDataSet: "GREATER_THAN",
      value: "Greater than",
      matchMode: "equals",
    },
    {
      filterDataSet: "GREATER_THAN_OR_EQUAL_TO",
      value: "Greater than or equal to",
      matchMode: "notEquals",
    },
  ]);
  const [DateFilterOperator, setDateFilterOperator] = useState<any>([
    { filterDataSet: "DATE_IS", value: "Date is", matchMode: "dateIs" },
    {
      filterDataSet: "DATE_IS_NOT",
      value: "Date is not",
      matchMode: "dateIsNot",
    },
    {
      filterDataSet: "DATE_BEFORE",
      value: "Date before",
      matchMode: "dateBefore",
    },
    {
      filterDataSet: "DATE_AFTER",
      value: "Date after",
      matchMode: "dateAfter",
    },
  ]);
  //let receivedData = props.col

  const [filterForm, setFilterForm] = useState({
    dropdownMenu: null,
    filterField: [
      {
        filterColumn: "",
        textFilter: [
          {
            filterOperator: "",
            filterValue: "",
          },
        ],
      },
    ],
  });

  const onSubmit = async (e:any) => {
    e.preventDefault();
    // const data = [filterForm];
    // if (data[0].filterField[0].filterColumn !== "") {
    //   data.forEach((item) => {
    //     item.filterField.forEach((ele) => {
    //       if (ele.filterColumn["datatype"] === "String") {
    //         ele.textFilter.forEach((filter) => {
    //           const matchingFilter = TextFilterOperator.find(
    //             (f) => f.value === filter.filterOperator
    //           );
    //           if (matchingFilter) {
    //             filter.filterOperator = matchingFilter.filterDataSet;
    //           }
    //         });
    //       }
    //       if (ele.filterColumn["datatype"] === "Date") {
    //         ele.textFilter.forEach((filter) => {
    //           const matchingFilter = DateFilterOperator.find(
    //             (f) => f.value === filter.filterOperator
    //           );
    //           if (matchingFilter) {
    //             filter.filterOperator = matchingFilter.filterDataSet;
    //           }
    //         });
    //       }
    //       if (ele.filterColumn["datatype"] === "Number") {
    //         ele.textFilter.forEach((filter) => {
    //           const matchingFilter = NumericFilterOperator.find(
    //             (f) => f.value === filter.filterOperator
    //           );
    //           if (matchingFilter) {
    //             filter.filterOperator = matchingFilter.filterDataSet;
    //           }
    //         });
    //       }
    //     });
    //   });
    //   props.onDataReceived(filterForm);
    // } else {
    //   props.onDataReceived({});
    // }

    // props.onFlagReceived(false);
  };

  // const addFilterField = async (e) => {
  //   e.preventDefault();
  //   setFilterForm((prevState) => ({
  //     dropdownMenu: null,
  //     filterField: [
  //       ...prevState.filterField,
  //       {
  //         filterColumn: '',
  //         textFilter: [{ filterOperator: '', filterValue: '' }],
  //       },
  //     ],
  //   }));
  // };

  const addFilterField = async (e:any) => {
    e.preventDefault();

    // Check if the current filter group is valid
    const isCurrentGroupValid =
      filterForm.filterField[filterForm.filterField.length - 1].filterColumn &&
      filterForm.filterField[
        filterForm.filterField.length - 1
      ].textFilter.every(
        (textFilter) => textFilter.filterOperator && textFilter.filterValue
      );

    // Only add a new filter group if the current one is valid
    if (isCurrentGroupValid) {
      const selectedColumn =
        filterForm.filterField[filterForm.filterField.length - 1].filterColumn;

      // Remove the selected column from the dropdown options
      const updatedReceivedData = receivedData.filter(
        (column:any) => column !== selectedColumn
      );
      setFilterForm((prevState) => ({
        dropdownMenu: null,
        filterField: [
          ...prevState.filterField,
          {
            filterColumn: "",
            textFilter: [{ filterOperator: "", filterValue: "" }],
          },
        ],
      }));
    }
  };

  const addOperator = (e, index) => {
    e.preventDefault();
    setFilterForm((prevFilterForm) => {
      // Clone the textFilter array at the specified index and add a new object to it
      const newTextFilter = [
        ...prevFilterForm.filterField[index].textFilter,
        { filterOperator: "", filterValue: "" },
      ];

      // Clone the filterField array and update the relevant object with the new textFilter array
      const updatedFilterField = prevFilterForm.filterField.map((filter, i) =>
        i === index ? { ...filter, textFilter: newTextFilter } : filter
      );

      // Return the updated state
      return { ...prevFilterForm, filterField: updatedFilterField };
    });
  };

  const validateForm = () => {
    // Check if all fields are filled
    const isFormValid = filterForm.filterField.every((field) => {
      return (
        field.filterColumn &&
        field.textFilter.every((textFilter) => {
          return textFilter.filterOperator && textFilter.filterValue;
        })
      );
    });

    // Update the state to enable or disable the submit button
    setButtonDisabled(!isFormValid || error !== "");
  };

  //selected data should be shown in the pop up
  const validateFilterFormData = () => {
    if (
      props.filterFormData.length !== 0 &&
      Object.keys(props.filterFormData).length !== 0
    ) {
      const Formdata = [props.filterFormData];
      Formdata?.forEach((item) => {
        item.filterField?.forEach((ele:any) => {
          if (ele.filterColumn["datatype"] === "String") {
            ele.textFilter?.forEach((filter:any) => {
              const matchingFilter = TextFilterOperator.find(
                (f:any) => f.filterDataSet === filter.filterOperator
              );
              if (matchingFilter) {
                filter.filterOperator = matchingFilter.value;
              }
            });
          }
          if (ele.filterColumn["datatype"] === "Date") {
            ele.textFilter?.forEach((filter:any) => {
              const matchingFilter = DateFilterOperator.find(
                (f:any) => f.filterDataSet === filter.filterOperator
              );
              if (matchingFilter) {
                filter.filterOperator = matchingFilter.value;
              }
            });
          }
          if (ele.filterColumn["datatype"] === "Number") {
            ele.textFilter?.forEach((filter:any) => {
              const matchingFilter = NumericFilterOperator.find(
                (f:any) => f.filterDataSet === filter.filterOperator
              );
              if (matchingFilter) {
                filter.filterOperator = matchingFilter.value;
              }
            });
          }
        });
      });

      setFilterForm({ ...props.filterFormData });
    } else {
      setFilterForm({
        dropdownMenu: null,
        filterField: [
          {
            filterColumn: "",
            textFilter: [
              {
                filterOperator: "",
                filterValue: "",
              },
            ],
          },
        ],
      });
    }
  };

  useEffect(() => {
    validateForm();
  }, [filterForm]);
  useEffect(() => {
    validateFilterFormData();
  }, []);

  const clearFilterField = (index:any) => {
    const updatedFields = [...filterForm.filterField];
    updatedFields.splice(index, 1); // Remove the filter field at the specified index
    setFilterForm({ ...filterForm, filterField: updatedFields });
  };

  const clearFilterOperator = (index:any) => {
    const updatedFields = [...filterForm.filterField];

    // Check if it's the first filter form and there is more than one text filter
    if (index === 0 && updatedFields[0].textFilter.length > 1) {
      updatedFields[0].textFilter = [updatedFields[0].textFilter[0]]; // Keep only the first text filter
    } else {
      updatedFields.splice(index, 1); // Remove the entire filter field at the specified index
    }

    setFilterForm({ ...filterForm, filterField: updatedFields });
  };

  const onRemove = () => {
    setFilterForm({
      dropdownMenu: null,
      filterField: [
        {
          filterColumn: "",
          textFilter: [
            {
              filterOperator: "",
              filterValue: "",
            },
          ],
        },
      ],
    });
  };

  const removeTextFilter = (fieldIndex:any, textIndex:any) => {
    const updatedFields = [...filterForm.filterField];
    updatedFields[fieldIndex].textFilter.splice(textIndex, 1); // Remove the text filter at the specified index
    setFilterForm({ ...filterForm, filterField: updatedFields });
  };

  // Check if the last filter group is not valid
  const isAddGroupButtonDisabled = (index:any) => {
    // Check if the current filter group is not valid
    const currentFilterGroup = filterForm.filterField[index];
    return (
      !currentFilterGroup.filterColumn ||
      !currentFilterGroup.textFilter.every(
        (textFilter) => textFilter.filterOperator && textFilter.filterValue
      )
    );
  };

  const handleFilterColumnChange = (e:any, index:any) => {
    const selectedColumn = e.value;

    setFilterForm((prevState) => {
      const updatedFields = [...prevState.filterField];
      updatedFields[index].filterColumn = selectedColumn;
      return { ...prevState, filterField: updatedFields };
    });
  };

  const dropdownOptions = (index:any) => {
    const selectedColumns = filterForm.filterField
      .slice(0, index)
      .map((field) => field.filterColumn);
    return props.col.filter((column) => !selectedColumns.includes(column)); // Adjust this based on your data structure
  };
  function formatDateToDDMMYY(date:any) {
    if (!date || !(date instanceof Date)) {
      return "";
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="float-label-form table-filter">
      {/* <button
        type="button"
        className="btn-close"
        onClick={() => props.onFlagReceived(false)}
      ></button> */}
      {/* <div className="modal-title">Filter Criteria</div> */}
      {/* Render your filter form and other UI components here */}
      <div className="filtermain-box">
        <form onSubmit={onSubmit}>
          {/* <h6>Filter Criteria</h6> */}
          {/* Example: render filter fields dynamically */}
          {filterForm.filterField.map((field, index) => (
            <div className="addmore-filter" key={index}>
              {/* <h6>Filter Column:</h6> */}
              <span className="p-float-label">
                <Dropdown
                  //value={field.filterColumn}
                  // onChange={(e) => {
                  //   const updatedFields = [...filterForm.filterField];
                  //   updatedFields[index].filterColumn = e.value;
                  //   setFilterForm({ ...filterForm, filterField: updatedFields });
                  // }}
                  // options={receivedData}
                  // optionLabel="displayName"

                  // showClear
                  // placeholder=""
                  // inputId="state"
                  // className='dropdown'
                  filter={true}
                  value={field.filterColumn}
                  onChange={(e) => handleFilterColumnChange(e, index)}
                  options={dropdownOptions(index)}
                  optionLabel="displayName"
                  // showClear
                  placeholder=""
                  inputId={`filterColumn-${index}`}
                  className="dropdown"
                />
                <label htmlFor={`filterColumn-${index}`} className="required">
                  Filter Column:
                </label>
              </span>

              {field.filterColumn && (
                <h6 className="operator-heading">Select Operator:</h6>
              )}
              {/* Example: render text filters */}
              {field.textFilter.map((textFilter, textIndex) => (
                <div className="addnewfilter-field" key={textIndex}>
                  {
                    field.filterColumn
                      ? Object.values(field.filterColumn)?.map((dataType) => {
                          if (dataType === "String") {
                            return (
                              <span className="filter-col4 p-float-label">
                                <Dropdown
                                  value={textFilter.filterOperator}
                                  onChange={(e) => {
                                    const updatedFields = [
                                      ...filterForm.filterField,
                                    ];
                                    updatedFields[index].textFilter[
                                      textIndex
                                    ].filterOperator = e.value;
                                    setFilterForm({
                                      ...filterForm,
                                      filterField: updatedFields,
                                    });
                                  }}
                                  options={TextFilterOperator}
                                  optionLabel="value"
                                  // showClear
                                  placeholder=""
                                  className="dropdown"
                                  inputId="stateerre"
                                />
                                <label htmlFor="stateerre" className="required">
                                  Filter By:
                                </label>
                              </span>
                            );
                          }
                          if (dataType === "Date") {
                            return (
                              <label className="filter-col4 p-float-label">
                                <Dropdown
                                  value={textFilter.filterOperator}
                                  onChange={(e) => {
                                    const updatedFields = [
                                      ...filterForm.filterField,
                                    ];
                                    updatedFields[index].textFilter[
                                      textIndex
                                    ].filterOperator = e.value;
                                    setFilterForm({
                                      ...filterForm,
                                      filterField: updatedFields,
                                    });
                                  }}
                                  options={DateFilterOperator}
                                  optionLabel="value"
                                  // showClear
                                  placeholder=""
                                  className="dropdown"
                                  inputId="dfdefee"
                                />
                                <label htmlFor="stateerre" className="required">
                                  Filter By:
                                </label>
                              </label>
                            );
                          }
                          if (dataType === "Number") {
                            return (
                              <label className="filter-col4 p-float-label">
                                <Dropdown
                                  value={textFilter.filterOperator}
                                  onChange={(e) => {
                                    const updatedFields = [
                                      ...filterForm.filterField,
                                    ];
                                    updatedFields[index].textFilter[
                                      textIndex
                                    ].filterOperator = e.value;
                                    setFilterForm({
                                      ...filterForm,
                                      filterField: updatedFields,
                                    });
                                  }}
                                  options={NumericFilterOperator}
                                  optionLabel="value"
                                  // showClear
                                  placeholder=""
                                  className="dropdown"
                                  inputId="dfdefee"
                                />
                              </label>
                            );
                          }
                        })
                      : null
                    // <label className="p-float-label">
                    //   <Dropdown className="dropdown"
                    //     showClear placeholder="Filter By" />
                    // </label>
                  }

                  {/* <label>Filter Value:</label> */}
                  {field.filterColumn
                    ? Object.values(field.filterColumn)?.map((dataType) => {
                        if (dataType === "Number") {
                          return (
                            <span className="filter-col4 did-floating-label-content">
                              <InputText
                                type="text"
                                placeholder=""
                                className="did-floating-input custom-field"
                                value={textFilter.filterValue}
                                onChange={(e) => {
                                  const updatedFilters = [...field.textFilter];
                                  updatedFilters[textIndex].filterValue =
                                    e.target.value;
                                  const updatedFields = [
                                    ...filterForm.filterField,
                                  ];
                                  updatedFields[index].textFilter =
                                    updatedFilters;
                                  setFilterForm({
                                    ...filterForm,
                                    filterField: updatedFields,
                                  });
                                  const numericRegex = /^[0-9]*$/;

                                  if (
                                    numericRegex.test(textFilter.filterValue) ||
                                    textFilter.filterValue === ""
                                  ) {
                                    // If input is numeric or an empty string, update the state and clear error
                                    //setValue(inputValue);
                                    setError("");
                                  } else {
                                    // If input is non-numeric, set error message
                                    setError(
                                      "Please enter only numeric values."
                                    );
                                  }
                                }}
                              />
                              {error && (
                                <div style={{ color: "red" }}>{error} </div>
                              )}
                              <label className="did-floating-label required">
                                Select Value(Number):
                              </label>
                            </span>
                          );
                        }
                        if (dataType === "String") {
                          return (
                            <span className="filter-col4 did-floating-label-content">
                              <InputText
                                type="text"
                                placeholder=""
                                className="did-floating-input custom-field"
                                value={textFilter.filterValue}
                                onKeyPress={(e) => {
                                  const inputValue = e.key;
                                  if (
                                    !/^[a-zA-Z0-9-_@!#$%/()"^*]+$/.test(
                                      inputValue
                                    ) &&
                                    inputValue !== ""
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                onChange={(e) => {
                                  const updatedFilters = [...field.textFilter];
                                  updatedFilters[textIndex].filterValue =
                                    e.target.value;
                                  const updatedFields = [
                                    ...filterForm.filterField,
                                  ];
                                  updatedFields[index].textFilter =
                                    updatedFilters;
                                  setFilterForm({
                                    ...filterForm,
                                    filterField: updatedFields,
                                  });
                                  // if (/^[a-zA-Z0-9-]+$/.test(textFilter.filterValue) || textFilter.filterValue === '') {
                                  //   setError('');
                                  // } else {
                                  //   setError('Please enter only alphanumeric characters.');
                                  // }
                                }}
                              />
                              {error && (
                                <div style={{ color: "red" }}>{error}</div>
                              )}
                              <label className="did-floating-label required">
                                Select Value(String):
                              </label>
                            </span>
                          );
                        }
                        if (dataType === "Date") {
                          return (
                            <span className="filter-col4 did-floating-label-content">
                              {/* <input
                              type="text"
                              className='did-floating-input custom-field'
                              value={textFilter.filterValue}
                              onChange={(e) => {
                                const updatedFilters = [...field.textFilter];
                                updatedFilters[textIndex].filterValue = e.target.value;
                                const updatedFields = [...filterForm.filterField];
                                updatedFields[index].textFilter = updatedFilters;
                                setFilterForm({ ...filterForm, filterField: updatedFields });
                                const regex = /^\d{4}-\d{2}-\d{2}$/;
 
                                if (!regex.test(textFilter.filterValue)) {
                                  setError('Please enter a valid date (YYYY-MM-DD)');
 
                                }
 
                                // Handle the form submission with the validated date
                                setError('');
                              }}
                            /> */}

                              <div className="did-floating-label-content">
                                {/* <Calendar
                                id="date"
                                placeholder=""
                                className="custom-field did-floating-input"
                                value={textFilter.filterValue ? new Date(textFilter.filterValue) : null}
                                dateFormat="dd-mm-yy"
                                onChange={(e) => {
                                  const updatedFilters = [...field.textFilter];
                                  updatedFilters[textIndex].filterValue = e.target.value;
                                  const updatedFields = [...filterForm.filterField];
                                  updatedFields[index].textFilter = updatedFilters;
                                  setFilterForm({ ...filterForm, filterField: updatedFields });
                                  const regex = /^\d{4}-\d{2}-\d{2}$/;
 
                                  if (!regex.test(textFilter.filterValue)) {
                                    setError('Please enter a valid date (YYYY-MM-DD)');
 
                                  }
 
                                  // Handle the form submission with the validated date
                                  setError('');
                                }}
                              /> */}
                                <Calendar
                                  id="date"
                                  placeholder=""
                                  className="custom-field did-floating-input"
                                  value={
                                    textFilter.filterValue
                                      ? new Date(textFilter.filterValue)
                                      : null
                                  }
                                  dateFormat="dd-mm-yy"
                                  onChange={(e) => {
                                    const updatedFilters = [
                                      ...field.textFilter,
                                    ];
                                    updatedFilters[textIndex].filterValue =
                                      formatDateToDDMMYY(e.target.value);

                                    const updatedFields = [
                                      ...filterForm.filterField,
                                    ];
                                    updatedFields[index].textFilter =
                                      updatedFilters;
                                    setFilterForm({
                                      ...filterForm,
                                      filterField: updatedFields,
                                    });
                                  }}
                                />

                                {/* <label htmlFor="fromdate" className="did-floating-label">
                  Select Value(Date):
                  </label> */}
                              </div>
                              {error && (
                                <div style={{ color: "red" }}>{error}</div>
                              )}
                              <label
                                htmlFor="fromdate"
                                className="did-floating-label required"
                              >
                                Select Value(Date):
                              </label>
                            </span>
                          );
                        }
                      })
                    : null}
                  <div className="filter-buttonCol4">
                    {/* {textIndex === field.textFilter.length - 1 && field.filterColumn && (
                      <button className='plusFilter icon icon-add' onClick={(e) => addOperator(e, index)}> </button>)} */}
                    {field.textFilter.length > 1 && field.filterColumn && (
                      <button
                        className="minusFilter icon icon-minus"
                        type="button"
                        onClick={() => removeTextFilter(index, textIndex)}
                      >
                        {/* Unicode character for cross */}
                      </button>
                    )}
                    {textIndex === field.textFilter.length - 1 &&
                      field.filterColumn && (
                        <Button
                          className="plusFilter"
                          onClick={(e) => addOperator(e, index)}
                        >
                          {" "}+
                        </Button>
                      )}
                  </div>
                </div>
              ))}
              {/* Add more text filters */}
              <div className="addremove-group">
                {field.filterColumn && (
                  <button
                    className="addfilter-btn"
                    disabled={isAddGroupButtonDisabled(index)}
                    onClick={(e) =>
                      !isAddGroupButtonDisabled(index) && addFilterField(e)
                    }
                  >
                    Add Group
                  </button>
                )}
                {index !== 0 && (
                  <button
                    className="removefilter-btn"
                    type="button"
                    onClick={() => clearFilterField(index)}
                  >
                    Remove Group
                  </button>
                )}
                {index === 0 && filterForm.filterField.length > 1 && (
                  <button
                    className="removefilter-btn"
                    type="button"
                    onClick={() => clearFilterField(0)}
                  >
                    Remove Group
                  </button>
                )}
                {/* <button className='addfilter-btn' onClick={(e) => clearFilterField(e)}>Clear Filter</button> */}
              </div>
            </div>
          ))}
          <div className="submit-reset-row">
            <button
              className="addfilter-btn"
              type="submit"
              disabled={isButtonDisabled}
            >
              Submit
            </button>
            {/* <button className='addfilter-btn' type="submit" disabled={isButtonDisabled} onClick={onRemove}>Cancel</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableFilterDialog;
