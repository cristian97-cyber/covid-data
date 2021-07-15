import * as model from "./model.js";
import mapView from "./view/mapView.js";

import regeneratorRuntime from "regenerator-runtime/runtime.js";

const controlMapClick = async function (countryId) {
	await model.getCountryData(countryId);
};

const init = function () {
	mapView.addHandlerMapClick(controlMapClick);
};
init();
