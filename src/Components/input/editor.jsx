import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const HTMLEditor = ({setValue}) => {

  const onChangeHandler = (htmlText) =>{
    setValue(htmlText);
  }

  return (
    <div>
      <SunEditor onChange={onChangeHandler} />
    </div>
  );
};
export default HTMLEditor;
