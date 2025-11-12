"use client";

import React, { useState } from "react";
import TextField from "@/components/forms/TextField";
import DatePicker from "@/components/forms/DatePicker";
import SelectField, { SelectOption } from "@/components/forms/SelectField";
import { Funnel } from "lucide-react";
import { userHeaderActionState } from "@/components/state/HeaderActions.state";
import InteractiveModal from "@/components/common/InteractiveModal";
import ExpenseForm from "@/components/forms/ExpenseForm";
import TagSelection from "@/components/forms/TagSelection";

export type Props = {};

const ExpensesHome: React.FC<Props> = ({}) => {
    const [actions, setActions] = userHeaderActionState();

    const [filters, setFilters] = useState({
        open: false,
        search: "",
        startDate: "",
        endDate: "",
        sort: "",
    });

    const sortOptions: SelectOption[] = [
        {
            label: "Default Ascendent",
            value: "id:asc",
        },
        {
            label: "Default Descendent",
            value: "id:desc",
        },
        {
            label: "Date Ascendent",
            value: "date:asc",
        },
        {
            label: "Date Descendent",
            value: "date:desc",
        },
    ];

    return (
        <div className="w-full h-full">
            <div className="w-full flex items-center gap-2">
                <TextField
                    containerClass="grow"
                    type="text"
                    label="Search"
                    name="search"
                    value={filters.search}
                    onChange={(event) => {
                        setFilters({ ...filters, search: event.target.value });
                    }}
                    hideLabel
                />
                <button
                    type="button"
                    className={`h-full cursor-pointer rounded-[5px] px-1 ${
                        filters.open ? "bg-greenjade" : ""
                    }`}
                    onClick={() => {
                        setFilters({ ...filters, open: !filters.open });
                    }}
                >
                    <Funnel
                        color={filters.open ? "#fff" : "#808080"}
                        height={40}
                    />
                </button>
            </div>
            <div
                className={` absolute left-2 right-2 px-2 transition-all rounded-[5px] ease-in-out overflow-hidden border shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
 ${
     !filters.open
         ? "h-0 border-transparent hidden"
         : " border-greenjade overflow-visible h-auto py-2"
 }`}
            >
                <div className="w-full flex gap-3">
                    <div className="w-1/2">
                        <DatePicker
                            label="Start Date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={(value) => {
                                setFilters({ ...filters, startDate: value });
                            }}
                        />
                    </div>
                    <div className="w-1/2">
                        <DatePicker
                            label="End Date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={(value) => {
                                setFilters({ ...filters, endDate: value });
                            }}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <SelectField
                        name="sort"
                        label="Sort"
                        options={sortOptions}
                        placeholder="Select sort option"
                        onChange={(value) => {
                            setFilters({ ...filters, sort: value as string });
                        }}
                        value={filters.sort}
                        hideLabel
                    />
                </div>
            </div>
            <InteractiveModal modalKey="create">
                <ExpenseForm />
            </InteractiveModal>
            <InteractiveModal modalKey="tag">
                <TagSelection
                    onTagSelction={(tags) => {
                        console.log(tags);
                    }}
                />
            </InteractiveModal>
        </div>
    );
};

export default ExpensesHome;
