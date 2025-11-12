"use client";
import InteractiveModal from "@/components/common/InteractiveModal";
import TagForm from "@/components/forms/TagForm";
import TextField from "@/components/forms/TextField";
import React, { useState } from "react";

export type Props = {};

const Tags: React.FC<Props> = ({}) => {
    const [search, setSearch] = useState("");

    return (
        <div className="w-full h-full">
            <div className="w-full flex items-center gap-2">
                <TextField
                    containerClass="grow"
                    type="text"
                    label="Search"
                    name="search"
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    hideLabel
                />
            </div>
            <InteractiveModal modalKey="create">
                <TagForm />
            </InteractiveModal>
        </div>
    );
};

export default Tags;
