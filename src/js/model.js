import { COVID_API_URL } from "./config.js";
import { fetchData } from "./helpers.js";

import regeneratorRuntime from "regenerator-runtime/runtime.js";

const state = {
	data: {},
};

const getCountryData = async function (id) {
	const casesData = await fetchData(`${COVID_API_URL}cases?ab=${id}`);
	const vaccinesData = await fetchData(`${COVID_API_URL}vaccines?ab=${id}`);

	const allCases = casesData.All;
	const allVaccines = vaccinesData.All;

	state.data = {
		countryName: allCases.country,
		countryPopulation: allCases.population,
		countryKmArea: allCases.sq_km_area,
		contagions: allCases.confirmed,
		recovered: allCases.recovered,
		deaths: allCases.deaths,
		vaccinated: allVaccines.people_vaccinated,
		partialVaccinated: allVaccines.people_partially_vaccinated,
	};
	state.data.vaccinatedPercentage =
		(state.data.vaccinated / state.data.countryPopulation) * 100;
	state.data.mortalityRate = (state.data.deaths / state.data.contagions) * 100;
	state.data.infectionsPerThousand =
		(state.data.contagions / state.data.countryPopulation) * 1000;
	state.data.infectionsPerKm = state.data.contagions / state.data.countryKmArea;
};

export { state, getCountryData };
