"use client";

import React, { useState } from "react";
import TextField from "./TextField";
import { InputButton } from "./Button";
import { z } from "zod";
import axios from "axios";
import { signIn } from "next-auth/react";

const LoginForm: React.FC = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<
        "error" | "success" | "loading" | null
    >(null);
    const [errors, setErrors] = useState<{
        email: string[];
        password: string[];
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
        }

        try {
            const authResponse = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            console.log(authResponse);
        } catch (error) {
            console.log("can't login");
            setStatus("error");
        }
    };

    return (
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
    );
};

export default LoginForm;
