import "core-js";
import "regenerator-runtime/runtime";
import * as model from "./model";
import searchView from "./views/searchView";
import recipesResultsView from "./views/recipesResultsView";
import paginationView from "./views/paginationView";

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
  if (
    target === "next" &&
    model.state.recipes.numPage > model.state.recipes.page
  ) {
    recipesResultsView.render(
      model.searchPageReturnPages(model.state.recipes.page + 1)
    );
    return paginationView.currentPage(
      model.state.recipes.page,
      model.state.recipes.numPage
    );
  }

  if (
    target === "next" &&
    model.state.recipes.numPage === model.state.recipes.page
  ) {
    return alert(
      "This is the last page 😫. Please move to the previous page for recipe."
    );
  }

  if (target === "prev" && model.state.recipes.page > 1) {
    recipesResultsView.render(
      model.searchPageReturnPages(model.state.recipes.page - 1)
    );
    return paginationView.currentPage(
      model.state.recipes.page,
      model.state.recipes.numPage
    );
  }

  if (target === "prev" && model.state.recipes.page === 1) {
    return alert(
      "This is the first page 😫. Please move to the next page for more recipes."
    );
  }
};

const init = () => {
  searchView.addHandleSearch(searchHandler);
  paginationView.getRecipe(controlPagination);
};

init();
