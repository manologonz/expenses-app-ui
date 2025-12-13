"use client";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type TCrudActions = {
    create: boolean;
    tag: boolean;
    refetch: boolean;
};

const Context = createContext<
    [data: TCrudActions, setActions?: Dispatch<SetStateAction<TCrudActions>>]
>([{ create: false, tag: false, refetch: false }]);

export type Props = {
    children: React.ReactNode;
};

export const CrudActionsState: React.FC<Props> = ({ children }) => {
    const [theme, setActions] = useState<TCrudActions>({
        create: false,
        tag: false,
        refetch: false,
    });

    return (
        <Context.Provider value={[theme, setActions]}>
            {children}
        </Context.Provider>
    );
};

export function useCrudActions() {
    return useContext(Context);
}
