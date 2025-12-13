export type Expense = {
    id: number;
    amount: number;
    description: string;
    tags: number[];
};

export interface Tag {
    id: string;
    name: string;
    color: string;
    slug: string;
    parentId: number;
    userId: number;
    updatedAt: string;
    createdAt: string;
}

export type TagData = {
    name: string;
    color: string;
    parentId?: number;
};

export type TagListResponse = {
    count: number;
    hasMore: boolean;
    data: Tag[];
};

export type ServiceResponse<T> = {
    ok: boolean;
    status: number;
    data?: T;
    error?: string;
};

export interface TagCheck extends Tag {
    checked: boolean;
}

export type TagErrors = {
    parent: string[];
    name: string[];
    color: string[];
};

export enum ActionStatus {
    NONE = "NONE",
    LOADING = "LOADING",
    LOADING_MORE = "LOADING_MORE",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    REFETCH = "REFETCH",
}
