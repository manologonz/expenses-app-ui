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

export type TagListResponse = {
    count: number;
    hasMore: boolean;
    data: Tag[];
};

export type ServiceResponse<T> = {
    ok: boolean;
    data?: T;
    error?: string;
};

export interface TagCheck extends Tag {
    checked: boolean;
}
