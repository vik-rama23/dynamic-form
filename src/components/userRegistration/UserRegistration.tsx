import React, { useState } from "react";
import formConfig from "../../JsonSchema.json";
import FormContainer from "../formField/FormContainer";
import styled from "styled-components";

const DynamicForm: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [submittedData, setSubmittedData] = useState<{ [key: string]: any } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    //setting uploaded profile pic and defining its limit to 2MB
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert("File size should be less than 2 MB");
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({
            ...formData,
            [name]: file,
            [`${name}Preview`]: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    } else if (type === "checkbox") {
      const updatedCheckboxes = formData[name] ? [...formData[name]] : [];
      if (checked) {
        updatedCheckboxes.push(value);
      } else {
        const index = updatedCheckboxes.indexOf(value);
        if (index > -1) {
          updatedCheckboxes.splice(index, 1);
        }
      }
      setFormData({
        ...formData,
        [name]: updatedCheckboxes,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //Submit the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };
    // delete dataToSubmit.password;
    setSubmittedData(dataToSubmit);
  };

  const handleExport = () => {
    if (submittedData) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submittedData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "submitted_data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else {
      alert("No data to export");
    }
  };

  return (
    <StyledFormContainer>
      <div className="form-section">
        <FormContainer
          formConfig={formConfig}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="submitted-data-section">
        Form Data: 
        {submittedData && (
          <div>
            <h3>Submitted Data</h3>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            <button onClick={handleExport}>Export JSON</button>
          </div>
        )}
      </div>
    </StyledFormContainer>
  );
};

const StyledFormContainer = styled.div`
 display: flex;
  .form-section {
    flex: 1;
  }

  .submitted-data-section {
    flex: 1;
    max-width: 400px;
  }

`

export default DynamicForm;