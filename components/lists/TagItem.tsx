import { Tag } from "@/utils/types";
import React from "react";

const TagItem: React.FC<Tag> = ({ name, color }) => {
    return (
        <div className="full border border-greenjade rounded flex items-center px-2 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
            <div
                style={{ backgroundColor: color }}
                className={`h-5 w-5 rounded-[50%]`}
            ></div>
            <div className="px-2">{name}</div>
        </div>
    );
};

export default TagItem;
