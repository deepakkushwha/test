import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import React from "react";
// import { toTitleCase } from "../../utils/commonUtils";

const FormModal: React.FC<any> = ({
  handleSubmit,
  formData,
  handleInputChange,
  formValues,
  errors,
  view,
  isDisable,
}) => {
  // console.log('isDisable', isDisable, formData);

  const getComponent = (item) => {

    switch (item?.datatype) {
      case "String":
        return <>
          <input
            className={
              errors[item.payloadName]
                ? " form-control did-floating-input input-error"
                : " form-control did-floating-input"
            }
            type={item?.datatype}
            id={item.payloadName}
            name={item.payloadName}
            value={formValues[item.payloadName] || ""}
            disabled={view}
            onChange={(e) => handleInputChange(e, item?.regex)}
            placeholder=""
          />
          <label className="did-floating-label ">
            {(item?.displayName)}
          </label>
          <div className="error-msg">
            {errors[item?.payloadName]}
          </div>
        </>
        break;
      case "Number":
        return <>
          <div className="input-section pr-input-number">
            <span className="">
              <InputNumber
                className={
                  errors[item.payloadName]
                    ? "gradient-label-input input-error"
                    : "gradient-label-input"
                }
                // className="gradient-label-input"
                id={item.payloadName}
                name={item.payloadName}
                value={formValues[item.payloadName] || ""}
                disabled={view}
                onValueChange={(e) => handleInputChange(e, item?.regex)}
                placeholder=""
                useGrouping={false}
                maxLength={6}
              />
              <label className="did-floating-label ">
                {(item?.displayName)}
              </label>
              <div className="error-msg">
                {errors[item?.payloadName]}
              </div>
            </span>
          </div>

        </>
        break;
      case "Date":
        return <div className="">
          <span className="did-floating-label-content">
            <Calendar
              id="date"
              name={item.payloadName}
              className={`custom-field did-floating-input`}
              value={formValues[item.payloadName] || ""}
              placeholder=""
              readOnlyInput
              dateFormat="dd-mm-yy"
              // maxDate={new Date()}
              onChange={(e) => handleInputChange(e, item?.regex)}
            />
            <label
              className="did-floating-label "
              htmlFor="fromdate"
            >
              {(item?.displayName)}
            </label>
            <div className="error-msg">
              {errors[item?.payloadName]}
            </div>
          </span>
          {/* {!valid && <div className="error-message">{message}</div>} */}
        </div>
        break;
      case "Boolean":
        return <>
          <div className="did-floating-label-content">
            <select
              className={
                errors[item.payloadName]
                  ? "did-floating-select input-error"
                  : "did-floating-select"
              }
              aria-label="Default select example"
              name={item?.payloadName}
              onChange={handleInputChange}
              value={formValues[item.payloadName] || ""}
            >
              <option value="" selected>
                Select
              </option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <label className="did-floating-label">
              {(item?.displayName)}
            </label>
          </div>
        </>
        break;

      default:
        return <>
          <input
            className={
              errors[item.payloadName]
                ? " form-control did-floating-input input-error"
                : " form-control did-floating-input"
            }
            type={item?.datatype}
            id={item.payloadName}
            name={item.payloadName}
            value={formValues[item.payloadName] || ""}
            disabled={view}
            onChange={(e) => handleInputChange(e, item?.regex)}
            placeholder=""
          />
          <label className="did-floating-label ">
            {(item?.displayName)}
          </label>
          <div className="error-msg">
            {errors[item?.payloadName]}
          </div>
        </>
        break;
    }

  }
  console.log("formData",formData)
  return (
    <>

      <form onSubmit={handleSubmit}>
        <div className="craeteIDV-row">
          {formData?.sort((a, b) => a.columnOrder - b.columnOrder).map((item: any, index: any) =>
            item?.createEditDisplay ? (
              <div className="craeteIDVcol-6" key={index}>

                <div className="form-group did-floating-label-content">
                  {getComponent(item)}
                 
                </div>

              </div>
            ) : null
          )}
        </div>

        {!view && (
          <div className="login-footerBox mt-3">
            <button className={`btn submitbtn ${isDisable && 'disabled'}`} type="submit">
              Submit
            </button>
          </div>
        )}
      </form>

    </>
  );
};

export default FormModal;
