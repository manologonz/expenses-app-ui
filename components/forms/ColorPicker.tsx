import React, { useEffect, useRef, useState } from "react";
import FieldLabel from "./FieldLabel";
import { ColorChangeHandler } from "react-color";
import dynamic from "next/dynamic";

const BlockPicker = dynamic(
    () => import("react-color").then((mod) => mod.BlockPicker),
    {
        ssr: false,
    }
);

type Props = {
    label: string;
    name: string;
    hideLabel?: boolean;
    value: string;
    id?: string;
    onChange: (color: string) => void;
    inputClass?: string;
    labelClass?: string;
};

const ColorPicker: React.FC<Props> = ({
    id,
    name,
    label,
    hideLabel,
    onChange,
    value,
    inputClass,
    labelClass,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef(null);
    const [color, setColor] = useState("");
    const [open, setOpen] = useState(false);

    const handleOnChange: ColorChangeHandler = (color) => {
        setColor(color.hex);
        onChange(color.hex);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div ref={containerRef} className="relative py-2.5 px-1">
            <FieldLabel
                htmlFor={id || "input-" + name}
                text={label}
                hidden={!!hideLabel}
                className={labelClass}
            />
            <div
                id={id || name}
                onClick={() => {
                    setOpen(!open);
                }}
                style={{
                    background: color || "#fff",
                }}
                className={`h-10 w-10 block border border-none rounded-[5px] text-[16px] cursor-pointer`}
                ref={inputRef}
            />
            <div
                className={`absolute overflow-hidden mt-1 ${
                    !open ? "h-0 hidden" : ""
                }`}
            >
                <BlockPicker color={color} onChange={handleOnChange} />
            </div>
        </div>
    );
};

export default ColorPicker;
