import { PresetSelector } from "@/entrypoints/content/ui.tsx";
import ReactDOM from "react-dom/client";
import "@/assets/tailwind.css";
import "@/entrypoints/content/content.css";

export default defineContentScript({
	matches: ["*://calendar.google.com/*"],
	async main(ctx) {
		const ui = createIntegratedUi(ctx, {
			position: "inline",
			anchor: "div[role='main']",
			append: "before",
			onMount: (container) => {
				const root = ReactDOM.createRoot(container);
				root.render(<PresetSelector />);

				return root;
			},
			// onRemove: (root) => {},
		});
		ui.mount();
	},
});
