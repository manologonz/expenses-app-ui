"use client";
import InteractiveModal from "@/components/common/InteractiveModal";
import { Button } from "@/components/forms/Button";
import TagForm from "@/components/forms/TagForm";
import TextField from "@/components/forms/TextField";
import { useTagList } from "@/components/hooks/tags";
import LoadingMask from "@/components/layouts/LoadingMask";
import TagItem from "@/components/lists/Tag/TagItem";
import TagList from "@/components/lists/Tag/TagList";
import { ActionStatus } from "@/utils/types";
import React, { useState } from "react";

export type Props = {};

const Tags: React.FC<Props> = ({}) => {
    const { data, status, search, hasMore, mutate, next, doSearch } =
        useTagList();

    return (
        <div className="w-full h-full">
            <div className="w-full">
                <div className="w-full flex items-center gap-2 fixed left-0 top-12.5 bg-white p-2 ">
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
                <div className="w-full flex flex-col gap-3 pt-15 pb-3">
                    {data.map((tagResponse) => {
                        return tagResponse.data.map((tagItem) => {
                            return <TagItem key={tagItem.id} {...tagItem} />;
                        });
                    })}

                    <LoadingMask status={status} pluralModelName="tags">
                        {hasMore && (
                            <div className="w-full">
                                <Button
                                    loading={
                                        status === ActionStatus.LOADING_MORE
                                    }
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
            <InteractiveModal modalKey="entity-create">
                <TagForm
                    modalId="entity-create"
                    closeOnSave
                    onSave={() => {
                        mutate();
                    }}
                />
            </InteractiveModal>
        </div>
    );
};

export default Tags;
