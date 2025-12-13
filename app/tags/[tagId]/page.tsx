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

const TagPage: React.FC<Props> = ({}) => {
    const { data, status, search, hasMore, mutate, next, doSearch } =
        useTagList();

    return (
        <div className="w-full h-full">
            <div className="w-full">Content here</div>
            <InteractiveModal modalKey="create">
                <TagForm
                    closeOnSave
                    onSave={() => {
                        mutate();
                    }}
                />
            </InteractiveModal>
        </div>
    );
};

export default TagPage;
