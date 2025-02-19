import {
	Check,
	ChevronDown,
} from "@/entrypoints/content/components/parts/icon";
import { Calendar } from "@/types/calendar";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";

type Props = {
	value: Calendar[];
	calendars: Calendar[];
	onChange: (calendars: Calendar[]) => void;
};

export const CalendarListBox: React.FC<Props> = ({
	value,
	calendars,
	onChange,
}) => {
	return (
		<Listbox multiple value={value} onChange={onChange}>
			<ListboxButton
				className={
					"relative w-full cursor-default py-2 pl-3 pr-10 border-none text-left dark:bg-[#333537] shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
				}
			>
				<span className="block truncate">{`${value.length} calendars`}</span>
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
					{calendars.map((v) => (
						<ListboxOption
							key={v.id}
							value={v}
							className={(bag) =>
								`relative cursor-default select-none py-2 pl-10 pr-4 z-6000 dark:bg-[#1e1f20] ${bag.focus ? "dark:bg-[#414345]" : ""}`
							}
						>
							{({ selected }) => (
								<>
									{/* TODO: Show on multiple selct */}
									{selected ? (
										<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
											<Check />
										</span>
									) : null}
									<span
										className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
									>
										{v.name}
									</span>
								</>
							)}
						</ListboxOption>
					))}
				</ListboxOptions>
			</Transition>
		</Listbox>
	);
};
