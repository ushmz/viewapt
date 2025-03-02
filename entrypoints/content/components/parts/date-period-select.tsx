import {
	Check,
	ChevronDown,
} from "@/entrypoints/content/components/elements/icon";
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
				className={[
					"relative w-full py-2 pl-3 pr-10",
					"bg-content-light dark:bg-content-dark hover:bg-highlight-light hover:dark:bg-highlight-dark",
					"border-none text-left cursor-default focus:outline-none",
				].join(" ")}
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
				<ListboxOptions
					className={[
						"absolute max-h-60 max-w-60",
						"overflow-auto z-6000 rounded-sm drop-shadow-md focus:outline-none sm:text-sm",
						"bg-menu-item-light dark:bg-menu-item-dark",
					].join(" ")}
				>
					{Object.entries(datePeriods).map(([key, period]) => (
						<ListboxOption
							key={key}
							value={period}
							className={(bag) =>
								[
									"relative cursor-default select-none py-2 pr-4 pl-10",
									bag.focus ? "bg-content-light dark:bg-content-dark" : "",
								].join(" ")
							}
						>
							{({ selected }) => (
								<div>
									{selected ? (
										<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
											<Check />
										</span>
									) : null}
									<span
										className={`block truncate dark:${selected ? "font-semibold" : "font-medium"}`}
									>
										{i18n.t(`viewKey.${period}`)}
									</span>
								</div>
							)}
						</ListboxOption>
					))}
				</ListboxOptions>
			</Transition>
		</Listbox>
	);
};
