import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import searchView from "./views/searchView";
import recipesResultsView from "./views/recipesResultsView";
import paginationView from "./views/paginationView";
import modalView from "./views/modalView";

const searchHandler = async () => {
  const query = searchView.getQuery();

  // if there is no query return
  if (!query) return;

  // Render Spinner while Loading
  recipesResultsView.spinner();

  // Get the recipes corresponding to our query using the model
  await model.searchRecipes(query);

  if (model.searchPageReturnPages().length === 0) {
    return recipesResultsView.message();
  }

  // render results
  recipesResultsView.render(model.searchPageReturnPages());

  // Update pagination
  paginationView.currentPage(
    model.state.recipes.page,
    model.state.recipes.numPage
  );
};

const controlPagination = (target) => {
  const recipe = model.state.recipes;

  if (target === "next" && recipe.numPage > recipe.page) {
    recipesResultsView.render(model.searchPageReturnPages(recipe.page + 1));
    return paginationView.currentPage(recipe.page, recipe.numPage);
  }

  if (target === "next" && recipe.numPage === recipe.page) {
    return alert(
      "This is the last page 😫. Please move to the previous page for recipe."
    );
  }

  if (target === "prev" && recipe.page > 1) {
    recipesResultsView.render(model.searchPageReturnPages(recipe.page - 1));
    return paginationView.currentPage(recipe.page, recipe.numPage);
  }

  if (target === "prev" && recipe.page === 1) {
    return alert(
      "This is the first page 😫. Please move to the next page for more recipes."
    );
  }
};

const controlRecipe = async () => {
  try {
    // Get ID from url
    const id = window.location.hash.split("#").at(-1);

    const recipe = await model.searchRecipe(id);

    // Show Modal
    modalView.showModal();

    // Render Contents on Modal
    modalView.render(recipe);
  } catch (error) {
    console.log(error);
  }
};

// const controlModal = () => {
//   console.log("Close Modal");
// };

const init = () => {
  searchView.addHandleSearch(searchHandler);
  paginationView.getRecipe(controlPagination);
  // modalView.closeModal(controlModal);
};

init();

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipe)
);
