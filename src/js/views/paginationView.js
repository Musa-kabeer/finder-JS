import Views from "./views";

class Pagination extends Views {
  _parentElement = document.querySelector(".pagination");

  getRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const target = e.target.dataset.type;

      handler(target);
    });
  }

  currentPage(page, totalPage) {
    this._parentElement.querySelector(".currentPage").textContent = "";

    this._parentElement.querySelector(
      ".currentPage"
    ).textContent = `${page} of ${totalPage}`;
  }
}

export default new Pagination();
