import * as model from "./model.js";
import dataView from "./view/dataView.js";
import mapView from "./view/mapView.js";

import regeneratorRuntime, { async } from "regenerator-runtime/runtime.js";

const controlMapClick = async function (countryId) {
	try {
		dataView.renderSpinner();

		await model.getCountryData(countryId);
		dataView.render(model.state.data);
	} catch (err) {
		console.error(err);

		dataView.renderMessage(
			"An error occurred while retrieving the data, please try again.",
			true
		);
	}
};

const controlGeolocation = function () {
	if (!navigator.geolocation) {
		dataView.renderMessage("Select a country on the map to see the data.");
		return;
	}

	navigator.geolocation.getCurrentPosition(
		async function (pos) {
			const { latitude: lat, longitude: lng } = pos.coords;
			const countryCode = await model.getCountryCode(lat, lng);

			controlMapClick(countryCode);
		},
		() => dataView.renderMessage("Select a country on the map to see the data.")
	);
};

const init = function () {
	mapView.addHandlerMapClick(controlMapClick);
	controlGeolocation();
};
init();
