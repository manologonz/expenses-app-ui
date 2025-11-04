"use client";

import React, { useState } from "react";
import TextField from "./TextField";
import { InputButton } from "./Button";
import { z } from "zod";
import { signIn } from "next-auth/react";
import ErrorBox from "./ErrorBox";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<
        "error" | "success" | "loading" | null
    >(null);
    const [errors, setErrors] = useState<{
        email: string[];
        password: string[];
        global?: string;
    }>({
        email: [],
        password: [],
    });

    const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();
        setStatus("loading");
        const validationErrors = { ...errors };

        let valid = true;

        if (!password) {
            validationErrors.password.push("Required field");
            valid = false;
        }

        if (!email) {
            validationErrors.email.push("Required field");
            valid = false;
        }

        const emailValidator = z.email();

        try {
            emailValidator.parse(email);
        } catch (error) {
            validationErrors.email.push("Invalid email");
            valid = false;
        }

        if (!valid) {
            setErrors(validationErrors);
            setStatus("error");
            return;
        }

        try {
            const authResponse = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (authResponse?.ok) {
                router.push("/");
            } else {
                throw new Error(authResponse?.error || "Something wen't wrong");
            }
        } catch (error) {
            const commonError = error as Error;
            setErrors({ ...errors, global: commonError.message });
            setStatus("error");
        }
    };

    return (
        <>
            {!!errors.global && <ErrorBox errors={[errors.global]} />}
            <form onSubmit={handleOnSubmit}>
                <TextField
                    id="email"
                    label="Email"
                    errors={errors.email}
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        if (errors.email.length) {
                            setErrors({ ...errors, email: [] });
                        }

                        if (errors.global) {
                            setErrors({ ...errors, global: "" });
                        }

                        setEmail(event.target.value);
                    }}
                />
                <TextField
                    id="password"
                    label="Password"
                    errors={errors.password}
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        if (errors.password.length) {
                            setErrors({ ...errors, password: [] });
                        }

                        if (errors.global) {
                            setErrors({ ...errors, global: "" });
                        }

                        setPassword(event.target.value);
                    }}
                />
                <div className="pt-3">
                    <InputButton
                        variation="greenjade"
                        text="Log in"
                        full
                        loading={status === "loading"}
                    />
                </div>
            </form>
        </>
    );
};

export default LoginForm;
