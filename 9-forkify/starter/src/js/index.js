import Search from './models/Search';
import Recipe from './models/Recipes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader} from './views/base';

/*Global state of the app 
 - search object
 - current recipe object
 - shopping list object
 - Liked recipes
*/
const state = {

}

/*Search controller*/
const controlSearch = async () => {
    //1 Get query from view
    const query = searchView.getInput();
    console.log(query);

    if(query) {
        //2) new search object and add to state;
        state.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4) Search for recipes
            await state.search.getResults();
            //5) render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error){    
            clearLoader();
            lert('Error processing recipe !');
        }


    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchForm.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});

//event delegation
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/*Recipe controller
const r = new Recipe(47746);
r.getRecipe();
console.log(r);
*/

const controlRecipe = async () => {
    //get id from url
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        try {
            //prepare
            recipeView.clearRecipe();
            renderLoader(elements.recipe);
            //create new recipe
            state.recipe = new Recipe(id);
            //get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //calculate servings and tiime
            state.recipe.calcTime();
            state.recipe.calcServings();
            //render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(error){
            alert('Error processing recipe !');
        }
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));