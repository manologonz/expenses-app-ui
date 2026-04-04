import React, { useRef, useState } from "react";
import BubbleQuantityInput from "./BubbleQuantityInput";
import { Expense, ExpenseData, ExpenseErrors } from "@/utils/types";
import TextField from "./TextField";
import SelectField from "./SelectField";
import InteractiveModal from "../common/InteractiveModal";
import { useCrudActions } from "../state/CrudActions.state";
import { Button } from "@/components/forms/Button";
import z, { treeifyError } from "zod";

type Props = {
    data?: Expense;
};

const ExpenseForm: React.FC<Props> = ({ data }) => {
    const [actions, setAction] = useCrudActions();
    const [expense, setExpense] = useState<ExpenseData>({
        amount: 0,
        description: "",
        tags: [],
    });
    const [errors, setErrors] = useState<ExpenseErrors>({
        amount: [],
        description: [],
        tags: [],
    });

    if (!setAction) {
        return;
    }

    const onMount = useRef(false);

    if (!onMount.current) {
        useState(data);
        if (data) {
        }
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const expenseValidator = z.object({
            amount: z.number(),
            description: z.string(),
            tags: z.array(
                z.object({
                    id: z.number(),
                    name: z.string(),
                    slug: z.string(),
                }),
            ),
        });

        const validationResult = expenseValidator.safeParse(expense);

        if (!validationResult.success) {
            const errorsTree = treeifyError(validationResult.error);
            const amountErrors = errorsTree.properties?.amount;
            const descriptionErrors = errorsTree.properties?.description;
            const tagsErrors = errorsTree.properties?.tags;

            setErrors({
                amount: amountErrors ? amountErrors.errors : [],
                description: descriptionErrors ? descriptionErrors.errors : [],
                tags: tagsErrors ? tagsErrors.errors : [],
            });

            return;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-10">
                    <BubbleQuantityInput
                        value={expense.amount}
                        onChange={(e) => {
                            setExpense({
                                ...expense,
                                amount: parseFloat(e.target.value),
                            });
                        }}
                        name="Amount"
                        label="Amount"
                    />
                </div>
                <TextField
                    type="text"
                    onChange={(e) => {
                        setExpense({ ...expense, description: e.target.value });
                    }}
                    name="description"
                    label="Description"
                    hideLabel
                    inputClass="bg-white"
                    value={expense.description}
                />
            </form>
            <div className="border-t border-white mt-10 pt-5">
                <div className="w-ful text-white text-center">
                    {!!expense.tags ? "No tags" : ""}
                </div>
            </div>
            <div className="w-full mt-2 flex justify-center">
                <Button
                    full
                    variation="yellowbutter"
                    text="Mange tags"
                    onClick={() => {
                        console.log("Clicked");
                    }}
                />
            </div>
        </div>
    );
};

export default ExpenseForm;
