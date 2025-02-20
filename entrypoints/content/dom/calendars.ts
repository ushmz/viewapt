import { Calendar } from "@/entrypoints/content/dom/calendar.ts";

export const getCalendarListDom = () => {
	const calendarListsDiv = document.querySelector('div[role="complementary"]');
	if (!calendarListsDiv) {
		return { myCalendarList: null, otherCalendarList: null };
	}

	const calendarLists = calendarListsDiv.querySelectorAll(
		'div[aria-label][role="list"]',
	);

	if (calendarLists.length !== 2) {
		return { myCalendarList: null, otherCalendarList: null };
	}

	return {
		myCalendarList: calendarLists.item(0),
		otherCalendarList: calendarLists.item(1),
	};
};

export const getAllCalendars = (): {
	myCalendars: Calendar[];
	otherCalendars: Calendar[];
} => {
	const calendarListsDiv = document.querySelector('div[role="complementary"]');
	if (!calendarListsDiv) {
		return { myCalendars: [], otherCalendars: [] };
	}

	const calendarLists = calendarListsDiv.querySelectorAll(
		'div[aria-label][role="list"]',
	);

	if (calendarLists.length !== 2) {
		return { myCalendars: [], otherCalendars: [] };
	}

	const isValidCalendarElement = (element: Element) => {
		const isHTMLElement = element instanceof HTMLElement;
		const isDiv = element.tagName === "DIV";
		const hasRolePresentation = element.getAttribute("role") === "presentation";
		return isHTMLElement && isDiv && hasRolePresentation;
	};

	const { myCalendarList, otherCalendarList } = getCalendarListDom();

	const myCalendars = Array.from(myCalendarList?.children ?? [])
		.filter(isValidCalendarElement)
		.map((elem) => new Calendar(elem));
	const otherCalendars = Array.from(otherCalendarList?.children ?? [])
		.filter(isValidCalendarElement)
		.map((elem) => new Calendar(elem));

	return { myCalendars, otherCalendars };
};

export const clearCalendars = (calendars: Calendar[]) => {
	for (const calendar of calendars) {
		calendar.hide();
	}
};

export const getSelectedCalendars = () => {
	const { myCalendars, otherCalendars } = getAllCalendars();
	return [
		...myCalendars.filter((cal) => cal.isShown()),
		...otherCalendars.filter((cal) => cal.isShown()),
	];
};

export const showCalendars = (
	calendars: Calendar[],
	calendarNames: string[],
) => {
	const target = calendars.filter((cal) => {
		return cal.name && calendarNames.includes(cal.name);
	});

	for (const cal of target) {
		cal.show();
	}
};

export const selectAllCalendars = (calendars: Calendar[]) => {
	for (const calendar of calendars) {
		calendar.show();
	}
};
