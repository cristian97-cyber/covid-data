import icons from "../../img/icons.svg";

class View {
	_data;

	render(data) {
		this._data = data;
		if (!data) return;

		const markup = this._renderMarkup();
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderSpinner() {
		const markup = `
			<div class="spinner">
				<svg class="spinner__icon">
					<use href="${icons}#icon-spinner9"></use>
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
