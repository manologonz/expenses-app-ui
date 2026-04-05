import React, { useRef, useState } from "react";
import BubbleQuantityInput from "./BubbleQuantityInput";
import {
    ActionStatus,
    Expense,
    ExpenseData,
    ExpenseErrors,
    ServiceResponse,
} from "@/utils/types";
import TextField from "./TextField";
import { useCrudActions } from "../state/CrudActions.state";
import { Button, InputButton } from "@/components/forms/Button";
import z, { treeifyError } from "zod";
import ExpensesLocalService from "@/utils/api/expenses";
import InteractiveModal from "../common/InteractiveModal";
import TagSelection from "./TagSelection";

type Props = {
    data?: Expense;
    isEdit?: boolean;
    closeOnSave?: boolean;
    onSave?: (expense?: Expense) => void;
    onDelete?: (expense?: Expense) => void;
    expenseData?: Omit<Expense, "updatedAt, createdAt">;
    title?: string;
    modalId?: string;
};

const ExpenseForm: React.FC<Props> = ({
    data,
    title,
    closeOnSave,
    onSave,
    modalId,
}) => {
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
    const [status, setStatus] = useState<ActionStatus>(ActionStatus.NONE);

    if (!setAction) {
        return;
    }

    const onMount = useRef(false);

    const expenseService = new ExpensesLocalService();

    if (!onMount.current) {
        useState(data);
        if (data) {
        }
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const expenseValidator = z.object({
            amount: z
                .number()
                .gt(0, { message: "Value must be greated than 0" }),
            description: z
                .string()
                .min(1, { message: "This field is required" }),
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

        saveData(expense);
    };

    const saveData = async (data: ExpenseData) => {
        setStatus(ActionStatus.LOADING);

        let response: ServiceResponse<Expense>;

        response = await expenseService.createExpense(data);

        if (!response?.ok) {
            setStatus(ActionStatus.ERROR);
        } else {
            setStatus(ActionStatus.SUCCESS);

            if (closeOnSave) {
                setAction({
                    ...actions,
                    modals: {
                        ...actions.modals,
                        [modalId || "entity-create"]: false,
                    },
                });
            }

            if (onSave) {
                onSave(response.data);
            }
        }

        return response.data;
    };

    return (
        <div>
            <div className="border-b border-white pb-2 mb-5">
                <h2 className="text-white uppercase font-bold">
                    {title || "New expense"}
                </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-10">
                    <BubbleQuantityInput
                        errors={errors.amount}
                        value={expense.amount}
                        onChange={(e) => {
                            setExpense({
                                ...expense,
                                amount: parseFloat(e.target.value) || 0,
                            });
                            if (errors.amount.length) {
                                setErrors({ ...errors, amount: [] });
                            }
                        }}
                        name="Amount"
                        label="Amount"
                    />
                </div>
                <TextField
                    errors={errors.description}
                    type="text"
                    onChange={(e) => {
                        setExpense({ ...expense, description: e.target.value });
                        if (errors.description.length) {
                            setErrors({ ...errors, description: [] });
                        }
                    }}
                    name="description"
                    label="Description"
                    hideLabel
                    inputClass="bg-white"
                    value={expense.description}
                />
                <div className="border-t border-white mt-10 pt-5">
                    <div className="w-ful text-white text-center">
                        {!!expense.tags ? "No tags" : ""}
                    </div>
                </div>
                <div className="w-full mt-2 flex justify-center">
                    <Button
                        variation="yellowbutter"
                        text="Mange tags"
                        onClick={() => {
                            setAction({
                                ...actions,
                                modals: {
                                    ...actions.modals,
                                    "manage-tags": true,
                                },
                            });
                        }}
                    />
                </div>
                <div className="w-full mt-3">
                    <InputButton full variation="greenjade" text="Save" />
                </div>
            </form>

            <InteractiveModal modalKey="manage-tags">
                <TagSelection
                    onTagSelction={(tags) => {
                        console.log(tags);
                    }}
                />
            </InteractiveModal>
        </div>
    );
};

export default ExpenseForm;
