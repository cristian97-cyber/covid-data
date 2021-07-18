import { COVID_API_URL, GEO_API_URL, MS_PER_HOUR } from "./config.js";
import { fetchData } from "./helpers.js";

import regeneratorRuntime, { async } from "regenerator-runtime/runtime.js";
import { cache } from "@amcharts/amcharts4/core";

const state = {
	data: undefined,
	cache: [],
};

const createDataObject = function (cases, vaccines) {
	state.data = {
		countryName: cases.country,
		countryPopulation: cases.population,
		countryKmArea: cases.sq_km_area,
		contagions: cases.confirmed,
		recovered: cases.recovered,
		deaths: cases.deaths,
		vaccinated: vaccines?.people_vaccinated,
		partialVaccinated: vaccines?.people_partially_vaccinated,
	};

	if (vaccines)
		state.data.vaccinatedPercentage =
			(state.data.vaccinated / state.data.countryPopulation) * 100;

	state.data.mortalityRate = (state.data.deaths / state.data.contagions) * 100;
	state.data.infectionsPerThousand =
		(state.data.contagions / state.data.countryPopulation) * 1000;
	state.data.infectionsPerKm = state.data.contagions / state.data.countryKmArea;
};

const storeCache = function () {
	localStorage.setItem("dataCache", JSON.stringify(state.cache));
};

const loadCache = function () {
	const cacheData = JSON.parse(localStorage.getItem("dataCache"));
	if (cacheData) state.cache = cacheData;
};

const getCacheElement = function (id) {
	return state.cache.find(el => el.country === id);
};

const getCountryData = async function (id) {
	try {
		const cacheEl = getCacheElement(id);

		// Found updated item in the cache
		if (cacheEl && Date.now() - cacheEl.time < MS_PER_HOUR) {
			state.data = cacheEl.data;
			return;
		}

		// Found not updated item in the cache
		if (cacheEl && Date.now() - cacheEl.time >= MS_PER_HOUR) {
			const cacheIndex = state.cache.indexOf(cacheEl);
			state.cache.splice(cacheIndex, 1);
		}

		const casesData = await fetchData(`${COVID_API_URL}cases?ab=${id}`);
		const vaccinesData = await fetchData(`${COVID_API_URL}vaccines?ab=${id}`);

		const allCases = casesData.All;
		if (!allCases) {
			state.data = undefined;
			return;
		}
		const allVaccines = vaccinesData.All;

		createDataObject(allCases, allVaccines);
		state.cache.push({ country: id, data: state.data, time: Date.now() });
		storeCache();
	} catch (err) {
		throw err;
	}
};

const getCountryCode = async function (lat, lng) {
	try {
		const countryData = await fetchData(
			`${GEO_API_URL}?latitude=${lat}&longitude=${lng}`
		);

		return countryData.countryCode;
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	loadCache();
};
init();

export { state, getCountryCode, getCountryData };
