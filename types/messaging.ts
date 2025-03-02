import { Calendar } from "@/types/calendar";

type ListCalendarRequest = {
	message: {
		type: "LIST_CALENDARS";
	};
	response: {
		myCalendars: Calendar[];
		otherCalendars: Calendar[];
	};
};

type ClearAllRequest = {
	message: {
		type: "CLEAR_ALL";
	};
	response: {
		success: boolean;
	};
};

export type AllRequest = {
	listCalendars: ListCalendarRequest;
	clearAll: ClearAllRequest;
};
