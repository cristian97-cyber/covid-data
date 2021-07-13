import { View } from "./view.js";

import * as am4core from "@amcharts/amcharts4/core.js";
import * as am4maps from "@amcharts/amcharts4/maps.js";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow.js";

class MapView extends View {
	_parentElement = document.querySelector("#map");
	_map;

	constructor() {
		super();

		this._loadMap();
	}

	_loadMap() {
		this._map = am4core.create("map", am4maps.MapChart);
	}
}

export default new MapView();
