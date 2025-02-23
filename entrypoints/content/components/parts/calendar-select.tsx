import {
	Check,
	ChevronDown,
} from "@/entrypoints/content/components/elements/icon";
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
					"relative w-full cursor-default py-2 pl-3 pr-10 border-none text-left bg-content-light dark:bg-content-dark hover:bg-highlight-light hover:dark:bg-highlight-dark focus:outline-none sm:text-sm"
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
				<ListboxOptions className="absolute max-h-60 max-w-60 overflow-auto z-6000 rounded-sm bg-menu-item-light dark:bg-menu-item-dark drop-shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
					{calendars.map((v) => (
						<ListboxOption
							key={v.id}
							value={v}
							className={(bag) =>
								`relative cursor-default select-none py-2 pl-10 pr-4 ${bag.focus ? "bg-content-light dark:bg-content-dark" : ""}`
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
										className={`block truncate ${selected ? "font-semibold" : "font-medium"}`}
									>
										{v.name}
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
