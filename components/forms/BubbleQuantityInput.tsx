import React from "react";
import FieldLabel from "./FieldLabel";
import ErrorBox from "./ErrorBox";

type Props = {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: number;
    id?: string;
    name: string;
    label: string;
    errors?: string[];
};

const BubbleQuantityInput: React.FC<Props> = ({
    onChange,
    value,
    label,
    name,
    id,
    errors,
}) => {
    return (
        <div className="flex flex-col py-2.5 w-full items-center">
            <FieldLabel
                htmlFor={id || "input-" + name}
                hidden={true}
                text={label}
            />
            <input
                inputMode="decimal"
                className="bg-white border border-greenjade h-10 w-30 rounded-4xl px-2 py-1 text-center no-ui"
                id={id || "input-" + name}
                type="number"
                value={value}
                onChange={onChange}
            />
            {!!errors?.length && <ErrorBox errors={errors} />}
        </div>
    );
};

export default BubbleQuantityInput;
