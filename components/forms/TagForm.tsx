import React, { useState } from "react";
import TextField from "./TextField";
import { SketchPicker } from "react-color";
import ColorPicker from "./ColorPicker";
import axios from "axios";
import { InputButton } from "./Button";

type Props = {};

const TagForm: React.FC<Props> = (props) => {
    const [tag, setTag] = useState({ name: "", color: "#000" });

    const createTag = async () => {
        const response = await axios.post("/api/tag", {});
        return response.data;
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        createTag()
            .then((response: { message: string }) => {
                console.log(response);
            })
            .catch((error: any) => console.log(error));
    };

    return (
        <div className="w-full">
            <div className="border-b border-white pb-2 mb-5">
                <h2 className="text-white uppercase font-bold">New tag</h2>
            </div>
            <form className="block" onSubmit={handleSubmit}>
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
                <ColorPicker
                    onChange={(color) => {
                        setTag({ ...tag, color });
                    }}
                    name="color"
                    label="Color"
                    hideLabel
                    value={tag.color}
                />
                <div className="mt-10">
                    <InputButton
                        className="w-full"
                        variation="greenjade"
                        text="Save"
                    />
                </div>
            </form>
        </div>
    );
};

export default TagForm;
