import { View } from "./view.js";

class DataView extends View {
	_parentElement = document.querySelector(".sidebar__content");

	_renderMarkup() {
		const nf = new Intl.NumberFormat(navigator.language, {
			maximumFractionDigits: 1,
		});

		return `
            <h2 class="heading--2 u-text-center u-mb-sm">${
							this._data.countryName
						}</h2>
            <h3 class="heading--3 u-mb-sm">Total cases</h3>
			<div class="data u-mb-md">
				<ul class="data__list">
					<li class="data__item">
						<span class="data__item-title">Contagions:</span>
						<span class="data__item-value">${nf.format(this._data.contagions)}</span>
					</li>
					<li class="data__item">
						<span class="data__item-title">Hospitalized:</span>
						<span class="data__item-value">${nf.format(this._data.recovered)}</span>
					</li>
					<li class="data__item">
						<span class="data__item-title">Deaths:</span>
						<span class="data__item-value">${nf.format(this._data.deaths)}</span>
					</li>
				</ul>
			</div>

            <h3 class="heading--3 u-mb-sm">Vaccinated</h3>
			<div class="data u-mb-md">
				<ul class="data__list">
					<li class="data__item">
						<span class="data__item-title">Partial:</span>
						<span class="data__item-value">${nf.format(this._data.partialVaccinated)}</span>
					</li>
					<li class="data__item">
						<span class="data__item-title">Fully:</span>
						<span class="data__item-value">${nf.format(this._data.vaccinated)}</span>
					</li>
					<li class="data__item">
						<span class="data__item-title">Percentage:</span>
						<span class="data__item-value">${nf.format(
							this._data.vaccinatedPercentage
						)}%</span>
					</li>
				</ul>
			</div>

            <h3 class="heading--3 u-mb-sm">Other informations</h3>
			<div class="data u-mb-md">
				<ul class="data__list">
					<li class="data__item">
						<span class="data__item-title">Mortality rate:</span>
						<span class="data__item-value">${nf.format(this._data.mortalityRate)}%</span>
					</li>
					<li class="data__item">
						<span class="data__item-title">Infections per thousand:</span>
						<span class="data__item-value">${nf.format(
							this._data.infectionsPerThousand
						)}</span>
					</li>
					<li class="data__item">
						<span class="data__item-title"
							>Infections per km<sup>2</sup>:</span
						>
						<span class="data__item-value">${nf.format(this._data.infectionsPerKm)}</span>
					</li>
				</ul>
			</div>
        `;
	}
}

export default new DataView();
