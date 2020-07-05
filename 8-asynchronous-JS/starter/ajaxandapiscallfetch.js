//---------------------------------------------------------------------------------------------------------------------
    // Lecture: ajax and apis

    function getWheater(woeid){
        fetch
        (`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
        .then(result => {
            console.log(result);
            return result.json();
        })
        .then(data => {
            const today = data.consolidated_weather[0];
            console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`);
        })
        .catch(error => console.log(error));
    }

    getWheater(2487956);