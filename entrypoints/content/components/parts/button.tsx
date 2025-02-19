type PresetButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<PresetButtonProps> = ({ children, ...props }) => {
	return (
		<button
			{...props}
			type="button"
			className={`rounded-3xl px-[12px] py-2 whitespace-nowrap overflow-hidden overflow-ellipsis bg-content-light dark:bg-content-dark hover:bg-highlight-light dark:hover:bg-highlight-dark ${props.className}`}
		>
			{children}
		</button>
	);
};

export default Button;
