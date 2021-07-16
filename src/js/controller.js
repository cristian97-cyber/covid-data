import * as model from "./model.js";
import dataView from "./view/dataView.js";
import mapView from "./view/mapView.js";

import regeneratorRuntime from "regenerator-runtime/runtime.js";

const controlMapClick = async function (countryId) {
	try {
		dataView.renderSpinner();

		await model.getCountryData(countryId);
		dataView.render(model.state.data);
	} catch (err) {
		console.log(err);
	}
};

const init = function () {
	mapView.addHandlerMapClick(controlMapClick);
};
init();
