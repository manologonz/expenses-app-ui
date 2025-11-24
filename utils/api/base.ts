import { isAxiosError } from "axios";
import { UrlBuilder } from "./url-builder";
import { ServiceResponse } from "../types";

export type VersionManger = { [version: `v${number}`]: string };

export default class BaseLocalService {
    protected baseUrl: string;
    protected urlBuilder = new UrlBuilder("local");

    private versionManager: VersionManger = {
        v1: this.urlBuilder.v1().build(),
    };

    constructor(version: `v${number}` = "v1") {
        const apiBaseUrl = this.versionManager[version];

        if (!apiBaseUrl) {
            throw new Error("Invalid API version");
        }

        this.baseUrl = apiBaseUrl;
    }

    protected handleError<T>(error: unknown): ServiceResponse<T> {
        if (isAxiosError(error)) {
            return {
                ok: false,
                error: error.response?.data?.detail,
            };
        }

        return {
            ok: false,
            error: "Something when't wrong",
        };
    }
}
