export type ApiTypeGenerator = {
    [type in ApiType]: () => string;
};

export enum ApiType {
    LOCAL = "LOCAL",
    EXTERNAL = "EXTERNAL",
}

export class UrlBuilder {
    private baseUrl: string;
    private path: string = "";

    private apiType: ApiTypeGenerator = {
        LOCAL: () => {
            if (!process.env.APP_DOMAIN) {
                throw new Error("No App domain set");
            }

            return process.env.APP_DOMAIN;
        },
        EXTERNAL: () => {
            if (!process.env.EXPENSES_API) {
                throw new Error("No auth API set");
            }

            return process.env.EXPENSES_API;
        },
    };

    constructor(type: ApiType = ApiType.EXTERNAL) {
        const getBaseUrl = this.apiType[type];

        this.baseUrl = getBaseUrl();
    }

    v1() {
        this.path += "/api/v1";
        return this;
    }

    /**
     *
     * @param customPath Must be the full path without the domain
     * @returns
     */
    usePath(pathname: string) {
        const url = new URL(pathname, this.baseUrl);
        this.path = url.pathname;

        return this;
    }

    /**
     *
     * @param customURL Full URL including query params
     * @returns
     */
    useURL(customURL: string) {
        const baseUrl = new URL(customURL);
        this.path = baseUrl.pathname;
        this.baseUrl = baseUrl.origin;

        return this;
    }

    setParams(params: Record<string, string>) {
        const url = new URL(this.path, this.baseUrl);

        Object.entries(params).forEach(([name, value]) => {
            url.searchParams.set(name, value);
        });

        this.path = url.pathname + url.search;

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

    tags(tagId?: number) {
        return this.concatenate(`/tag${tagId ? "/" + tagId : ""}`);
    }

    reports() {
        return this.concatenate("/report");
    }

    concatenate(url: string) {
        this.path += url;

        return this;
    }

    resetPath() {
        this.path = "";
    }

    build() {
        const newUrl = new URL(this.path, this.baseUrl);

        this.resetPath();

        return newUrl.href;
    }
}
