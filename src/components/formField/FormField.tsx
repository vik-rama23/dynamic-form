import React from "react";

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

interface FormFieldProps {
    field: Field;
    formData: { [key: string]: any };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, formData, handleChange }) => {
    switch (field.type) {
        case "text":
        case "email":
        case "number":
        case "password":
        case "date":
            return (
                <input
                    type={field.type}
                    name={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                    className={field.type + "-input"}
                    maxLength={field.validation?.maxLength}
                    minLength={field.validation?.minLength}
                    pattern={field.validation?.pattern}
                />
            );
        case "select":
            return (
                <select name={field.label} required={field.required} onChange={handleChange}>
                    <option value="">Select...</option>
                    {field.options?.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        case "checkbox":
            return (
                <div>
                    {field.options?.map((option, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name={field.label}
                                value={option.value}
                                onChange={handleChange}
                                required={field.required}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            );
        case "radio":
            return (
                <div>
                    {field.options?.map((option, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name={field.label}
                                value={option.value}
                                onChange={handleChange}
                                required={field.required}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            );
        case "textarea":
            return (
                <div>
                    <textarea
                        name={field.label}
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={handleChange}
                        className={field.type + "-input"}
                    />
                </div>
            );
        case "file":
            return (
                <div className="file-input-container">
                    <input
                        type="file"
                        name={field.id}
                        accept=".jpeg,.png"
                        required={field.required}
                        onChange={handleChange}
                        className={field.type + "-input"}
                    />
                    {formData[`${field.id}Preview`] && (
                        <img
                            src={formData[`${field.id}Preview`]}
                            alt="Profile Preview"
                            className="profile-preview"
                        />
                    )}
                </div>
            );
        default:
            return null;
    }
};

export default FormField;