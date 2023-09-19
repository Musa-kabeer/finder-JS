import { API, NUM_PER_PAGE, TIMEOUT_PER_SEC } from "./config";
import { timeout } from "./helper";

export const state = {
  recipes: {
    results: [],
    numOfResults: NUM_PER_PAGE,
    page: 1,
    numPage: null,
  },
};

export const searchRecipes = async (query) => {
  try {
    const res = await Promise.race([
      fetch(`${API}?search=${query}`),
      timeout(TIMEOUT_PER_SEC),
    ]);

    const data = await res.json();

    let { recipes } = data.data;

    recipes = recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
      };
    });

    state.recipes.results = recipes;
  } catch (err) {
    throw err;
  }
};

export const searchPageReturnPages = (page = 1) => {
  const start = (page - 1) * state.recipes.numOfResults;
  const end = page * state.recipes.numOfResults;

  state.recipes.page = page;

  state.recipes.numPage = Math.ceil(
    state.recipes.results.length / state.recipes.numOfResults
  );

  return state.recipes.results.slice(start, end);
};

export const searchRecipe = async (id) => {
  try {
    const res = await fetch(`${API}${id}`);

    const data = await res.json();

    let recipe = data.data.recipe;

    recipe = {
      image: recipe.image_url,
      title: recipe.title,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
    };

    return recipe;
  } catch (err) {
    throw err;
  }
};
