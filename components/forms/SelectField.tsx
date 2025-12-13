"use client";

import React, { useState, useRef, useEffect } from "react";
import ErrorBox from "./ErrorBox";

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type SelectFieldProps = {
    name: string;
    id?: string;
    value: string | string[]; // Single value or array for multi-select
    onChange: (value: string | string[]) => void;
    options: SelectOption[];
    label: string;
    hideLabel?: boolean;
    errors?: string[];
    placeholder?: string;
    multiple?: boolean;
    searchable?: boolean;
    disabled?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
    name,
    id,
    errors,
    value,
    label,
    hideLabel,
    placeholder,
    onChange,
    options,
    multiple = false,
    searchable = false,
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen, searchable]);

    const getSelectedOptions = (): SelectOption[] => {
        if (multiple && Array.isArray(value)) {
            return options.filter((opt) => value.includes(opt.value));
        } else if (!multiple && typeof value === "string") {
            return options.filter((opt) => opt.value === value);
        }
        return [];
    };

    const getDisplayText = (): string => {
        const selected = getSelectedOptions();
        if (selected.length === 0) {
            return placeholder || "Select...";
        }
        if (multiple) {
            return selected.map((opt) => opt.label).join(", ");
        }
        return selected[0]?.label || "";
    };

    const handleOptionClick = (optionValue: string) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            if (currentValues.includes(optionValue)) {
                // Remove from selection
                onChange(currentValues.filter((v) => v !== optionValue));
            } else {
                // Add to selection
                onChange([...currentValues, optionValue]);
            }
        } else {
            onChange(optionValue);
            setIsOpen(false);
            setSearchTerm("");
        }
    };

    const handleClearSelection = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(multiple ? [] : "");
    };

    const handleRemoveTag = (e: React.MouseEvent, optionValue: string) => {
        e.stopPropagation();
        if (multiple && Array.isArray(value)) {
            onChange(value.filter((v) => v !== optionValue));
        }
    };

    const isOptionSelected = (optionValue: string): boolean => {
        if (multiple && Array.isArray(value)) {
            return value.includes(optionValue);
        }
        return value === optionValue;
    };

    const getFilteredOptions = (): SelectOption[] => {
        if (!searchTerm) return options;
        const lowerSearch = searchTerm.toLowerCase();
        return options.filter(
            (opt) =>
                opt.label.toLowerCase().includes(lowerSearch) ||
                opt.value.toLowerCase().includes(lowerSearch)
        );
    };

    const filteredOptions = getFilteredOptions();
    const selectedOptions = getSelectedOptions();
    const hasSelection = selectedOptions.length > 0;

    return (
        <div className="block py-2.5" ref={containerRef}>
            <label
                htmlFor={name}
                className={`block w-full ${hideLabel ? "hidden" : ""}`}
            >
                {label}
            </label>
            <div className="relative">
                <div
                    className={`min-h-10 px-2.5 py-0.5 flex items-center justify-between w-full border border-greenjade rounded-[5px] text-[16px] cursor-pointer ${
                        disabled
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-white hover:border-greensage"
                    }`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                >
                    <div className="flex-1 flex items-center flex-wrap gap-1 py-1">
                        {multiple && selectedOptions.length > 0 ? (
                            selectedOptions.map((opt) => (
                                <span
                                    key={opt.value}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-greenjade text-white rounded text-sm"
                                >
                                    {opt.label}
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            handleRemoveTag(e, opt.value)
                                        }
                                        className="hover:text-red-200"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))
                        ) : (
                            <span
                                className={hasSelection ? "" : "text-gray-400"}
                            >
                                {getDisplayText()}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {hasSelection && !disabled && (
                            <button
                                type="button"
                                onClick={handleClearSelection}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        )}
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
                            className={`text-greenjade transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-greenjade rounded-[5px] shadow-lg max-h-60 overflow-hidden">
                        {searchable && (
                            <div className="p-2 border-b border-gray-200">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Search..."
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-greenjade"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}
                        <div className="overflow-y-auto max-h-52">
                            {filteredOptions.length === 0 ? (
                                <div className="px-3 py-2 text-gray-400 text-sm">
                                    No options found
                                </div>
                            ) : (
                                filteredOptions.map((option) => {
                                    const selected = isOptionSelected(
                                        option.value
                                    );
                                    return (
                                        <div
                                            key={option.value}
                                            onClick={() =>
                                                !option.disabled &&
                                                handleOptionClick(option.value)
                                            }
                                            className={`px-3 py-2 cursor-pointer flex items-center justify-between ${
                                                option.disabled
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : "hover:bg-greenjade hover:text-white"
                                            } ${
                                                selected
                                                    ? "bg-greensage text-white"
                                                    : ""
                                            }`}
                                        >
                                            <span>{option.label}</span>
                                            {multiple && selected && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
            {!!errors?.length && <ErrorBox errors={errors} />}
        </div>
    );
};

export default SelectField;
