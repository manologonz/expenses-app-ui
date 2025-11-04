"use client";

import React from "react";

export type Props = {
    title: string;
    path: string;
    active: boolean;
    icon: React.ReactNode;
};

const NavItem: React.FC<Props> = ({ active, title, path, icon: Icon }) => {
    return (
        <a
            href={path}
            className={`flex w-full py-3 px-3 uppercase gap-2 ${
                active ? "bg-greensage" : "bg-transparent"
            }`}
        >
            {Icon}
            <span className="text-white font-bold">{title}</span>
        </a>
    );
};

export default NavItem;
