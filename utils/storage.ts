import { CalendarViewPreset } from "@/types/calendar";
import { storage } from "wxt/storage";

export type SaveData = {
	primary: CalendarViewPreset | null;
	secondary: CalendarViewPreset | null;
	tertiary: CalendarViewPreset | null;
};
export type PresetKey = keyof SaveData;

export const loadPresets = async () => {
	return await storage.getItem<SaveData>(`local:presets`);
};

export const loadPreset = async (key: PresetKey) => {
	const presets = await loadPresets();
	return presets?.[key] || null;
};

export const savePreset = async (
	key: PresetKey,
	preset: CalendarViewPreset,
) => {
	const presets = await loadPresets();
	const newPresets = { ...presets, [key]: preset };
	return await storage.setItem(`local:presets`, newPresets);
};
