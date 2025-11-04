import NavigationLayout from "@/components/layouts/Navigation.layout";
import React from "react";

export type Props = {
    children: React.ReactNode;
};

const NavLayout: React.FC<Props> = ({ children }) => {
    return <NavigationLayout title="Budgets">{children}</NavigationLayout>;
};

export default NavLayout;
