import * as model from './module.js';
import recipeView from './recipeViews/recViews.js';
import searchWiev from './recipeViews/searchWiev.js';
import resultVista from './recipeViews/resultVista';
import paginasVista from './recipeViews/paginasVista.js';
import bookmarkView from './recipeViews/bookmarkView.js'; 
import addRecipeView from './recipeViews/addRecipeView.js'; 

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarkView from './recipeViews/bookmarkView.js';
import { TIME_OUT } from './config.js';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    resultVista.update(model.getResultPage());

    await model.getRecipe(id);
    const { recipe } = model.state;
    /*==========Rendering recipe=================*/
    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmark);
  

  } catch (err) {
    recipeView.renderErrorMessage();
  }
};
const controlResult = async function () {
  try {
    const query = searchWiev.getQuery();
    if (!query) return;
    await model.searchResult(query);
    /*before
    resultVista.render(model.state.search.results)
    NOW*/
    resultVista.render(model.getResultPage());

    /*render  pages of results*/
    paginasVista.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPaginas = function (goToPage) {
  /* render new results of page*/
  resultVista.render(model.getResultPage(goToPage));

  /*render button of  new page of result*/
  paginasVista.render(model.state.search);
};
const controlServings = function (newServing) {
  //upddate state servings
  model.updateServing(newServing);
  //update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe
  recipeView.update(model.state.recipe);
  // render bookmark
  bookmarkView.render(model.state.bookmark)
};
const controlBookmark = function(){
  bookmarkView.render(model.state.bookmark);
}
const controlAddRecipe = async function(newRecipe){
try{
  //render the spinner for waiting the loading
addRecipeView.renderSpinner()
await model.uploadRecipe(newRecipe);

//render the recipe
recipeView.render(model.state.recipe)
// render  message of success upload
addRecipeView.renderMessage()
//obtaining of last id
window.history.pushState(null,'', `${model.state.recipe.id}`)

setTimeout(function(){
  addRecipeView.toggleWindow()
},  TIME_OUT * 1000)

}catch(err){
  console.error(err)
addRecipeView.renderErrorMessage(err.message)
}
}

const init = function () {
  bookmarkView.addHandlerBookmark(controlBookmark)
  recipeView.handRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchWiev.addhandlerSearch(controlResult);
  paginasVista.addHandlerClik(controlPaginas);
  addRecipeView.addhandlerUpload(controlAddRecipe)
};
init();
