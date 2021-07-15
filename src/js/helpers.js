import regeneratorRuntime from "regenerator-runtime/runtime.js";

const timeout = function (sec) {
	return new Promise(function (_, reject) {
		setTimeout(reject, sec * 1000);
	});
};

const fetchData = async function (url) {
	try {
		const resPro = fetch(url);

		const res = await Promise.race([resPro, timeout(10)]);
		if (!res.ok)
			throw new Error(
				"There was an error while processing your request, please try again!"
			);

		const data = await res.json();
		return data;
	} catch (err) {
		console.error(err);
	}
};

export { fetchData };
