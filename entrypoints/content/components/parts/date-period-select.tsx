import { ChevronDown } from "@/entrypoints/content/components/parts/icon";
import { DatePeriod, ViewKey } from "@/types/calendar";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";

const datePeriods = {
	DAY: "day",
	WEEK: "week",
	MONTH: "month",
	YEAR: "year",
	AGENDA: "agenda",
	CUSTOM_DAYS: "custom_days",
} satisfies Record<ViewKey, DatePeriod>;

type Props = {
	value: DatePeriod;
	onChange: (view: DatePeriod) => void;
};
export const DatePeriodListBox: React.FC<Props> = ({ value, onChange }) => {
	return (
		<Listbox value={value} onChange={onChange}>
			<ListboxButton
				className={
					"relative w-full cursor-default py-2 pl-3 pr-10 border-none text-left dark:bg-[#333537] shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
				}
			>
				<span className="block truncate">
					{i18n.t(`viewKey.${value ?? "day"}`)}
				</span>
				<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
					<ChevronDown />
				</span>
			</ListboxButton>
			<Transition
				as={Fragment}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<ListboxOptions className="absolute max-h-60 max-w-60 overflow-auto text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
					{Object.entries(datePeriods).map(([key, period]) => (
						<ListboxOption
							key={key}
							value={period}
							className={(bag) =>
								`relative cursor-default select-none py-2 pl-10 pr-4 z-6000 dark:bg-[#1e1f20] ${bag.focus ? "dark:bg-[#414345]" : ""}`
							}
						>
							{({ selected }) => (
								<span
									className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
								>
									{i18n.t(`viewKey.${period}`)}
								</span>
							)}
						</ListboxOption>
					))}
				</ListboxOptions>
			</Transition>
		</Listbox>
	);
};
