import { match, P } from "ts-pattern";
import {
	getAllCalendars,
	getCalendarName,
	selectAllCalendars,
	unselectAllCalendars,
} from "./calendars";
import { clickViewSwitcherKey, VIEW_SWITCHER_KEYS } from "./view-switcher";

export default defineContentScript({
	matches: ["*://calendar.google.com/*"],
	main() {
		browser.runtime.onMessage.addListener(
			async (event, sender, sendResponse) => {
				console.debug(event);
				return match(event)
					.with({ type: "LIST_CALENDAR" }, (event) => {
						const { myCalendars, otherCalendars } = getAllCalendars();
						const myCalendarNames = myCalendars.map((c) => getCalendarName(c));
						const otherCalendarNames = otherCalendars.map((c) =>
							getCalendarName(c),
						);

						sendResponse({ myCalendarNames, otherCalendarNames });
						return { myCalendarNames, otherCalendarNames };
					})
					.with(
						{ type: "SELECT_VIEW", key: P.union(...VIEW_SWITCHER_KEYS) },
						(event) => {
							clickViewSwitcherKey(event.key);
						},
					)
					.with({ type: "UNSELECT_ALL" }, (event) => {
						const calendars = getAllCalendars();
						unselectAllCalendars([
							...calendars.myCalendars,
							...calendars.otherCalendars,
						]);
						return true;
					})
					.with({ type: "SELECT_ALL" }, (event) => {
						const calendars = getAllCalendars();
						selectAllCalendars([
							...calendars.myCalendars,
							...calendars.otherCalendars,
						]);
						return true;
					})
					.otherwise((event) => {
						console.debug(event);
						return event;
					});
			},
		);
	},
});
