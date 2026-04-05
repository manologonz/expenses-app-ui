"use client";
import { redirect } from "next/navigation";
import InteractiveModal from "@/components/common/InteractiveModal";
import { Button } from "@/components/forms/Button";
import TagForm from "@/components/forms/TagForm";
import { useTagItem } from "@/components/hooks/tags";
import LoadingMask from "@/components/layouts/LoadingMask";
import React, { use, useState } from "react";
import { Plus } from "lucide-react";
import { useCrudActions } from "@/components/state/CrudActions.state";
import { Tag } from "@/utils/types";

export type Props = {
    params: Promise<{ tagId: string }>;
};

const TagPage: React.FC<Props> = ({ params }) => {
    const { tagId } = use(params);
    const { data, status, mutate, deleteTag } = useTagItem(parseInt(tagId));
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [actions, setActions] = useCrudActions();
    const [subtag, setSubtag] = useState<Tag>();

    if (!setActions) {
        return;
    }

    const handleDelete = async () => {
        setDeleteLoading(true);
        const response = await deleteTag();
        setDeleteLoading(false);
        if (response.ok) {
            redirect("/tags");
        }
    };

    return (
        <div className="w-full h-full">
            <LoadingMask status={status}>
                <div className="w-full">
                    <div className="w-full border border-gray-100 px-3 pt-4 rounded-[10px] shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] mb-6">
                        <div className="w-full flex justify-between items-center mb-5">
                            <span>Name: </span>
                            <span className="rounded-[10px] bg-gray-200 px-3">
                                {data?.name}
                            </span>
                        </div>
                        <div className="w-full flex justify-between items-center mb-5">
                            <span>Color: </span>
                            <span
                                style={{ backgroundColor: data?.color }}
                                className="w-7 h-7 rounded-[50%]"
                            ></span>
                        </div>
                        <Button
                            onClick={() => {
                                const tmpModals = { ...actions.modals };
                                tmpModals["edit-tag"] = true;
                                setActions({
                                    ...actions,
                                    modals: tmpModals,
                                });
                            }}
                            text="Edit details"
                            variation="yellowbutter"
                            full
                        />
                    </div>
                    <div className="w-full border border-gray-100 px-3 py-4 rounded-[10px] shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]">
                        <div className="w-full mb-2">
                            <span>Subtags</span>
                        </div>
                        <div className="w-full flex flex-wrap gap-2">
                            {!!data?.children?.length
                                ? data.children.map((subtag, index) => {
                                      return (
                                          <button
                                              onClick={() => {
                                                  setSubtag(subtag);
                                                  const tmpModals = {
                                                      ...actions.modals,
                                                  };
                                                  tmpModals["subtag"] = true;
                                                  setActions({
                                                      ...actions,
                                                      modals: tmpModals,
                                                  });
                                              }}
                                              key={subtag.id}
                                              className="px-4 py-1 bg-gray-200 rounded-[10px]"
                                          >
                                              {subtag.name}
                                          </button>
                                      );
                                  })
                                : null}
                            <button
                                onClick={() => {
                                    const tmpModals = {
                                        ...actions.modals,
                                    };
                                    tmpModals["subtag"] = true;
                                    setActions({
                                        ...actions,
                                        modals: tmpModals,
                                    });
                                }}
                                type="button"
                                className="px-4 py-1 bg-yellowbutter rounded-[10px]"
                            >
                                <Plus width={16} height={16} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex justify-center mt-5 ">
                        <Button
                            full
                            loading={deleteLoading}
                            onClick={handleDelete}
                            text="Delete"
                            variation="danger"
                        />
                    </div>
                </div>

                <InteractiveModal modalKey="subtag">
                    <TagForm
                        modalId="subtag"
                        parentId={parseInt(tagId)}
                        tagData={subtag}
                        title="Subtag"
                        closeOnSave
                        withDelete
                        onDelete={() => {
                            mutate();
                        }}
                        onSave={() => {
                            mutate();
                        }}
                        isSubtag
                    />
                </InteractiveModal>

                <InteractiveModal modalKey="edit-tag">
                    <TagForm
                        tagData={data}
                        title="Edit tag"
                        closeOnSave
                        onSave={() => {
                            mutate();
                        }}
                    />
                </InteractiveModal>
            </LoadingMask>
        </div>
    );
};

export default TagPage;
