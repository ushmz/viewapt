import Button from "@/entrypoints/content/components/elements/button";
import PresetSavePopover from "@/entrypoints/content/components/preset-save-popover";
import { getAllCalendars, getCalendarListDom, getSelectedCalendars } from "@/entrypoints/content/dom/calendars";
import { getCurrentView } from "@/entrypoints/content/dom/view-menu-items";
import { useChildElementCountObserver } from "@/entrypoints/content/hooks/use-child-element-count-observer";
import { Calendar, CalendarViewPreset } from "@/types/calendar";
import { loadPresets, SaveData } from "@/utils/storage";
import React from "react";
import { applyPreset } from "./dom/preset";

export const PresetButtonGroup: React.FC = () => {
	const [calendars, setCalendars] = useState<Calendar[]>([]);
	const [activePreset, setActivePreset] = useState<CalendarViewPreset | null>(
		null,
	);
	const [presets, setPresets] = useState<SaveData>({
		primary: null,
		secondary: null,
		tertiary: null,
	});

	const loadCalendars = () => {
		const { myCalendars, otherCalendars } = getAllCalendars();
		const calendars = [
			...myCalendars.map((cal) => cal.toJSON()),
			...otherCalendars.map((cal) => cal.toJSON()),
		];
		setCalendars(calendars);
	};

	const loadPreset = async () => {
		(async () => {
			const presets = await loadPresets();
			if (!presets) return;

			setPresets(presets);
		})();
	};

	useEffect(() => {
		loadPreset();
	}, [activePreset]);

	const { myCalendarList, otherCalendarList } = getCalendarListDom();
	useChildElementCountObserver(myCalendarList, () => loadCalendars());
	useChildElementCountObserver(otherCalendarList, () => loadCalendars());

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
				onConfirm={loadPreset}
			/>
		</div>
	);
};
