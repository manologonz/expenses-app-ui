import React from "react";

export type Props = {
    name: string;
    type: "text" | "password" | "email";
    id?: string;
    value: string;
};

const TextField: React.FC<Props> = ({ name, type, id, value }) => {
    return (
        <div className="py-1.5">
            <input id={id} type={type} name={name} value={value} />;
        </div>
    );
};

export default TextField;
