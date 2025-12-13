import { TagCheck } from "@/utils/types";
import React, { useState } from "react";
import { Check } from "lucide-react";

type Props = {
    onTagSelction: (selectedTags: TagCheck[]) => void;
};

const TagSelection: React.FC<Props> = (onTagSelection) => {
    const [selectedTags, setTags] = useState();
    const tags: TagCheck[] = [];

    return (
        <div className="w-full h-full">
            <div className="text-white flex justify-center border-b pb-2">
                <h2 className="text-white uppercase font-bold">TAGS</h2>
                <div className="w-full">
                    {!!tags?.length
                        ? tags.map((tag) => {
                              return (
                                  <div className="p-5 flex justify-between">
                                      <span className="text-white">
                                          {tag.name}
                                      </span>
                                      {!!tag.checked && (
                                          <Check
                                              color="#fff"
                                              height={26}
                                              width={26}
                                          />
                                      )}
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
};

export default TagSelection;
