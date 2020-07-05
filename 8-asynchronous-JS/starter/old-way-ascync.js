  //---------------------------------------------------------------------------------------------------------------------
    // Lecture: async old way
    function getRecipe() {
        setTimeout(() => {
            const recipeID = [523, 883, 432, 974];
            console.log(recipeID);

            setTimeout(id => {
                const recipe = {title: 'Fresh tomato pasta', publisher: 'jr'};
                console.log(`${id}: ${recipe.title}`);

                setTimeout(publisher => {
                    const recipe = {title: 'Italian', publisher: 'jr'};
                    console.log(recipe);
                }, 1500, recipe.publisher);

            }, 1000, recipeID[2]);

        }, 1500);
    }    
    getRecipe();