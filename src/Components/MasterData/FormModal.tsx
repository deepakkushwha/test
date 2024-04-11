import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import '../../../src/App.scss';
// import './App.scss';
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

  const getComponent = (item:any) => {

    switch (item?.datatype) {
      case "String":
        return <>
          <input
            className={ errors[item.payloadName] ? "inputs input-error": "inputs" } 
            required
            type={item?.datatype}
            id={item.payloadName}
            name={item.payloadName}
            value={formValues[item.payloadName] || ""}
            disabled={view}
            onChange={(e) => handleInputChange(e, item?.regex)}
            placeholder=""
          />
          <label className="user-labels">{(item?.displayName)}</label>
          <div className="error-msg">{errors[item?.payloadName]}</div>
        </>
        break;
      case "Number":
        return <>
          <div className="input-section pr-input-number">
            <span className="">
              <InputNumber
                className={ errors[item.payloadName] ? "inputs input-error": "inputs" } 
                required
                id={item.payloadName}
                name={item.payloadName}
                value={formValues[item.payloadName] || ""}
                disabled={view}
                onValueChange={(e) => handleInputChange(e, item?.regex)}
                placeholder=""
                useGrouping={false}
                maxLength={6}
              />
               <label className="user-labels">{(item?.displayName)}</label>
              <div className="error-msg">{errors[item?.payloadName]}</div>
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
              className={ errors[item.payloadName] ? "inputs input-error": "inputs" } 
              required
              value={formValues[item.payloadName] || ""}
              placeholder=""
              readOnlyInput
              dateFormat="dd-mm-yy"
              onChange={(e) => handleInputChange(e, item?.regex)}
            />
            <label className="user-labels">{(item?.displayName)}</label>
            <div className="error-msg">{errors[item?.payloadName]}</div>
          </span>
        </div>
        break;
      case "Boolean":
        return <>
          <div className="did-floating-label-content">
            <select
              className={ errors[item.payloadName] ? "inputs input-error": "inputs" } 
              required
              aria-label="Default select example"
              name={item?.payloadName}
              onChange={handleInputChange}
              value={formValues[item.payloadName] || ""}
            >
              <option value="" selected>Select</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <label className="user-labels"> {(item?.displayName)} </label>
          </div>
        </>
        break;

      default:
        return <>
          <input
            className={ errors[item.payloadName] ? "inputs input-error": "inputs" } 
            required
            type={item?.datatype}
            id={item.payloadName}
            name={item.payloadName}
            value={formValues[item.payloadName] || ""}
            disabled={view}
            onChange={(e) => handleInputChange(e, item?.regex)}
            placeholder=""
          />
         <label className="user-labels">{(item?.displayName)}</label>
          <div className="error-msg">{errors[item?.payloadName]}</div>
        </>
        break;
    }

  }
  console.log("formData",formData)
  return (
    <>

      <form onSubmit={handleSubmit}>
        <div className="craeteIDV-row">
          {formData?.sort((a:any, b:any) => a.columnOrder - b.columnOrder).map((item: any, index: any) =>
            item?.createEditDisplay ? (
              <div className="craeteIDVcol-6" key={index}>

                <div className="floatinput-group">
                  {getComponent(item)}
                 
                </div>

              </div>
            ) : null
          )}
        </div>

        {!view && (
          <div className="login-footerBox">
            <button className="login-btn" type="submit">
              Submit
            </button>
          </div>
        )}
      </form>

    </>
  );
};

export default FormModal;
