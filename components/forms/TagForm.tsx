import React, { useState } from "react";
import TextField from "./TextField";
import { SketchPicker } from "react-color";
import ColorPicker from "./ColorPicker";

type Props = {};

const TagForm: React.FC<Props> = (props) => {
    const [tag, setTag] = useState({ name: "", color: "" });

    return (
        <div className="w-full">
            <div className="border-b border-white flex justify-center pb-2 mb-5">
                <h2 className="text-white uppercase font-bold">New tag</h2>
            </div>
            <form className="flex">
                <ColorPicker
                    onChange={(color) => {
                        setTag({ ...tag, color });
                    }}
                    name="color"
                    label="Color"
                    hideLabel
                    value={tag.color}
                />
                <TextField
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
            </form>
        </div>
    );
};

export default TagForm;
