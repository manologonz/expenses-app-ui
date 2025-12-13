"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import { Session } from "next-auth";
import { User } from "lucide-react";

export type Props = {};

const _AccountCard: React.FC<Props> = ({}) => {
    const { data } = useSession();
    return (
        <div className="w-full flex justify-start items-center gap-2 text-white font-bold pt-5 px-3">
            <div className="w-[35px] h-[35px]">
                <div className="bg-greensage w-full h-full flex items-center justify-center rounded-[50%]">
                    <User color="#fff" />
                </div>
            </div>
            <div>{data?.user.username}</div>
        </div>
    );
};

const AccountCard: React.FC<Props> = (props) => {
    return (
        <SessionProvider>
            <_AccountCard {...props} />
        </SessionProvider>
    );
};

export default AccountCard;
