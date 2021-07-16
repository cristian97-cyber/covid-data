import { icons } from "../../img/icons.svg";

class View {
	_data;

	render(data) {
		this._data = data;
	}

	renderSpinner() {
		const markup = `
			<div class="spinner">
				<svg class="spinner__icon">
					<use href="${icons}#icon-info_outline"></use>
				</svg>
			</div>
		`;

		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}
}

export { View };
