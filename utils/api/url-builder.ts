export type ApiType = {
    local: () => string;
    external: () => string;
};

export class UrlBuilder {
    private baseUrl: string;
    private path: string = "";

    private apiType: ApiType = {
        local: () => {
            return "";
        },
        external: () => {
            if (!process.env.EXPENSES_API) {
                throw new Error("No auth API set");
            }

            return process.env.EXPENSES_API;
        },
    };

    constructor(type: "local" | "external" = "external") {
        const getBaseUrl = this.apiType[type];

        this.baseUrl = getBaseUrl();
    }

    v1() {
        this.path += "/api/v1";
        return this;
    }

    use(customPath: string) {
        this.path = customPath;
        return this;
    }

    auth() {
        return this.concatenate("/auth");
    }

    refresh() {
        return this.concatenate("/refresh");
    }

    login() {
        return this.concatenate("/login");
    }

    expenses() {
        return this.concatenate("/expense");
    }

    tags() {
        return this.concatenate("/tag");
    }

    reports() {
        return this.concatenate("/report");
    }

    concatenate(url: string) {
        this.path += url;

        return this;
    }

    build() {
        const path = this.path;
        this.path = "";

        return `${this.baseUrl}${path}`;
    }
}
