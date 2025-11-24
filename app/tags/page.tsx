"use client";
import InteractiveModal from "@/components/common/InteractiveModal";
import TagForm from "@/components/forms/TagForm";
import TextField from "@/components/forms/TextField";
import { useTagList } from "@/components/hooks/tags";
import TagItem from "@/components/lists/TagItem";
import React, { useState } from "react";

export type Props = {};

const Tags: React.FC<Props> = ({}) => {
    const [search, setSearch] = useState("");
    const { data, status } = useTagList();

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
            <div className="w-full flex flex-col gap-3">
                {status === "loading" && (
                    <div className="w-full text-center p-2"> Loading... </div>
                )}
                {status === "success" && !!data.length ? (
                    data.map((tagItem) => {
                        return <TagItem key={tagItem.id} {...tagItem} />;
                    })
                ) : status === "success" && !data.length ? (
                    <div className="w-full text-center p-2">No tags found</div>
                ) : null}
                {status === "error" && (
                    <div className="w-full text-center p-2">
                        Cant fetch tags
                    </div>
                )}
            </div>
            <InteractiveModal modalKey="create">
                <TagForm />
            </InteractiveModal>
        </div>
    );
};

export default Tags;
