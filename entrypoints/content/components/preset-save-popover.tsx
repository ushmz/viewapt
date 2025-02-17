import { CalendarListBox } from "@/entrypoints/content/components/parts/calendar-select";
import { ChevronDown } from "@/entrypoints/content/components/parts/icon";
import { DatePeriodListBox } from "@/entrypoints/content/components/parts/date-period-select";
import { Calendar, DatePeriod } from "@/types/calendar";
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from "@headlessui/react";
import { i18n } from "#i18n";
import React, { Fragment } from "react";
import { PresetKey } from "@/utils/storage";

type PresetSavePopoverProps = {
	calendars: Calendar[];
	selectedCalendars: Calendar[];
	selectedDatePeriod: DatePeriod | null;
	onConfirm: () => void;
};

const PresetSavePopover: React.FC<PresetSavePopoverProps> = ({
	calendars,
	selectedCalendars,
	selectedDatePeriod,
	onConfirm,
}) => {
	const [title, setTitle] = useState<string>("");
	const [choicedCalendars, setChoicedCalendars] =
		useState<Calendar[]>(selectedCalendars);
	const [datePeriod, setDatePeriod] = useState<DatePeriod>(
		selectedDatePeriod ?? "day",
	);
	const [presetKey, setPresetKey] = useState<PresetKey>("primary");
	useEffect(() => {
		console.info(`[viewapt] Preset key: ${presetKey}`);
	}, [presetKey]);

	return (
		<div className="viewapt" aria-label="viewapt-preset-popover">
			<Popover className="relative z-999">
				{({ open }) => (
					<>
						<PopoverButton
							className={`${open ? "text-white" : "text-white/90"} group flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
						>
							<span>{i18n.t("presets.save")}</span>
							<ChevronDown />
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute left-1/2 z-10 mt-3 rounded-3xl w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 dark:bg-[#1e1f20]">
								{({ close }) => (
									<div className="overflow-hidden ring-1 ring-black/5">
										<div className="relative grid grid-flow-row gap-8 p-7">
											<div>
												<input
													autoFocus
													type="text"
													value={title}
													onChange={(e) => setTitle(e.target.value)}
													placeholder={i18n.t("popover.placeholder")}
													aria-label="Preset Title"
													className="w-full text-lg appearance-none bg-transparent border-b-2 border-[#444746] dark:border-[#444746] focus:border-[#0b57d0] dark:focus:border-[#a8c7fa] outline-none transition-all"
												/>
											</div>
											<div>
												<CalendarListBox
													value={choicedCalendars}
													onChange={(calendars) =>
														setChoicedCalendars(calendars)
													}
													calendars={calendars}
												/>
											</div>
											<div>
												<DatePeriodListBox
													value={datePeriod}
													onChange={(view) => setDatePeriod(view)}
												/>
											</div>
											<div className="w-full flex justify-between">
												<div className="flex align-middle">
													<input
														id="primary"
														type="radio"
														name="preset"
														value="primary"
														checked={presetKey === "primary"}
														onChange={() => setPresetKey("primary")}
													/>
													<label htmlFor="primary" className="pl-2">
														{i18n.t("presets.primary")}
													</label>
												</div>
												<div className="flex align-middle">
													<input
														id="secondary"
														type="radio"
														name="preset"
														value="secondary"
														checked={presetKey === "secondary"}
														onChange={() => setPresetKey("secondary")}
													/>
													<label htmlFor="secondary" className="pl-2">
														{i18n.t("presets.secondary")}
													</label>
												</div>
												<div className="flex align-middle">
													<input
														id="tertiary"
														type="radio"
														name="preset"
														value="tertiary"
														checked={presetKey === "tertiary"}
														onChange={() => setPresetKey("tertiary")}
													/>
													<label htmlFor="tertiary" className="pl-2">
														{i18n.t("presets.tertiary")}
													</label>
												</div>
											</div>
										</div>
										<div className="p-4 flex justify-end">
											<button
												className="ml-4 bg-[#0b57d0] dark:bg-[#a8c7fa] dark:text-[#062e6f] px-3 py-2 rounded-md"
												onClick={() => {
													savePreset(presetKey, {
														name: title,
														calendars: choicedCalendars,
														datePeriod,
													})
														.then(() => {
															onConfirm();
														})
														.then(() => {
															close();
														});
												}}
											>
												{i18n.t("presets.save")}
											</button>
										</div>
									</div>
								)}
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	);
};

export default PresetSavePopover;
