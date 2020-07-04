/*

Parks and Streets
commons properties: name, build year;
commons methods: age calculated

park´s properties: area, total of tree;
park´s methods: tree density, average age, list of names by quantity of tree

street´s properties: km length, size classification
street´s methods: total and average of total km length
*/
{
    class TownBuildings {
        constructor(name, buildYear){
            this.name = name;
            this.buildYear = buildYear;
        }

        getAge(){
            return new Date().getFullYear() - this.buildYear;
        }
    }

    class Park extends TownBuildings {
        constructor(name, buildYear, areaTotal, treesTotal){
            super(name, buildYear);
            this.areaTotal = areaTotal;
            this.treesTotal = treesTotal;
        }

        getTreeDensity(){
            return this.treesTotal / this.areaTotal;
        }
    }

    class ParksBuilder {

        getAll(){
            const all = new Map();
            all.set('Green Park',new Park('Green Park', 2000, 150, 10));
            all.set('National Park',new Park('National Park', 2005, 300, 15));
            all.set('Oak Park',new Park('Oak Park', 2010, 600, 10001));
            return all;
        }
    }


    class Street extends TownBuildings {
        constructor(name, buildYear, kmTotal, classification = 'normal'){
            super(name, buildYear);
            this.kmTotal = kmTotal;
            this.classification = classification;
        }
    }

    class StreetsBuilder {

        getAll(){
            const all = new Map();
            all.set('Ocean Avenue',new Street('Ocean Avenue', 1999, 10000, 'big'));
            all.set('Evergreen Street',new Street('Evergreen Street', 2008, 20000, 'smal'));
            all.set('4th Street',new Street('4th Street', 2015, 30000));
            all.set('Sunset Boulevard',new Street('Sunset Boulevard', 1982, 40000, 'huge'));
            return all;
        }
    }

    class StreetsReport {

        constructor (streetBuilder) {
            this.streetBuilder = streetBuilder;
            this.allStreets = this.streetBuilder.getAll();
        }

        calculateKm(){
            let totalKm = 0;
            let avgKm = 0;
            let totalStreets = this.allStreets.size;

            this.allStreets.forEach(street => totalKm += street.kmTotal);
            avgKm = totalKm / totalStreets;

            return {
                total: totalKm,
                average:avgKm
            }
        }

        display(){
            const km = this.calculateKm();
            console.log('------------ STREETS REPORT -----------------');
            console.log(`Our ${this.allStreets.size} streets have a total length of ${km.total} km, with an average of ${km.average} km`);

            for(let [streetName, street] of this.allStreets){
                console.log(`${streetName}, built in ${street.buildYear}, is a ${street.classification} street`);
            }
        }
    }

    class ParksReport {

        constructor (parksBuilder) {
            this.parksBuilder = parksBuilder;
            this.allParks = this.parksBuilder.getAll();
        }

        getParkByTotalTree(total){        
            let result = [...this.allParks].find(([parkName, park]) => park.treesTotal > total);

            if(result !== undefined){
                const [parkname, park] = result;            
                result = park;
            }
            return result;
        }

        calculateAvgAge() {
            let averageAge = 0.0;
            let totalParks = this.allParks.size;
            this.allParks.forEach(park => averageAge = averageAge + (park.getAge() / totalParks));
            return averageAge;
        }

        display(){
            const byTotaltree = 1000;        
            const parkFound = this.getParkByTotalTree(byTotaltree);
            
            console.log('------------ PARKS REPORT -----------------')
            console.log(`Our ${this.allParks.size} parks have an average age of ${this.calculateAvgAge()}`);       

            for(let [parkName, park] of this.allParks.entries()){
                console.log(`${parkName} has a tree density of ${park.getTreeDensity()} trees per square km`);
            }

            if (parkFound !== undefined){
                console.log(`${parkFound.name} has more than ${byTotaltree} trees`);
            }
        }
    }

    const parksReport = new ParksReport(new ParksBuilder());
    parksReport.display();

    const streetsReport = new StreetsReport(new StreetsBuilder());
    streetsReport.display();
}
