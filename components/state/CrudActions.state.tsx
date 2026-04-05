"use client";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type TCrudActions = {
    modals: Record<string, boolean>;
};

const Context = createContext<
    [data: TCrudActions, setActions?: Dispatch<SetStateAction<TCrudActions>>]
>([{ modals: {} }]);

export type Props = {
    children: React.ReactNode;
};

export const CrudActionsState: React.FC<Props> = ({ children }) => {
    const [theme, setActions] = useState<TCrudActions>({
        modals: {},
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
