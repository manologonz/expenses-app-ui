"use client";

import React from "react";
import { userHeaderActionState } from "../state/HeaderActions.state";
import { CircleX } from "lucide-react";

type Props = {
    children: React.ReactNode;
    modalKey: "create" | "tag";
};

const InteractiveModal: React.FC<Props> = ({ children, modalKey }) => {
    const [actions, setActions] = userHeaderActionState();

    if (!setActions) {
        return;
    }

    return (
        <div
            className={`h-screen w-full absolute left-0 bottom-0 bg-transparent flex items-end px-2 transition-all ${
                !actions[modalKey] ? "h-0 hidden" : ""
            }`}
        >
            <div className="block h-[70vh] w-full bg-greensage rounded-t-[10px] overflow-y-scroll no-scroll relative shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                <div className="absolute top-2 right-2 h-[30px] w-[30px]">
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                            setActions({ ...actions, [modalKey]: false });
                        }}
                    >
                        <CircleX color="#fff" height={30} width={30}></CircleX>
                    </button>
                </div>
                <div className="w-full h-full p-10">{children}</div>
            </div>
        </div>
    );
};

export default InteractiveModal;
