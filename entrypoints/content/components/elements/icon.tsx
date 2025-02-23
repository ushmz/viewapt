import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

export const ChevronDown: React.FC = () => {
	return (
		<ChevronDownIcon
			className={
				"text-[#c4c7c5] h-5 w-5 transition duration-150 ease-in-out group-hover:text-[#c4c7c5]/80"
			}
			aria-hidden="true"
		/>
	);
};

export const Check: React.FC = () => {
	return (
		<CheckIcon
			className={
				"text-[#c4c7c5] h-5 w-5 transition duration-150 ease-in-out group-hover:text-[#c4c7c5]/80"
			}
			aria-hidden="true"
		/>
	);
};
