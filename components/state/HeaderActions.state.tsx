"use client";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type THeaderActions = {
    create: boolean;
    tag: boolean;
};

const Context = createContext<
    [
        data: THeaderActions,
        setActions?: Dispatch<SetStateAction<THeaderActions>>
    ]
>([{ create: false, tag: false }]);

export type Props = {
    children: React.ReactNode;
};

export const HeaderActionsState: React.FC<Props> = ({ children }) => {
    const [theme, setActions] = useState<THeaderActions>({
        create: false,
        tag: false,
    });

    return (
        <Context.Provider value={[theme, setActions]}>
            {children}
        </Context.Provider>
    );
};

export function userHeaderActionState() {
    return useContext(Context);
}
