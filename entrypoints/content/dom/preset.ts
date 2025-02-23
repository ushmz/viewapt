import {
	clearCalendars,
	getAllCalendars,
} from "@/entrypoints/content/dom/calendars";
import { selectView } from "@/entrypoints/content/dom/view-menu-items";
import { DatePeriod } from "@/types/calendar";
import { sleep } from "@/utils/sleep";

export const applyPreset = async ({
	calendars: calendarIDs,
	datePeriod,
}: { calendars: string[]; datePeriod: DatePeriod }) => {
	const { myCalendars, otherCalendars } = getAllCalendars();
	clearCalendars([...myCalendars, ...otherCalendars]);
	await sleep(100);
	[...myCalendars, ...otherCalendars]
		.filter((cal) => {
			return cal.id && calendarIDs.includes(cal.id);
		})
		.forEach((cal) => cal.show());
	await sleep(100);
	selectView(datePeriod);
};
