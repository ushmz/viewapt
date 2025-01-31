import { match } from "ts-pattern";

export const VIEW_SWITCHER_KEYS = [
	"day",
	"week",
	"month",
	"year",
	"custom",
] as const;
export type ViewSwitcherKey = (typeof VIEW_SWITCHER_KEYS)[number];

export const clickViewSwitcherKey = (key: ViewSwitcherKey) => {
	const accelerator = match(key)
		.with("day", () => "D")
		.with("week", () => "W")
		.with("month", () => "M")
		.with("year", () => "Y")
		.with("custom", () => "X")
		.exhaustive();

	const keyListItem = document.querySelector(
		`li[data-accelerator=${accelerator}][role="menuitem"]`,
	);
	(keyListItem as HTMLDataListElement).click();
};
