"use client";

import React, { useState } from "react";
import SideMenu from "@/components/layouts/SideMenu";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { ReceiptText } from "lucide-react";
import { Tags } from "lucide-react";
import { ChartPie } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { getServerSession } from "next-auth";

export type Props = {
    children: React.ReactNode;
    title: string;
};

const NavigationLayout: React.FC<Props> = ({ children, title }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const currentPath = usePathname();

    return (
        <div className="relative">
            <nav className="h-15 bg-white flex items-center justify-start px-4 py-1 relative">
                <button
                    data-sidebar-target="sidebar-menu"
                    data-sidebar-toggle="sidebar-menu"
                    aria-controls="sidebar-menu"
                    type="button"
                    className="mr-5 absolute"
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}
                >
                    <Menu
                        width="25px"
                        height="25px"
                        color="#808080"
                        strokeWidth={3}
                    />
                </button>
                <div className="w-full flex justify-center">
                    <span className="uppercase font-bold text-[#808080]">
                        {title}
                    </span>
                </div>
            </nav>
            <SideMenu
                open={menuOpen}
                handleOpen={() => {
                    setMenuOpen(!menuOpen);
                }}
                currentPath={currentPath}
                navItems={[
                    {
                        title: "Dashboard",
                        path: "/dashboard",
                        icon: <LayoutDashboard color="#fff" />,
                    },
                    {
                        title: "Expenses",
                        path: "/expenses",
                        icon: <ReceiptText color="#fff" />,
                    },
                    {
                        title: "Tags",
                        path: "/tags",
                        icon: <Tags color="#fff" />,
                    },
                    {
                        title: "Budgets",
                        path: "/budgets",
                        icon: <ChartPie color="#fff" />,
                    },
                    {
                        title: "Reports",
                        path: "/reports",
                        icon: <BookOpenCheck color="#fff" />,
                    },
                ]}
            />
            <div className="px-2 py-2">{children}</div>
        </div>
    );
};

export default NavigationLayout;
