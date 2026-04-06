import { Tag, TagCheck } from "@/utils/types";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./Button";
import { usePlainTagList, useTagList } from "../hooks/tags";

type Props = {
    onTagSelection: (selectedTags: TagCheck[]) => void;
    selected?: TagCheck[];
};

const TagSelection: React.FC<Props> = ({ onTagSelection, selected }) => {
    const { data } = usePlainTagList({ depth: "all", limit: -1 });
    const [checkedTags, setCheckedTags] = useState<TagCheck[]>(selected || []);

    const handleTagSelection = () => {
        onTagSelection(checkedTags);
    };

    return (
        <div className="w-full h-full">
            <div className="text-white flex justify-center border-b pb-2">
                <h2 className="text-white uppercase font-bold">TAGS</h2>
                <div className="w-full">
                    {!!checkedTags.length
                        ? checkedTags.map((tag) => {
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
            <Button
                onClick={handleTagSelection}
                full
                variation="greenjade"
                text="Save"
            />
        </div>
    );
};

export default TagSelection;
