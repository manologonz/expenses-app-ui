import { ExpenseData } from "../types";
import BaseLocalService from "./base";

export default class ExpensesLocalService extends BaseLocalService {
    constructor(version?: `v${number}`) {
        super(version);
        this.baseUrl = this.urlBuilder.useURL(this.baseUrl).expenses().build();
    }

    async createExpense(data: ExpenseData) {
        console.log("This url:", this.baseUrl, data);

        return {
            ok: true,
            status: 200,
        };
    }
}
