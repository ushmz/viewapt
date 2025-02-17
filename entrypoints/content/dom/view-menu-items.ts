import { DatePeriod } from "@/types/calendar";
import { match } from "ts-pattern";

export const getCurrentView = () => {
	// for (const key in VIEW_SWITCHER_KEYS) {
	// 	const viewListItem = document.querySelector(
	// 		`li[data-accelerator=${key}][role="menuitem"]`,
	// 	);
	// 	if (viewListItem) {
	// 		return key;
	// 	}
	// }
	//
	// return null;
	const viewKey = document.body.getAttribute("data-viewkey");
	return match(viewKey)
		.with("DAY", () => "day" as DatePeriod)
		.with("WEEK", () => "week" as DatePeriod)
		.with("MONTH", () => "month" as DatePeriod)
		.with("YEAR", () => "year" as DatePeriod)
		.with("AGENDA", () => "agenda" as DatePeriod)
		.with("CUSTOM_DAYS", () => "custom_days" as DatePeriod)
		.otherwise(() => null);
};

export const selectView = (datePeriod: DatePeriod) => {
	const accelerator = match(datePeriod)
		.with("day", () => "D")
		.with("week", () => "W")
		.with("month", () => "M")
		.with("year", () => "Y")
		.with("agenda", () => "A")
		.with("custom_days", () => "X")
		.exhaustive();

	const keyListItem = document.querySelector(
		`li[data-accelerator=${accelerator}][role="menuitem"]`,
	);
	if (!keyListItem) {
		return;
	}

	(keyListItem as HTMLDataListElement).click();
};
