import NavigationLayout from "@/components/layouts/Navigation.layout";
import React from "react";

export type Props = {
    children: React.ReactNode;
};

const NavLayout: React.FC<Props> = ({ children }) => {
    return <NavigationLayout title="Dashboard">{children}</NavigationLayout>;
};

export default NavLayout;
