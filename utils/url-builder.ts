class UrlBuilder {
    private baseUrl: string;
    private path: string = "";

    constructor() {
        if (!process.env.EXPENSES_API) {
            throw new Error("No auth API set");
        }

        this.baseUrl = process.env.EXPENSES_API;
    }

    v1() {
        this.path += "/api/v1";
        return this;
    }

    auth() {
        return this.concatenate("/auth");
    }

    login() {
        return this.concatenate("/login");
    }

    expenses(id?: number) {
        return this.concatenate("/expense");
    }

    tags(id?: number) {
        return this.concatenate("/tag");
    }

    reports(id: number) {
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

const urlBuilder = new UrlBuilder();

export default urlBuilder;
