import Views from "./views";

class RecipesResultsView extends Views {
  _parentEl = document.querySelector(".results");

  spinner() {
    const markup = `
       <div class="spinner">
          <p>Loading....</p>
        </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  message() {
    const markup = `
       <div class="message">
          <p>Try another recipe.No result found for the search recipe. 👏</p>
        </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  render(data) {
    const html = `
       <div class="middle"> 
       ${data.map(this._generateMarkup).join("")}
        </a>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }

  _generateMarkup(recipe) {
    return `
    <a href="#${recipe.id}">
      <div class="recipe">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h1>${recipe.title.split(" ")[0]} ${recipe.title.split(" ")[1]}</h1>
        <p>${recipe.publisher}</p>
      </div>
    </a>
    `;
  }
}

export default new RecipesResultsView();
