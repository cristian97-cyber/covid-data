import icons from "../../img/icons.svg";

class View {
	_data;

	render(data) {
		this._data = data;
		if (!data) {
			this.renderMessage(
				"There is no data available for the selected country."
			);
			return;
		}

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

	renderMessage(text, isError = false) {
		const markup = `
			<div class="message">
				<svg class="message__icon">
					<use href="${icons}#${isError ? "icon-warning" : "icon-info_outline"}"></use>
				</svg>
				<p class="message__text">${text}</p>
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
