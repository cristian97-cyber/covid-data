import { COVID_API_URL } from "./config.js";
import { fetchData } from "./helpers.js";

import regeneratorRuntime from "regenerator-runtime/runtime.js";

const state = {
	data: undefined,
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

const getCountryData = async function (id) {
	try {
		const casesData = await fetchData(`${COVID_API_URL}cases?ab=${id}`);
		const vaccinesData = await fetchData(`${COVID_API_URL}vaccines?ab=${id}`);

		const allCases = casesData.All;
		if (!allCases) {
			state.data = undefined;
			return;
		}
		const allVaccines = vaccinesData.All;

		createDataObject(allCases, allVaccines);
	} catch (err) {
		throw err;
	}
};

export { state, getCountryData };
