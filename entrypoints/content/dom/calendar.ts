import { CalendarDom } from "@/types/calendar";

class Calendar implements CalendarDom {
	constructor(private element: Element) {}

	get id() {
		return (
			this.element
				.querySelector('li[role="listitem"] div[data-id]')
				?.getAttribute("data-id") || ""
		);
	}

	get name() {
		const nameElements = this.element.querySelector(
			"span[jsslot]:not([class])",
		);
		if (!nameElements) {
			return null;
		}

		return nameElements.textContent;
	}

	toggle() {
		const checkbox = this.element.querySelector('input[type="checkbox"]');
		if (checkbox) {
			(checkbox as HTMLInputElement).click();
		}
	}

	isShown() {
		return (
			this.element.querySelector('input[type="checkbox"]:checked') !== null
		);
	}

	show() {
		const checkedBox = this.element.querySelector(
			'input[type="checkbox"]:not(:checked)',
		);
		if (checkedBox) {
			(checkedBox as HTMLInputElement).click();
		}
	}

	isHidden() {
		return (
			this.element.querySelector('input[type="checkbox"]:not(:checked') !== null
		);
	}

	hide() {
		const checkedBox = this.element.querySelector(
			'input[type="checkbox"]:checked',
		);
		if (checkedBox) {
			(checkedBox as HTMLInputElement).click();
		}
	}

	toJSON() {
		return { id: this.id, name: this.name };
	}
}

export { Calendar };
