"use client";

import React, { useState, useRef, useEffect } from "react";
import ErrorBox from "./ErrorBox";

export type DatePickerProps = {
    name: string;
    id?: string;
    value: string; // ISO date string (YYYY-MM-DD)
    onChange: (value: string) => void;
    label: string;
    hideLabel?: boolean;
    errors?: string[];
    placeholder?: string;
    minDate?: string; // ISO date string
    maxDate?: string; // ISO date string
};

const DatePicker: React.FC<DatePickerProps> = ({
    name,
    id,
    errors,
    value,
    label,
    hideLabel,
    placeholder,
    onChange,
    minDate,
    maxDate,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [inputValue, setInputValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    // Format date for display (MM/DD/YYYY)
    const formatDisplayDate = (isoDate: string): string => {
        if (!isoDate) return "";
        const date = new Date(isoDate + "T00:00:00");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    // Parse display date to ISO format
    const parseDisplayDate = (displayDate: string): string => {
        const parts = displayDate.split("/");
        if (parts.length !== 3) return "";
        const [month, day, year] = parts;
        if (
            !month ||
            !day ||
            !year ||
            isNaN(Number(month)) ||
            isNaN(Number(day)) ||
            isNaN(Number(year))
        ) {
            return "";
        }
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        if (isNaN(date.getTime())) return "";
        return date.toISOString().split("T")[0];
    };

    // Update input value when value prop changes
    useEffect(() => {
        setInputValue(formatDisplayDate(value));
    }, [value]);

    // Update current month when value changes
    useEffect(() => {
        if (value) {
            const date = new Date(value + "T00:00:00");
            if (!isNaN(date.getTime())) {
                setCurrentMonth(date);
            }
        }
    }, [value]);

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // Try to parse and validate the date
        const isoDate = parseDisplayDate(newValue);
        if (isoDate) {
            onChange(isoDate);
        }
    };

    const handleInputBlur = () => {
        // If input is invalid, reset to current value
        const isoDate = parseDisplayDate(inputValue);
        if (!isoDate && value) {
            setInputValue(formatDisplayDate(value));
        }
    };

    const handleDateSelect = (date: Date) => {
        const isoDate = date.toISOString().split("T")[0];
        onChange(isoDate);
        setIsOpen(false);
    };

    const getDaysInMonth = (date: Date): Date[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();

        const days: Date[] = [];

        // Add empty slots for days before the first day of the month
        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(new Date(year, month, -startDayOfWeek + i + 1));
        }

        // Add all days in the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        // Add days from next month to complete the grid
        const remainingSlots = 42 - days.length; // 6 rows * 7 days
        for (let i = 1; i <= remainingSlots; i++) {
            days.push(new Date(year, month + 1, i));
        }

        return days;
    };

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            if (direction === "prev") {
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    const isDateDisabled = (date: Date): boolean => {
        const dateString = date.toISOString().split("T")[0];
        if (minDate && dateString < minDate) return true;
        if (maxDate && dateString > maxDate) return true;
        return false;
    };

    const isDateSelected = (date: Date): boolean => {
        if (!value) return false;
        return date.toISOString().split("T")[0] === value;
    };

    const isDateInCurrentMonth = (date: Date): boolean => {
        return date.getMonth() === currentMonth.getMonth();
    };

    const isToday = (date: Date): boolean => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const days = getDaysInMonth(currentMonth);
    const monthYear = currentMonth.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="block py-2.5" ref={containerRef}>
            <label
                htmlFor={name}
                className={`block w-full ${hideLabel ? "hidden" : ""}`}
            >
                {label}
            </label>
            <div className="relative">
                <input
                    className="h-10 px-2.5 py-0.5 block w-full border border-greenjade rounded-[5px] text-[16px]"
                    id={id}
                    type="text"
                    name={name}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder || "MM/DD/YYYY"}
                />
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-greenjade hover:text-greensage"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-50 mt-1 bg-white border border-greenjade rounded-[5px] shadow-lg p-4 w-80">
                        {/* Month/Year Navigation */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                type="button"
                                onClick={() => navigateMonth("prev")}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <span className="font-semibold">{monthYear}</span>
                            <button
                                type="button"
                                onClick={() => navigateMonth("next")}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                                (day) => (
                                    <div
                                        key={day}
                                        className="text-center text-sm font-semibold text-gray-600"
                                    >
                                        {day}
                                    </div>
                                )
                            )}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1">
                            {days.map((date, index) => {
                                const disabled = isDateDisabled(date);
                                const selected = isDateSelected(date);
                                const inCurrentMonth =
                                    isDateInCurrentMonth(date);
                                const todayDate = isToday(date);

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            !disabled && handleDateSelect(date)
                                        }
                                        disabled={disabled}
                                        className={`
                                            p-2 text-sm rounded hover:bg-greenjade hover:text-white transition-colors
                                            ${
                                                !inCurrentMonth
                                                    ? "text-gray-300"
                                                    : ""
                                            }
                                            ${
                                                disabled
                                                    ? "opacity-30 cursor-not-allowed hover:bg-transparent hover:text-current"
                                                    : ""
                                            }
                                            ${
                                                selected
                                                    ? "bg-greenjade text-white font-bold"
                                                    : ""
                                            }
                                            ${
                                                todayDate && !selected
                                                    ? "border border-greenjade"
                                                    : ""
                                            }
                                        `}
                                    >
                                        {date.getDate()}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Today Button */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => handleDateSelect(new Date())}
                                className="w-full py-1.5 text-sm text-greenjade hover:bg-greenjade hover:text-white rounded transition-colors"
                            >
                                Today
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {!!errors?.length && <ErrorBox errors={errors} />}
        </div>
    );
};

export default DatePicker;
