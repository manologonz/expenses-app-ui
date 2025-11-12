export type Expense = {
    id: number;
    amount: number;
    description: string;
    tags: number[];
};

export interface Tag {
    id: number;
    name: string;
    color: string;
}

export interface TagCheck extends Tag {
    checked: boolean;
}
