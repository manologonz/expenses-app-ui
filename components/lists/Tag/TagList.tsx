"use client";
import TextField from "@/components/forms/TextField";
import { useTagList } from "@/components/hooks/tags";
import React, { useEffect, useRef } from "react";
import TagItem from "./TagItem";
import { ActionStatus, Tag } from "@/utils/types";
import LoadingMask from "@/components/layouts/LoadingMask";
import { Button } from "@/components/forms/Button";

type Props = {};

const TagList: React.FC<Props> = (props) => {
    const { data, status, search, hasMore, next, doSearch } = useTagList();

    return (
        <div className="w-full">
            <div className="w-full flex items-center gap-2 fixed left-0 top-[50px] bg-white p-2 ">
                <TextField
                    containerClass="grow"
                    type="text"
                    label="Search"
                    name="search"
                    value={search}
                    onChange={(event) => {
                        doSearch(event.target.value);
                    }}
                    hideLabel
                />
            </div>
            <div className="w-full flex flex-col gap-3 pt-[60px] pb-3">
                {data.map((tagResponse) => {
                    return tagResponse.data.map((tagItem) => {
                        return <TagItem key={tagItem.id} {...tagItem} />;
                    });
                })}

                <LoadingMask status={status} pluralModelName="tags">
                    {hasMore && (
                        <div className="w-full">
                            <Button
                                loading={status === ActionStatus.LOADING_MORE}
                                onClick={() => {
                                    next();
                                }}
                                variation="greenjade"
                                text="Load more"
                                full
                            ></Button>
                        </div>
                    )}
                </LoadingMask>
            </div>
        </div>
    );
};

export default TagList;
