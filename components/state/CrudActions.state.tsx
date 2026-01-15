"use client";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type TCrudActions = {
    modal: {
        open: boolean;
        key: string;
    };
};

const Context = createContext<
    [data: TCrudActions, setActions?: Dispatch<SetStateAction<TCrudActions>>]
>([{ modal: { open: false, key: "" } }]);

export type Props = {
    children: React.ReactNode;
};

export const CrudActionsState: React.FC<Props> = ({ children }) => {
    const [theme, setActions] = useState<TCrudActions>({
        modal: { open: false, key: "" },
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
