export type Props = {};
import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";

const Login: React.FC<Props> = () => {
    return (
        <div className="flex justify-center items-start w-full h-full bg-linear-[150deg] from-greensage to-yellowbutter pt-20 overflow-y-scroll">
            <div className="px-5 py-7 bg-white h-auto rounded-[10px]">
                <div className="flex justify-center pb-5">
                    <Image
                        priority
                        alt="Expense collector logo"
                        src="/images/icons/logo.svg"
                        height={100}
                        width={100}
                    />
                </div>
                <div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;
