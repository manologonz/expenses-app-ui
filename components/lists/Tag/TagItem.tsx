import { Tag } from "@/utils/types";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const TagItem: React.FC<Tag> = ({ id, name, color }) => {
    return (
        <Link
            href={`/tags/${id}`}
            className="full border border-greenjade rounded flex items-center justify-between px-2 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.16)]"
        >
            <div className="flex items-center">
                <div
                    style={{ backgroundColor: color }}
                    className={`h-5 w-5 rounded-[50%]`}
                ></div>
                <div className="px-2">{name}</div>
            </div>
            <ChevronRight color="#5b8e7d" />
        </Link>
    );
};

export default TagItem;
