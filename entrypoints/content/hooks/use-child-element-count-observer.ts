export const useChildElementCountObserver = (
	target: Element | null,
	callback: (targetNode: Element) => void,
) => {
	useEffect(() => {
		if (!target) return;

		let previousChildCount = target.childElementCount;

		const observer = new MutationObserver(() => {
			const currentChildCount = target.childElementCount;
			if (currentChildCount !== previousChildCount) {
				callback(target);
				previousChildCount = currentChildCount;
			}
		});

		observer.observe(target, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, [target, callback]);
};
