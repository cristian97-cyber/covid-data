import { View } from "./view.js";

import * as am4core from "@amcharts/amcharts4/core.js";
import * as am4maps from "@amcharts/amcharts4/maps.js";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow.js";
import am4geodata_data_countries2 from "@amcharts/amcharts4-geodata/data/countries2.js";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz.js";
import am4themes_animated from "@amcharts/amcharts4/themes/animated.js";

class MapView extends View {
	_parentElement = document.querySelector(".map");
	_map;

	constructor() {
		super();

		this._loadMap();
	}

	_loadMap() {
		// Setting theme
		am4core.useTheme(am4themes_dataviz);
		am4core.useTheme(am4themes_animated);

		const continents = {
			AF: 0,
			AN: 1,
			AS: 2,
			EU: 3,
			NA: 4,
			OC: 5,
			SA: 6,
		};

		// Create map instance
		const map = am4core.create(this._parentElement, am4maps.MapChart);
		map.projection = new am4maps.projections.Miller();
		map.responsive.enabled = true;

		// Create map polygon series for world map
		const worldSeries = map.series.push(new am4maps.MapPolygonSeries());
		worldSeries.useGeodata = true;
		worldSeries.geodata = am4geodata_worldLow;
		worldSeries.exclude = ["AQ"];

		const worldPolygon = worldSeries.mapPolygons.template;
		worldPolygon.tooltipText = "{name}";
		worldPolygon.nonScalingStroke = true;
		worldPolygon.strokeOpacity = 0.5;
		worldPolygon.fill = am4core.color("#eee");
		worldPolygon.propertyFields.fill = "color";

		let hs = worldPolygon.states.create("hover");
		hs.properties.fill = map.colors.getIndex(9);

		// Set up data for countries
		const data = [];
		for (let id in am4geodata_data_countries2) {
			if (am4geodata_data_countries2.hasOwnProperty(id)) {
				const country = am4geodata_data_countries2[id];
				if (country.maps.length) {
					data.push({
						id: id,
						color: map.colors.getIndex(continents[country.continent_code]),
						map: country.maps[0],
					});
				}
			}
		}
		worldSeries.data = data;

		// Zoom control
		map.zoomControl = new am4maps.ZoomControl();

		// Home button
		const homeButton = new am4core.Button();
		homeButton.events.on("hit", function () {
			worldSeries.show();
			map.goHome();
		});

		homeButton.icon = new am4core.Sprite();
		homeButton.padding(7, 5, 7, 5);
		homeButton.width = 30;
		homeButton.icon.path =
			"M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
		homeButton.marginBottom = 10;
		homeButton.parent = map.zoomControl;
		homeButton.insertBefore(map.zoomControl.plusButton);

		this._map = map;
	}
}

export default new MapView();
