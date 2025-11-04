"use client";

import React, { useState } from "react";
import Image from "next/image";

export type Props = {
    children: React.ReactNode;
    title: string;
};

const NavigationLayout: React.FC<Props> = ({ children, title }) => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <Image
                        className="h-6 w-[25px]"
                        src="/images/icons/nav-icon-white.svg"
                        alt="open menu"
                        width="40"
                        height="40"
                    ></Image>
                </button>
                <div className="w-full flex justify-center">
                    <span className="uppercase font-bold text-[#808080]">
                        {title}
                    </span>
                </div>
            </nav>
            <aside
                id="sidebar-menu"
                aria-label="sidebar"
                className={`fixed top-0 left-0 z-40 transition-transform w-full h-screen ${
                    !menuOpen ? "-translate-x-full" : ""
                } shadow`}
            >
                <div className="relative w-[80%] h-full px-3 py-2 bg-greenjade shadow-[0_5px_20px_rgba(0,0,0,0.70)]">
                    <div className="absolute flex justify-end top-3 right-3">
                        <button
                            onClick={() => {
                                setMenuOpen(!menuOpen);
                            }}
                        >
                            <Image
                                src="/images/icons/sidebar-close.svg"
                                height={22}
                                width={22}
                                alt="sidebar close"
                            />
                        </button>
                    </div>
                </div>
            </aside>
            <div className="px-2 py-2">{children}</div>
        </div>
    );
};

export default NavigationLayout;
