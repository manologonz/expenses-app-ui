import React, { useState } from "react";
import TextField from "./TextField";
import ColorPicker from "./ColorPicker";
import { InputButton } from "./Button";
import { object, treeifyError } from "zod";
import {
    ActionStatus,
    ServiceResponse,
    Tag,
    TagData,
    TagErrors,
} from "@/utils/types";
import { useCrudActions } from "../state/CrudActions.state";
import TagLocalService from "@/utils/api/tags";
import { getTagValidationObject } from "@/utils/tags";

type Props = {
    closeOnSave?: boolean;
    onSave?: (tag?: Tag) => void;
    tagData?: Omit<Tag, "slug, updatedAt, createdAt, children">;
    title?: string;
    parentId?: number;
    isSubtag?: boolean;
};

const TagForm: React.FC<Props> = ({
    title,
    closeOnSave,
    tagData,
    parentId,
    isSubtag,
    onSave,
}) => {
    const tagService = new TagLocalService();
    const [actions, setActions] = useCrudActions();
    const isEdit = !!tagData?.id;

    if (!setActions) {
        return;
    }

    let initialTag: TagData = { name: "", parent: parentId };

    if (!isSubtag) {
        initialTag.color = "#2b8cfb";
    }

    if (tagData) {
        initialTag = {
            id: tagData.id,
            name: tagData.name,
            color: tagData.color,
        };
    }

    const [tag, setTag] = useState<TagData>(initialTag);

    const [errors, setErrors] = useState<TagErrors>({
        parent: [],
        name: [],
        color: [],
    });

    const [status, setStatus] = useState<ActionStatus>(ActionStatus.NONE);

    const saveData = async (tagData: TagData) => {
        setStatus(ActionStatus.LOADING);

        let response: ServiceResponse<Tag>;

        if (isEdit && tagData.id) {
            response = await tagService.updateTag(tagData.id, tagData);
        } else {
            response = await tagService.createTag(tagData);
        }

        if (!response?.ok) {
            setStatus(ActionStatus.ERROR);
        } else {
            setStatus(ActionStatus.SUCCESS);

            if (closeOnSave) {
                setActions({
                    ...actions,
                    modal: { open: true, key: "edit-tag" },
                });
            }

            if (onSave) {
                onSave(response.data);
            }
        }

        return response.data;
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const validationSchema = object(
            getTagValidationObject({ subtag: true }),
        );

        const validationResult = validationSchema.safeParse(tag);

        if (!validationResult.success) {
            const errorsTree = treeifyError(validationResult.error);
            const colorErrors = errorsTree.properties?.color;
            const nameErrors = errorsTree.properties?.name;

            setErrors({
                parent: [],
                name: nameErrors ? nameErrors.errors : [],
                color: colorErrors ? colorErrors.errors : [],
            });

            return;
        }

        saveData(tag);
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="border-b border-white pb-2 mb-5">
                <h2 className="text-white uppercase font-bold">
                    {title || "New tag"}
                </h2>
            </div>
            <form
                className="flex flex-col justify-between grow"
                onSubmit={handleSubmit}
            >
                <div className="grow">
                    <TextField
                        errors={errors.name}
                        containerClass="grow"
                        inputClass="bg-white"
                        label="Name"
                        type="text"
                        name="name"
                        value={tag.name}
                        onChange={(e) => {
                            setTag({ ...tag, name: e.target.value });
                        }}
                        hideLabel
                    />
                    {!isSubtag && (
                        <ColorPicker
                            onChange={(color) => {
                                setTag({ ...tag, color });
                            }}
                            name="color"
                            label="Color"
                            hideLabel
                            value={tag.color || "#FFF"}
                        />
                    )}
                </div>
                <div className="mt-10">
                    <InputButton
                        className="w-full"
                        variation="greenjade"
                        text="Save"
                        loading={status === ActionStatus.LOADING}
                    />
                </div>
            </form>
        </div>
    );
};

export default TagForm;
