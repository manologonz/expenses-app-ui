import NavigationLayout from "@/components/layouts/Navigation.layout";
import { CrudActionsState } from "@/components/state/CrudActions.state";
import React from "react";

export type Props = {
    children: React.ReactNode;
};

const NavLayout: React.FC<Props> = ({ children }) => {
    return (
        <CrudActionsState>
            <NavigationLayout title="Tags" useCreate>
                {children}
            </NavigationLayout>
        </CrudActionsState>
    );
};

export default NavLayout;
