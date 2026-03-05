import BaseLocalService from "./base";

export default class ExpensesLocalService extends BaseLocalService {
    constructor(version?: `v${number}`) {
        super(version);
        this.baseUrl = this.urlBuilder.useURL(this.baseUrl).tags().build();
    }

    listExpenses() {}
}
