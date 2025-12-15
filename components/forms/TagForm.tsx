import React, { useState } from "react";
import TextField from "./TextField";
import ColorPicker from "./ColorPicker";
import { InputButton } from "./Button";
import { z } from "zod";
import { ActionStatus, Tag, TagData, TagErrors } from "@/utils/types";
import { useCrudActions } from "../state/CrudActions.state";
import TagLocalService from "@/utils/api/tags";
import { mutate } from "swr";
import { ApiType, UrlBuilder } from "@/utils/api/url-builder";

type Props = {
    closeOnSave?: boolean;
    onSave?: (tag: Tag) => void;
    tagData?: Omit<Tag, "slug, updatedAt, createdAt, children">;
};

const TagForm: React.FC<Props> = ({ closeOnSave, onSave }) => {
    const tagService = new TagLocalService();
    const [actions, setActions] = useCrudActions();

    if (!setActions) {
        return;
    }

    const [tag, setTag] = useState<TagData>({ name: "", color: "#2b8cfb" });

    const [errors, setErrors] = useState<TagErrors>({
        parent: [],
        name: [],
        color: [],
    });

    const [status, setStatus] = useState<ActionStatus>(ActionStatus.NONE);

    const createTag = async (tagData: TagData) => {
        setStatus(ActionStatus.LOADING);
        const response = await tagService.createTag(tagData);
        if (!response.ok) {
            setStatus(ActionStatus.ERROR);
        } else {
            setStatus(ActionStatus.SUCCESS);

            if (closeOnSave) {
                setActions({ ...actions, modalOpen: false });
            }

            if (onSave) {
                onSave(response.data);
            }
        }

        return response.data;
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const validationSchema = z.object({
            parent: z.int().optional(),
            name: z.string().min(1, {
                message: "This field is required.",
            }),
            color: z.string().regex(/^#[0-9a-fA-F]{6}$/, {
                message: "Invalid Hex color format.",
            }),
        });

        const validationResult = validationSchema.safeParse(tag);

        if (!validationResult.success) {
            const errorsTree = z.treeifyError(validationResult.error);
            const colorErrors = errorsTree.properties?.color;
            const nameErrors = errorsTree.properties?.name;

            setErrors({
                parent: [],
                name: nameErrors ? nameErrors.errors : [],
                color: colorErrors ? colorErrors.errors : [],
            });

            return;
        }

        createTag(tag);
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="border-b border-white pb-2 mb-5">
                <h2 className="text-white uppercase font-bold">New tag</h2>
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
                    <ColorPicker
                        onChange={(color) => {
                            setTag({ ...tag, color });
                        }}
                        name="color"
                        label="Color"
                        hideLabel
                        value={tag.color}
                    />
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
