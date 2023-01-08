import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import country from "../data/country.json";
import district from "../data/districts.json";
import division from "../data/divisions.json";
import union from "../data/unions.json";
import upazilla from "../data/upazilas.json";
import { extractedData } from "../utils/extractedData";
import AutoCompleteInput from "./AutoCompleteInput";

const Form = ({ title, source, isCopyTriggered, setIsCopyTriggered }) => {
  // handling all of the form data into single object
  const [form, setForm] = useState({
    name: "",
    country: "",
    state: "",
    district: "",
    thana: "",
    union: "",
    zipcode: "",
    street: "",
    house: "",
    phone: "",
    fax: "",
  });

  // calling context api for storing formdata
  const { setFormData, formData } = useContext(FormContext);

  // this is id's that needed for filtering data
  const [formId, setFormId] = useState({
    country: "",
    state: "",
    district: "",
    thana: "",
    union: "",
  });

  // when there is an update, push the updated form into context
  useEffect(() => {
    if (source) {
      setFormData({
        form: form,
        formId: formId,
      });
    } else if (!source && isCopyTriggered) {
      if (formData?.form) {
        setForm(formData.form);
        setFormId(formData.formId);
        setIsCopyTriggered(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCopyTriggered, form]);

  // taking value from json file
  const dataObj = {
    country,
    district,
    division,
    union,
    upazilla,
  };

  // global onchange handler for reusability
  const onChangeHandler = (value, title) => {
    const tempObj = { ...form };
    if (title === "country" && form["state"]) {
      tempObj.state = "";
      tempObj.district = "";
      tempObj.thana = "";
      tempObj.union = "";
    } else if (title === "state" && form["district"]) {
      tempObj.district = "";
      tempObj.thana = "";
      tempObj.union = "";
    } else if (title === "district" && form["thana"]) {
      tempObj.thana = "";
      tempObj.union = "";
    } else if (title === "thana" && form["union"]) {
      tempObj.union = "";
    }
    tempObj[title] = value;
    setForm(tempObj);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="formContainer">
      <div className="formTitle">
        <h1 className="formTitleHeader">{title}</h1>
        {!source && (
          <button
            onClick={() => setIsCopyTriggered(true)}
            className="formTitleButton"
          >
            <img
              src="https://img.icons8.com/external-prettycons-flat-prettycons/16/null/external-down-arrow-orientation-prettycons-flat-prettycons.png"
              alt="downArrow"
            />
            <p>Copy Billing Address</p>
          </button>
        )}
      </div>
      <div className="formItem">
        <lable>Attention</lable>
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChangeHandler(e.target.value, "name")}
          placeholder="Enter Person/Site Name"
          className="formInput"
        />
      </div>
      <AutoCompleteInput
        onChangeHandler={onChangeHandler}
        form={form}
        dataArr={dataObj.country}
        title="country"
        setFormId={setFormId}
        label="Country"
      />
      <AutoCompleteInput
        onChangeHandler={onChangeHandler}
        form={form}
        dataArr={extractedData(dataObj.division, formId?.country, "country_id")}
        title="state"
        disabled={form.country === "" ? true : false}
        setFormId={setFormId}
        label="Division/Province/State"
      />
      <AutoCompleteInput
        onChangeHandler={onChangeHandler}
        form={form}
        dataArr={extractedData(dataObj.district, formId?.state, "division_id")}
        title="district"
        disabled={form.state === "" ? true : false}
        setFormId={setFormId}
        label="District"
      />
      <AutoCompleteInput
        onChangeHandler={onChangeHandler}
        form={form}
        dataArr={extractedData(
          dataObj.upazilla,
          formId?.district,
          "district_id"
        )}
        title="thana"
        disabled={form.district === "" ? true : false}
        setFormId={setFormId}
        label="City/Sub District/Thana"
      />
      <AutoCompleteInput
        onChangeHandler={onChangeHandler}
        form={form}
        dataArr={extractedData(dataObj.union, formId?.thana, "upazilla_id")}
        title="union"
        disabled={form.thana === "" ? true : false}
        setFormId={setFormId}
        label="Union/Area/Town"
      />
      <div className="formItem">
        <lable>House/suit/apartment no</lable>
        <input
          type="text"
          value={form.house}
          onChange={(e) => onChangeHandler(e.target.value, "house")}
          placeholder=""
          className="formInput"
        />
      </div>
      <div className="formItem">
        <lable>Phone</lable>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => onChangeHandler(e.target.value, "phone")}
          placeholder=""
          className="formInput"
        />
      </div>
      <div className="formItem">
        <lable>Fax</lable>
        <input
          type="text"
          value={form.fax}
          onChange={(e) => onChangeHandler(e.target.value, "fax")}
          placeholder=""
          className="formInput"
        />
      </div>
    </form>
  );
};

export default Form;
