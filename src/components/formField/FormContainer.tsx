import React from "react";
import styled from "styled-components";
import FormField from "./FormField";

interface Validation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  message?: string;
}

interface Field {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: Validation;
}

interface FormConfig {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

interface FormContainerProps {
  formConfig: FormConfig;
  formData: { [key: string]: any };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  previewProfilePic?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ formConfig, formData, handleChange, handleSubmit, previewProfilePic }) => {
  return (
    <StyledFormContainer>
      <div className="form-container">
        <h3>{formConfig.formTitle}</h3>
        <p>{formConfig.formDescription}</p>
        <form onSubmit={handleSubmit}>
          {formConfig.fields.map((field) => (
            <div key={field.id}>
              <label className="form-container_label">{field.label}</label>
              <FormField field={field} formData={formData} handleChange={handleChange} previewProfilePic = {previewProfilePic} />
            </div>
          ))}
          <div className="button-container">
            <button type="reset" className="button reset-button">Reset</button>
            <button type="submit" className="button submit-button">Submit</button>

          </div>
        </form>
      </div>
    </StyledFormContainer>
  );
};

const StyledFormContainer = styled.div`
display: flex;

.form-container {
 width: 80%;
  background: #e6e6e6;
  padding: 4%;
}
.form-container_label {
  display: flex;
  margin: 13px 0 0 0;
}

.password-input,
.date-input,
.email-input,
.text-input {
  width: 80%;
  height: 27px;
  border-radius: 4px;
  padding: 5px;
}

.textarea-input {
  width: 80%;
  height: 100px;
  border-radius: 4px;
  padding: 5px;
}
.file-input-container {
  
}

.profile-preview {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-top: 10px;
  object-fit: cover;
}

.button-container {
    display: flex;
    gap: 4%;
    margin-top: 20px;
}

.button {
    margin-top: 15px;
    width: 35%;
    height: 40px;
}
.submit-button {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    padding: 10px;
    border-radius: 5px;
    background: #03A9F4;
}

`;

export default FormContainer;