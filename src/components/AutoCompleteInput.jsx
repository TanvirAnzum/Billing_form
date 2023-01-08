import React, { useEffect, useState } from "react";

const AutoCompleteInput = ({
  onChangeHandler,
  form,
  dataArr,
  title,
  disabled,
  setFormId,
  label,
}) => {
  // for collapse
  const [collapse, setCollapse] = useState(false);

  // for search input
  const [input, setInput] = useState("");

  // for suggested lists
  const [suggestion, setSuggestion] = useState([]);

  // suggested list creation from extracted data
  useEffect(() => {
    if (input) {
      const suggestionArr = [];
      dataArr?.map((item) => {
        const searchItem = item.name.toLowerCase();
        const searchKey = input.toLowerCase();
        if (searchItem.includes(searchKey)) {
          suggestionArr.push({
            id: item.id,
            name: item.name,
          });
        }
        return item;
      });
      setSuggestion(suggestionArr.sort());
    } else {
      setSuggestion(dataArr);
    }
  }, [dataArr, input]);

  return (
    <div className="container relative" disabled={true}>
      <p>{label}</p>
      <div
        onClick={() => !disabled && setCollapse(!collapse)}
        className="inputWrapper"
      >
        <p>{form[title] ? form[title] : "Please Search"}</p>

        <img
          src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/null/external-up-arrow-arrows-inkubators-detailed-outline-inkubators-2.png"
          alt="upArrow"
          className={collapse ? "" : "rotate"}
        />
      </div>
      {collapse && (
        <div className="searchBox">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <ul>
            {suggestion?.map((item) => (
              <li
                onClick={() => {
                  onChangeHandler(item.name, title);
                  setCollapse(false);
                  setFormId((prev) => {
                    const updatedObj = {
                      ...prev,
                    };
                    prev[title] = item.id;
                    return updatedObj;
                  });
                  setInput("");
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
