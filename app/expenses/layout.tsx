import NavigationLayout from "@/components/layouts/Navigation.layout";
import { HeaderActionsState } from "@/components/state/HeaderActions.state";
import React from "react";

export type Props = {
    children: React.ReactNode;
};

const NavLayout: React.FC<Props> = ({ children }) => {
    return (
        <HeaderActionsState>
            <NavigationLayout title="Expenses" useCreate>
                {children}
            </NavigationLayout>
        </HeaderActionsState>
    );
};

export default NavLayout;
