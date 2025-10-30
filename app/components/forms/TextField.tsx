import React from "react";
import FieldErrors from "./FieldErrors";

export type Props = {
    autocomplete?: string;
    name: string;
    type: "text" | "password" | "email";
    id?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label: string;
    errors?: string[];
};

const TextField: React.FC<Props> = ({
    name,
    type,
    id,
    errors,
    value,
    label,
    autocomplete = "true",
    onChange,
}) => {
    return (
        <div className="block py-2.5">
            <label htmlFor={name} className="block w-full">
                {label}
            </label>
            <input
                className="h-[35px] px-2.5 py[2px] block w-full border border-greenjade rounded-[5px] text-[16px]"
                autoComplete={autocomplete}
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
            {!!errors?.length && <FieldErrors errors={errors} />}
        </div>
    );
};

export default TextField;
