import Button from "@/entrypoints/content/components/elements/button";
import { CalendarListBox } from "@/entrypoints/content/components/parts/calendar-select";
import { DatePeriodListBox } from "@/entrypoints/content/components/parts/date-period-select";
import { ChevronDown } from "@/entrypoints/content/components/elements/icon";
import { Calendar, DatePeriod } from "@/types/calendar";
import { PresetKey } from "@/utils/storage";
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from "@headlessui/react";
import { i18n } from "#i18n";
import React, { Fragment } from "react";

type PresetSavePopoverProps = {
	calendars: Calendar[];
	getSelectedCalendars: () => Calendar[];
	getCurrentView: () => DatePeriod;
	onConfirm: () => void;
};

const PresetSavePopover: React.FC<PresetSavePopoverProps> = ({
	calendars,
	getSelectedCalendars,
	getCurrentView,
	onConfirm,
}) => {
	const [title, setTitle] = useState<string>("");
	const [choicedCalendars, setChoicedCalendars] = useState<Calendar[]>([]);
	const [datePeriod, setDatePeriod] = useState<DatePeriod>("day");
	const [presetKey, setPresetKey] = useState<PresetKey>("primary");

	return (
		<div aria-label="viewapt-preset-popover">
			<Popover className="relative">
				{({ open }) => (
					<>
						<PopoverButton
							className={`group flex items-center h-[36px] border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 rounded-3xl px-[12px] bg-content-light dark:bg-content-dark hover:bg-highlight-light dark:hover:bg-highlight-dark`}
							onClick={() => {
								setChoicedCalendars(getSelectedCalendars());
								setDatePeriod(getCurrentView());
							}}
						>
							<span>{i18n.t("presets.save")}</span>
							<span className="pl-2">
								<ChevronDown />
							</span>
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
							<PopoverPanel className="absolute left-1/2 z-9999 mt-2 rounded-3xl w-screen max-w-sm -translate-x-1/2 transform bg-container-light dark:bg-background-dark">
								{({ close }) => (
									<div className="px-7 pt-7 pb-5">
										<div className="relative grid grid-flow-row gap-8 pb-2">
											<div>
												<input
													autoFocus
													type="text"
													value={title}
													onChange={(e) => setTitle(e.target.value)}
													placeholder={i18n.t("popover.placeholder")}
													aria-label="Preset Title"
													className="w-full text-lg appearance-none bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 border-[#444746] dark:border-[#444746] focus:border-[#0b57d0] dark:focus:border-[#a8c7fa] outline-none transition-all"
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
													value={datePeriod || "day"}
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
										<div className="flex justify-end pt-3">
											<Button
												className="bg-primary-light dark:bg-primary-dark hover:bg-primary-light dark:hover:bg-primary-dark/95 text-primary-light-text dark:text-primary-dark-text"
												onClick={() => {
													// TODO: Show error message when title is empty
													if (!title) return;

													savePreset(presetKey, {
														name: title,
														calendars: choicedCalendars.map((cal) => cal.id),
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
												<span className="px-4">{i18n.t("presets.save")}</span>
											</Button>
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
