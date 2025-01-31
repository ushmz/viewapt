import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";

const sendMsg = async (eventType: string, params?: object) => {
	console.log("sending message");
	const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

	if (!tab.id) {
		console.error("No active tab found");
		return;
	}

	const event = { type: eventType, ...params };
	const response = await browser.tabs.sendMessage(tab.id, event);
	if (!response) {
		console.error("No response from content script");
		return;
	}

	console.table(response);
};

const unselectAll = async () => {
	console.log("sending message");
	const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

	if (!tab.id) {
		console.error("No active tab found");
		return;
	}

	const response = await browser.tabs.sendMessage(tab.id, {
		type: "UNSELECT_ALL",
	});
	if (!response) {
		console.error("No response from content script");
		return;
	}

	console.table(response);
};

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a href="https://wxt.dev" target="_blank">
					<img src={wxtLogo} className="logo" alt="WXT logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>WXT + React</h1>
			<div className="card">
				<button onClick={() => sendMsg("LIST_CALENDAR")}>
					Get Calendar list
				</button>
				<button onClick={() => sendMsg("SELECT_ALL")}>
					Select All Calendars
				</button>
				<button onClick={() => sendMsg("UNSELECT_ALL")}>
					Unselect All Calendars
				</button>
				<button onClick={() => sendMsg("SELECT_VIEW", { key: "day" })}>
					Select day
				</button>
				<button onClick={() => sendMsg("SELECT_VIEW", { key: "week" })}>
					Select week
				</button>
				<button onClick={() => sendMsg("SELECT_VIEW", { key: "month" })}>
					Select month
				</button>
				<button onClick={() => sendMsg("SELECT_VIEW", { key: "year" })}>
					Select year
				</button>
			</div>
			<p className="read-the-docs">
				Click on the WXT and React logos to learn more
			</p>
		</>
	);
}

export default App;
