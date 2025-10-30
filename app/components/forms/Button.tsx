import React from "react";
import LoadSpinner from "../common/LoadSpinner";

export type InputButtonProps = {
    id?: string;
    variation: "redbrick" | "orangetangerine" | "greenjade" | "yellowbutter";
    text: string;
    full?: boolean;
    loading?: boolean;
};

const baseButtonStyles = "px-10 py-2.5 rounded-[5px]";
const btnRedbrick =
    "bg-redbrick text-white hover:text-redbrick border border-redbrick";
const btnOrangetangerine =
    "bg-orangetangerine hover:text-orangetangerine border border-orangetangerine";
const btnGreenjade =
    "bg-greenjade text-white hover:text-greenjade border border-greenjade";
const btnYellowButter =
    "bg-yellowbutter hover:text-yellowbutter border border-yellowbutter";

const InputButton: React.FC<InputButtonProps> = ({
    id,
    text,
    variation,
    full,
    loading,
}) => {
    let buttonStyle = "";

    switch (variation) {
        case "redbrick":
            buttonStyle = btnRedbrick;
            break;
        case "orangetangerine":
            buttonStyle = btnOrangetangerine;
            break;
        case "greenjade":
            buttonStyle = btnGreenjade;
            break;
        case "yellowbutter":
            buttonStyle = btnYellowButter;
            break;
        default:
            buttonStyle = btnGreenjade;
    }

    return (
        <div className={`py-2.5 ${full ? "w-full" : "w-auto"}`}>
            <button
                disabled={loading}
                id={id}
                type="submit"
                className={`hover:cursor-pointer hover:bg-white ease-in-out duration-300 ${baseButtonStyles} ${buttonStyle} ${
                    full ? "w-full" : ""
                } disable:hover:bg-${variation}`}
            >
                {!!loading ? "Loading..." : text}
            </button>
        </div>
    );
};

export { InputButton };
