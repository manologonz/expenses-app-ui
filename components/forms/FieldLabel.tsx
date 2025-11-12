import React from "react";

type Props = {
    htmlFor: string;
    hidden: boolean;
    text: string;
};

const FieldLabel: React.FC<Props> = ({ htmlFor, hidden, text }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`block w-full ${hidden ? "hidden" : ""}`}
        >
            {text}
        </label>
    );
};

export default FieldLabel;
