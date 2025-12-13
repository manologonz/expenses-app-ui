import React from "react";

type Props = {
    htmlFor: string;
    hidden: boolean;
    text: string;
    className?: string;
};

const FieldLabel: React.FC<Props> = ({ htmlFor, hidden, text, className }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block w-full ${hidden ? "hidden" : ""} ${
                className ? className : ""
            }`}
        >
            {text}
        </label>
    );
};

export default FieldLabel;
