import{API_URL, PAGE_FOR_RESULT, KEY} from './config.js';
import {  AJAX } from './helper.js';

export const state = {
    recipe:{},
    search:{
      query: "",
      results: [],
      page: 1,
      pageForResult: PAGE_FOR_RESULT,
    },
    bookmark: [],
}
  const createObjectRecipe = function(data){
    const{recipe} = data.data;
       return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        // recipe.serving is undefined into Api then I give 4 number; 
        servings: recipe.serving = 4 ,
        sourceUrl: recipe.source_url,
        //is a algoritm for use key or not depending whether or not necessary
        ...(recipe.key && {key:recipe.key})
      }
  }

export const getRecipe = async function (id) {
     try{
     const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
      state.recipe = createObjectRecipe(data);
    

      if(state.bookmark.some(bookmark => bookmark.id === id))
        state.recipe.bookmarked = true; 
      else{state.recipe.bookmarked = false};

}catch(err){
    alert(err)
    
}
}

export const searchResult = async function (query){
  try{
    state.search.query= query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
       return {
         id: rec.id,
         image: rec.image_url,
         publisher: rec.publisher,
         title: rec.title,
         ...(rec.key && {key:rec.key})
      }
        })
        state.search.page = 1;
  }catch(err){
    console.error(err);
  }
}

/*function to slice the results of resultVista*/
export const getResultPage = function(page = state.search.page){
state.search.page = page;
  const start = (page - 1) * state.search.pageForResult;
  const end = page * state.search.pageForResult;
  return state.search.results.slice(start, end);

}
export const updateServing = function(newServing){
state.recipe.ingredients.forEach(ing =>{
  ing.servings = 4
  ing.quantity = (ing.quantity * newServing ) / state.recipe.servings ;

});

 state.recipe.servings = newServing;

}
export const PersistBookmark = function(){
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark))
}

export const addBookmark = function(recipe){
state.bookmark.push(recipe);

if(recipe.id === state.recipe.id) state.recipe.bookmarked= true;
  PersistBookmark()

}

export const deleteBookmark = function(id){
  //delete bookmark
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);

  //current recipe as not bookmark
  if(id === state.recipe.id) state.recipe.bookmarked = false;
  PersistBookmark()

}

const init = function(){
  const storage = localStorage.getItem('bookmark')
  if(storage) state.bookmark = JSON.parse(storage)
}

init()
console.log(state.bookmark)

// using when I'm working in the app development.
const clearBookmark = function(){
  localStorage.clear('bookmark')
}
//clearBookmark()

export const uploadRecipe = async function(newRecipe){
  try{

    const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry [1]!== '')
    .map(ing =>{
      //const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim());
      if(ingArr.length !== 3)
        throw new Error('Something is wrong. Try again, Please');

      const [quantity, unit, description ] = ingArr;
      
      return {quantity:quantity ? +quantity : null, unit, description} ;
      
    })
      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
         
      };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
    state.recipe = createObjectRecipe(data);
    addBookmark(state.recipe)

  }catch(err){
    throw err 
  }
  
}