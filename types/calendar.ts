/**
 * @interface Calendar interface
 * @property {string} id - Calendar ID
 * @property {string | null} name - Calendar name displayed in the UI
 */
export interface Calendar {
	id: string;
	name: string | null;
}

/**
 * @interface Calendar DOM interface
 * @property {string} id - Calendar ID
 * @property {string | null} name - Calendar name displayed in the UI
 * @method {function} toggle - Toggle calendar visibility
 * @method {function} isShown - Check if calendar is shown in the UI
 * @method {function} show - Show calendar
 * @method {function} isHidden - Check if calendar is hidden in the UI
 * @method {function} hide - Hide calendar
 * @method {function} toJSON - Convert to JSON
 */
export interface CalendarDom {
	id: string;
	name: string | null;
	toggle(): void;
	isShown(): boolean;
	show(): void;
	isHidden(): boolean;
	hide(): void;
	toJSON(): Calendar;
}

/**
 * Date period type
 */
export const VIEW_KEYS = [
	"DAY",
	"WEEK",
	"MONTH",
	"YEAR",
	"AGENDA",
	"CUSTOM_DAYS",
] as const;
export type ViewKey = (typeof VIEW_KEYS)[number];
export type DatePeriod = Lowercase<ViewKey>;

/**
 * @interface CalendarViewPreset interface
 * @property {number} index - Preset index
 * @property {string} name - Preset name
 * @property {Calendar[]} calendars - List of calendars
 * @property {ViewKey} view - Date period
 */
export interface CalendarViewPreset {
	name: string;
	calendars: Calendar[];
	datePeriod: DatePeriod;
}
