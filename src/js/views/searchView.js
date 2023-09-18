class SearchView {
  _parentEl = document.querySelector("form");

  getQuery() {
    const query = this._parentEl.querySelector(".search_input").value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    return (this._parentEl.querySelector(".search_input").value = "");
  }

  addHandleSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchView();
