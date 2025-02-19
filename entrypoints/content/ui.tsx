import Button from "@/entrypoints/content/components/parts/button";
import { ChevronDown } from "@/entrypoints/content/components/parts/icon";
import PresetSavePopover from "@/entrypoints/content/components/preset-save-popover";
import {
	clearCalendars,
	getAllCalendars,
	getSelectedCalendars,
} from "@/entrypoints/content/dom/calendars";
import {
	getCurrentView,
	selectView,
} from "@/entrypoints/content/dom/view-menu-items";
import { Calendar, CalendarViewPreset, DatePeriod } from "@/types/calendar";
import { sleep } from "@/utils/sleep";
import { loadPresets, SaveData } from "@/utils/storage";
import React from "react";

const applyPreset = async ({
	calendars,
	datePeriod,
}: { calendars: Calendar[]; datePeriod: DatePeriod }) => {
	const targets = calendars.map((cal) => cal.name).filter((name) => name);
	const { myCalendars, otherCalendars } = getAllCalendars();
	clearCalendars([...myCalendars, ...otherCalendars]);
	await sleep(100);
	[...myCalendars, ...otherCalendars]
		.filter((cal) => {
			return cal.name && targets.includes(cal.name);
		})
		.forEach((cal) => cal.show());
	await sleep(100);
	selectView(datePeriod);
};

type PresetSelectorProps = {};

export const PresetSelector: React.FC<PresetSelectorProps> = ({}) => {
	const [calendars, setCalendars] = React.useState<Calendar[]>([]);

	const [activePreset, setActivePreset] =
		React.useState<CalendarViewPreset | null>(null);
	const [presets, setPresets] = React.useState<SaveData>({
		primary: null,
		secondary: null,
		tertiary: null,
	});

	const load = async () => {
		const { myCalendars, otherCalendars } = getAllCalendars();
		setCalendars([
			...myCalendars.map((cal) => cal.toJSON()),
			...otherCalendars.map((cal) => cal.toJSON()),
		]);

		(async () => {
			const presets = await loadPresets();
			if (!presets) return;

			setPresets(presets);
		})();
	};

	useEffect(() => {
		load();
	}, [activePreset]);

	return (
		<div
			className="viewapt h-[44px] grid grid-flow-col gap-2 z-999 max-w-1/2 items-center"
			aria-label="viewapt"
		>
			<Button
				className="h-[36px]"
				onClick={() => {
					if (!presets.primary) return;
					setActivePreset(presets.primary);
					applyPreset(presets.primary);
				}}
			>
				{presets.primary?.name || i18n.t("presets.primary")}
			</Button>
			<Button
				className="h-[36px]"
				onClick={() => {
					if (!presets.secondary) return;
					setActivePreset(presets.secondary);
					applyPreset(presets.secondary);
				}}
			>
				{presets.secondary?.name || i18n.t("presets.secondary")}
			</Button>
			<Button
				className="h-[36px]"
				onClick={() => {
					if (!presets.tertiary) return;
					setActivePreset(presets.tertiary);
					applyPreset(presets.tertiary);
				}}
			>
				{presets.tertiary?.name || i18n.t("presets.tertiary")}
			</Button>
			<PresetSavePopover
				calendars={calendars}
				getSelectedCalendars={() =>
					getSelectedCalendars().map((cal) => cal.toJSON())
				}
				getCurrentView={() => getCurrentView() || "day"}
				onConfirm={load}
			>
				<span>{i18n.t("presets.save")}</span>
				<span className="pl-2">
					<ChevronDown />
				</span>
			</PresetSavePopover>
		</div>
	);
};
