"use client";

import React, { useEffect } from "react";
import { useCrudActions } from "../state/CrudActions.state";
import { CircleX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
    children: React.ReactNode;
};

const InteractiveModal: React.FC<Props> = ({ children }) => {
    const [actions, setActions] = useCrudActions();

    if (!setActions) {
        return;
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [actions.modalOpen]);

    return (
        <AnimatePresence>
            {!!actions.modalOpen && ( // Validate for animation
                <motion.div className="h-screen w-full absolute left-0 bottom-0 bg-transparent flex items-end transition-all">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 25,
                        }}
                        className="block relative bottom-0 left-0 h-[90vh] w-full bg-greensage rounded-t-[30px] overflow-y-scroll no-scroll shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                    >
                        <div className="absolute top-2 right-3 h-7.5 w-7.5">
                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() => {
                                    setActions({
                                        ...actions,
                                        modalOpen: false,
                                    });
                                }}
                            >
                                <CircleX color="#fff" height={30} width={30} />
                            </button>
                        </div>
                        <div className="w-full h-full p-10">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InteractiveModal;
