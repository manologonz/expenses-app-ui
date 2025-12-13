import React, { ReactNode } from "react";
import { Loader } from "lucide-react";
import { ActionStatus } from "@/utils/types";

type Props = {
    status: ActionStatus;
    children?: ReactNode;
    singleModelName?: string;
    pluralModelName?: string;
    ref?: React.RefObject<HTMLDivElement | null>;
    dataCount?: number;
};

const LoadingMask: React.FC<Props> = ({
    status,
    children,
    ref,
    dataCount,
    pluralModelName,
}) => {
    if (status === ActionStatus.LOADING) {
        return (
            <div ref={ref} className="w-full flex justify-center">
                <div className="w-auto m-auto">
                    <Loader color="#808080" />
                </div>
            </div>
        );
    }

    if (status === ActionStatus.SUCCESS && dataCount) {
        <div className="w-full text-center p-2">
            No {pluralModelName ?? "data"} found
        </div>;
    }

    if (status === ActionStatus.ERROR) {
        return (
            <div className="w-full text-center p-2">
                Can't fetch {pluralModelName ?? "data"}
            </div>
        );
    }

    return children;
};

export default LoadingMask;
