import axios from "axios";
import BaseLocalService from "./base";
import { ApiType, UrlBuilder } from "./url-builder";
import { ServiceResponse, Tag, TagData, TagListResponse } from "../types";

export default class TagLocalService extends BaseLocalService {
    constructor(version?: `v${number}`) {
        super(version);
        this.baseUrl = this.urlBuilder.useURL(this.baseUrl).tags().build();
    }
    async listTags(
        search: string,
        params?: Record<string, string>
    ): Promise<ServiceResponse<TagListResponse>> {
        let requestUrl = this.baseUrl;

        if (params) {
            requestUrl = this.urlBuilder
                .useURL(this.baseUrl)
                .setParams(params)
                .build();
        }

        try {
            const response = await axios.get(requestUrl);
            return {
                ok: true,
                status: response.status,
                data: response.data,
            };
        } catch (error) {
            return this.handleError<TagListResponse>(error);
        }
    }

    getKeyUrl(params: Record<string, string>, parentId?: number) {
        let requestUrl = this.baseUrl;

        if (parentId) {
            requestUrl = requestUrl + "/" + parentId;
        }

        if (params) {
            requestUrl = this.urlBuilder
                .useURL(requestUrl)
                .setParams(params)
                .build();
        }

        return requestUrl;
    }

    async createTag(data: TagData) {
        try {
            const response = await axios.post(this.baseUrl, data);
            return {
                ok: true,
                data: response.data,
            };
        } catch (error) {
            return this.handleError<Tag>(error);
        }
    }

    async getTag(tagId: number) {
        try {
            const response = await axios.get(`${this.baseUrl}/${tagId}`);
            return {
                ok: true,
                data: response.data,
            };
        } catch (error) {
            return this.handleError<Tag>(error);
        }
    }
}
