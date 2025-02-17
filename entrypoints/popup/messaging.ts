import { AllRequest } from "@/types/messaging";

const sendRuntimeMessage = async <T extends keyof AllRequest>(
	message: AllRequest[T]["message"],
) => {
	const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
	if (!tab.id) {
		console.error("No active tab found");
		return;
	}

	const response = browser.tabs.sendMessage<
		AllRequest[T]["message"],
		AllRequest[T]["response"]
	>(tab.id, message);
	if (!response) {
		console.error("No response from content script");
		return;
	}

	return response;
};

export { sendRuntimeMessage };
