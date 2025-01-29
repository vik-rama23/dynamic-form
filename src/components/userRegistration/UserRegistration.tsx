import React, { useState } from "react";
import formConfig from "../../JsonSchema.json";
import FormContainer from "../formField/FormContainer";
import styled from "styled-components";

const DynamicForm: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [submittedData, setSubmittedData] = useState<{ [key: string]: any } | null>(null);
  const [previewProfilePic, setPreviewProfilePic] = useState<string | undefined>(undefined);

  //Handle change in form fields using formdata state and setFormData function to update the state
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
            [name]: file.name,
          });
          console.log(reader.result);
          setPreviewProfilePic(reader?.result as string);
        };
        reader.readAsDataURL(file);
        setFormData({
          ...formData,
          [`${name}FileName`]: file.name, // Store the file name
        });
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
    setSubmittedData(dataToSubmit);
  };

  //handling jsons schema export
  const handleExport = () => {
    if (formConfig) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formConfig, null, 2));
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
          previewProfilePic={previewProfilePic}
        />
      </div>
      <div className="submitted-data-section">
        Form Data: 
        {submittedData && (
          <div>
            <h3>Submitted Data</h3>
            <pre>{submittedData ? JSON.stringify(submittedData, null, 2) : "No data submitted yet"}</pre>
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
   width: 50%;
  }

  .submitted-data-section {
    max-width: 300px;
  }

`

export default DynamicForm;