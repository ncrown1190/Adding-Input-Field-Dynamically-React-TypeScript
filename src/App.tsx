import React, { FormEvent } from "react";
import { useState, useRef } from "react";
import Input from "./Input";
import "./App.css";

function App() {
  const [formValues, setFormValues] = useState<any>([]);
  const [toggle, setToggle] = useState(false);

  const inputRef: any = useRef<string>();
  const selectRef = useRef<any>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(
      formValues.map((val: any) => {
        return { [val.label]: val.value };
      })
    );
    setFormValues([]);
  };

  const handleChange = (e: any, index: any) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = (e: any) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      label: inputRef.current.value || "label",
      type: selectRef.current.value || "text",
      value: "",
    });
    setFormValues(values);
    setToggle(false);
  };

  const handleDeleteField = (e: any, index: any) => {
    const values = [...formValues];
    values.splice(index, 1);
    setFormValues(values);
  };

  const addBtnClick = (e: any) => {
    e.preventDefault();
    setToggle(true);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {!toggle ? (
          <div className="center">
            <button className="add-btn" onClick={addBtnClick}>
              Add new
            </button>
          </div>
        ) : (
          <div className="dialog-box">
            <input type="text" placeholder="label" ref={inputRef} />
            <select ref={selectRef}>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
            </select>
            <button className="add-btn" onClick={handleAddField}>
              Add
            </button>
          </div>
        )}
        {formValues.map((obj: any, index: any) => (
          <Input
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
            //add this for deleteField
            deleteField={handleDeleteField}
          />
        ))}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
