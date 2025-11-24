import axios from "axios";
import BaseLocalService from "./base";
import { UrlBuilder } from "./url-builder";
import { ServiceResponse, TagListResponse } from "../types";

export default class TagLocalService extends BaseLocalService {
    constructor(version?: `v${number}`) {
        super(version);
        const urlBuilder = new UrlBuilder("local");
        this.baseUrl = urlBuilder.use(this.baseUrl).tags().build();
    }
    async listTags(search: string): Promise<ServiceResponse<TagListResponse>> {
        try {
            const response = await axios.get(this.baseUrl);
            return {
                ok: true,
                data: response.data,
            };
        } catch (error) {
            return this.handleError<TagListResponse>(error);
        }
    }
}
