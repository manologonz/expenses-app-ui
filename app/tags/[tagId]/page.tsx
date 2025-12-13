"use client";
import InteractiveModal from "@/components/common/InteractiveModal";
import { Button } from "@/components/forms/Button";
import TagForm from "@/components/forms/TagForm";
import { useTagItem } from "@/components/hooks/tags";
import LoadingMask from "@/components/layouts/LoadingMask";
import React, { use } from "react";
import { Plus } from "lucide-react";

export type Props = {
    params: Promise<{ tagId: number }>;
};

const TagPage: React.FC<Props> = ({ params }) => {
    const { tagId } = use(params);
    const { data, status } = useTagItem(tagId);

    return (
        <div className="w-full h-full">
            <div className="w-full">
                <LoadingMask status={status}>
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
                            onClick={() => {}}
                            text="Edit details"
                            variation="yellowbutter"
                            full
                        />
                    </div>
                    <div className="w-full border border-gray-100 px-3 py-4 rounded-[10px] shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]">
                        <div className="w-full mb-2">
                            <span>Subtags</span>
                        </div>
                        <div className="w-full flex flex-wrap">
                            {!!data?.children?.length
                                ? data.children.map((subtag, index) => {
                                      return (
                                          <span className="px-4 py-1 bg-gray-200 rounded-[10px]">
                                              {subtag.name}
                                          </span>
                                      );
                                  })
                                : null}
                            <span className="px-4 py-1 bg-yellowbutter rounded-[10px]">
                                <Plus width={16} height={16} />
                            </span>
                        </div>
                    </div>
                </LoadingMask>
            </div>

            <InteractiveModal modalKey="create">
                <TagForm closeOnSave onSave={() => {}} />
            </InteractiveModal>
        </div>
    );
};

export default TagPage;
