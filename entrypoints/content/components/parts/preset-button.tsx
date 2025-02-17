import { CalendarViewPreset } from "@/types/calendar";
import React from "react";

type PresetButtonProps = {
	placeholderText: string;
	preset: CalendarViewPreset | null;
	onClick: () => void;
};
const PresetButton: React.FC<PresetButtonProps> = ({
	preset,
	placeholderText,
	onClick,
}) => {
	return (
		<button aria-label="viewapt-button" type="button" onClick={onClick}>
			{preset ? preset.name : placeholderText}
		</button>
	);
};

export default PresetButton;
