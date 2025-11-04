import React, { Suspense } from "react";
import NavItem, { Props as _NavItem } from "@/components/layouts/NavItem";
import { PanelLeftClose } from "lucide-react";
import AccountCard from "./AccountCard";

export type Props = {
    currentPath: string;
    open: boolean;
    handleOpen: () => void;
    navItems: Omit<_NavItem, "active">[];
};

const SideMenu: React.FC<Props> = ({
    navItems,
    open,
    currentPath,
    handleOpen,
}) => {
    return (
        <aside
            id="sidebar-menu"
            aria-label="sidebar"
            className={`fixed top-0 left-0 z-40 transition-transform w-full h-screen ${
                !open ? "-translate-x-full" : ""
            } shadow`}
            onClick={handleOpen}
        >
            <div className="relative w-[80%] h-full py-2 bg-greenjade shadow-[0_5px_20px_rgba(0,0,0,0.70)]">
                <div className="absolute flex justify-end top-3 right-3">
                    <button onClick={handleOpen}>
                        <Suspense
                            fallback={
                                <div className="w-full h-12 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                </div>
                            }
                        >
                            <AccountCard />
                        </Suspense>
                    </button>
                </div>
                <div className="pt-10">
                    {navItems.map((item, index) => {
                        return (
                            <NavItem
                                key={index}
                                {...item}
                                active={item.path === currentPath}
                            />
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default SideMenu;
