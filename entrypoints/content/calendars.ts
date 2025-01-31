export const getAllCalendars = (): {
	myCalendars: Element[];
	otherCalendars: Element[];
} => {
	const calendarListsDiv = document.querySelector('div[role="complementary"]');
	if (!calendarListsDiv) {
		return { myCalendars: [], otherCalendars: [] };
	}

	const calendarLists = calendarListsDiv.querySelectorAll(
		'div[aria-label][role="list"]',
	);
	const myCalendars = Array.from(calendarLists.item(0).children);
	const otherCalendars = Array.from(calendarLists.item(1).children);

	return { myCalendars, otherCalendars };
};

export const getCalendarName = (calendar: Element) => {
	const calendarNameElement = calendar.querySelector(
		"span[jsslot]:not([class])", // cspell: disable-line
	);

	if (!calendarNameElement) return null;

	return calendarNameElement.textContent;
};

export const findCalendarByName = (
	calendars: Element[],
	calendarName: string,
) => {
	return calendars.find((calendar) => {
		const calendarNameElement = calendar.querySelector(
			"span[jsslot]:not([class])", // cspell: disable-line
		);
		return (
			calendarNameElement && calendarNameElement.textContent === calendarName
		);
	});
};

export const unselectCalendar = (
	calendars: Element[],
	calendarName: string,
) => {
	const calendar = findCalendarByName(calendars, calendarName);
	if (!calendar) {
		return;
	}

	const checkbox = calendar.querySelector('input[type="checkbox"]');
	if (checkbox && checkbox.ariaLabel === calendarName) {
		(checkbox as HTMLInputElement).checked = false;
	}
};

export const unselectAllCalendars = (calendars: Element[]) => {
	for (const calendar of calendars) {
		const checkbox = calendar.querySelector('input[type="checkbox"]:checked');
		if (checkbox) {
			(checkbox as HTMLInputElement).click();
		}
	}
};

export const selectAllCalendars = (calendars: Element[]) => {
	for (const calendar of calendars) {
		const checkbox = calendar.querySelector(
			'input[type="checkbox"]:not(:checked)',
		);
		if (checkbox) {
			(checkbox as HTMLInputElement).click();
		}
	}
};
