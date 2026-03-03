export type Expense = {
    id: number;
    description: string;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    reportId: number | null;
};

export interface Tag {
    id: number;
    name: string;
    color?: string;
    slug: string;
    parentId?: number;
    userId: number;
    updatedAt: string;
    createdAt: string;
    children: Tag[];
}

export type TagData = {
    id?: number;
    name: string;
    color?: string;
    parent?: number;
};

export type SubtagData = {
    id?: number;
    name: string;
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

export type TagListOptions = {
    depth?: "all";
};
