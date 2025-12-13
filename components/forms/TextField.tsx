import React from "react";
import ErrorBox from "./ErrorBox";

export type Props = {
    autocomplete?: string;
    name: string;
    type: "text" | "password" | "email";
    id?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label: string;
    hideLabel?: boolean;
    errors?: string[];
    placeholder?: string;
    containerClass?: string;
    inputClass?: string;
};

const TextField: React.FC<Props> = ({
    name,
    type,
    id,
    errors,
    value,
    label,
    hideLabel,
    autocomplete = "true",
    placeholder,
    containerClass,
    inputClass,
    onChange,
}) => {
    return (
        <div className={`block py-2.5 ${containerClass ? containerClass : ""}`}>
            <label
                htmlFor={name}
                className={`block w-full ${hideLabel ? "hidden" : ""}`}
            >
                {label}
            </label>
            <input
                className={`h-10 px-2.5 py-0.5 block w-full border border-greenjade rounded-[5px] text-[16px] ${
                    inputClass ? inputClass : ""
                }`}
                autoComplete={autocomplete}
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder || label}
            />
            {!!errors?.length && <ErrorBox errors={errors} />}
        </div>
    );
};

export default TextField;
