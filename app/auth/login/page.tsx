import TextField from "@/app/components/forms/TextField";
import React from "react";

export type Props = {};

const Login: React.FC<Props> = () => {
    return (
        <div className="flex justify-center items-start w-full h-full bg-linear-[150deg] from-greensage to-yellowbutter pt-20">
            <div className="p-5 bg-white h-auto rounded-[10px]">
                <div>logo</div>
                <form>
                    <TextField name="email" type="email" value="" />
                    <TextField name="password" type="password" value="" />
                </form>
            </div>
        </div>
    );
};

export default Login;
