import { authOptions } from "@/utils/auth/auth-config";
import { getServerSession } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";

export type Props = {};

const _AccountCard: React.FC<Props> = ({}) => {
    const session = useSession();
    console.log(session);
    return <div>AccountCard</div>;
};

const AccountCard: React.FC<{}> = ({}) => {
    return (
        <SessionProvider>
            <_AccountCard />
        </SessionProvider>
    );
};

export default AccountCard;
