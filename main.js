module.exports = class Tracker { 

    constructor(time=300000) {
        this.collection = {} 
        this.fiveMinutes = time; // Default to 5 minutes, but allow TDD to override
    } 
    addDataPoint(n) {

        const rightNow = new Date().getTime();
        if ( this.collection.hasOwnProperty( rightNow ) ) {
            this.collection[rightNow].push(n)
        } else {
            this.collection[rightNow] = []
            this.collection[rightNow].push(n)
        }
    }
    
    getAverage() { 
        // get the average of the last 5 minutes        
        const rightNow = new Date().getTime();
        let total = 0;
        let count = 0;
        // trim the collection to the last 5 minutes
        for ( const k in this.collection ) {
            if ( k < rightNow - this.fiveMinutes ) {
                delete this.collection[k];
            } else {
                count += this.collection[k].length
                for ( const i in this.collection[k] ) {
                    total += this.collection[k][i]
                }
            }
        }
        return total / count; 
    }
}
