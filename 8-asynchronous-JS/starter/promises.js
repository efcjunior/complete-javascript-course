    //---------------------------------------------------------------------------------------------------------------------
    // Lecture: promises
    const getIDs = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([523, 883, 432, 974]);
        }, 1500);
    });
    
    const getRecipe = recID => {
        return new Promise((resolve, reject) => {
            setTimeout(id => {
                const recipe = {title: 'Fresh tomato pasta', publisher: 'jr'};
                resolve(`${id}: ${recipe.title}`);
            }, 1500, recID);            
        });
    }

    const getRelated = publisher => {
        return new Promise((resolve, reject) => {
            setTimeout((pub) => {
                const recipe = {title: 'Italian', publisher: 'jr'};
                resolve(recipe);
        }, 1500, publisher);
        });
    }

    getIDs
    .then(IDs => {
        console.log(IDs);
        return getRecipe(IDs[2]);
    })
    .then(recipe => {
        console.log(recipe);
        return getRelated(recipe.publisher);
    })
    .then(publisher => {
        console.log(publisher);
    })
    .catch(error => {
        console.log(error);
    })