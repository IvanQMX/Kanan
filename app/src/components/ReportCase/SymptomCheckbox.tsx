import React from "react";

export default function SymptomsCheckbox({ isChecked, label, checkHandler, index }) {
  return (
    <div className="flex items-start" key={index}>
      <div className="flex items-center h-5">
        <input
          id={`symptom-${index}`}
          checked={isChecked === undefined ? false : isChecked}
          onChange={checkHandler}
          type="checkbox"
          className="checkbox-button"
        />
      </div>
      <label htmlFor={`symptom-${index}`} className="ml-3 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}
