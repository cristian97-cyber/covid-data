import { COVID_API_URL } from "./config.js";
import { fetchData } from "./helpers.js";

import regeneratorRuntime from "regenerator-runtime/runtime.js";

const state = {
	data: {},
};

const getCountryData = async function (id) {
	const casesData = await fetchData(`${COVID_API_URL}cases?ab=${id}`);
	const vaccinesData = await fetchData(`${COVID_API_URL}vaccines?ab=${id}`);

	console.log(casesData, vaccinesData);
};

export { state, getCountryData };
