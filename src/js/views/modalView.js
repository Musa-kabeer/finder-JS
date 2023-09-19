import Views from "./views";

class ModalView extends Views {
  _parentElement = document.querySelector(".overlay");

  render(recipe) {
    this._parentElement.innerHTML = "";

    const markup = this._generateMarkup(recipe);

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  showModal() {
    this._parentElement.classList.remove("hidden");
  }

  //   closeModal(handler) {
  //     this._parentElement.querySelector(".btn--backward").addEventListener(
  //       "click",
  //       () => {
  //         this._parentElement.classList.add("hidden");
  //         handler();
  //       },
  //       true
  //     );
  //   }

  _generateMarkup(recipe) {
    return `
      <div class="modal" style="background-image: url(${
        recipe.image
      });background-position: center;background-size: cover;">
        <div class="top-modal">
          <h3>${recipe.title}<br/>${recipe.publisher}</h3>
          <button class="btn--backward">&LeftArrow;</button>
        </div>
        <div class="bottom-modal">
          <h2>Ingredients</h2>
          <ul class="ingredients-lists">
          ${recipe.ingredients
            .map((ing) => {
              return `
                <li>
                  ● ${ing.description}
                </li>
              `;
            })
            .join("")}
          </ul>
        </div>
      </div>
    `;
  }
}

export default new ModalView();
