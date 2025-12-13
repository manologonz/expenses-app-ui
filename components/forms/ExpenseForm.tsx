import React, { useRef, useState } from "react";
import BubbleQuantityInput from "./BubbleQuantityInput";
import { Expense } from "@/utils/types";
import TextField from "./TextField";
import SelectField from "./SelectField";
import InteractiveModal from "../common/InteractiveModal";
import { useCrudActions } from "../state/CrudActions.state";

type Props = {
    data?: Expense;
};

const ExpenseForm: React.FC<Props> = ({ data }) => {
    const [actions, setAction] = useCrudActions();
    const [expense, setExpense] = useState<Omit<Expense, "id">>({
        amount: 0,
        description: "",
        tags: [],
    });

    if (!setAction) {
        return;
    }

    const onMount = useRef(false);

    if (!onMount.current) {
        if (data) {
            useState(data);
        }
    }

    return (
        <div>
            <form>
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
                <div className="flex justify-center pt-5">
                    <button
                        onClick={() => {
                            setAction({ ...actions, tag: !actions.tag });
                        }}
                        className="bg-greenjade px-3 py-1 rounded-[5px] text-white hover:bg-white hover:text-black cursor-pointer transition-all"
                    >
                        Manage tags
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseForm;
