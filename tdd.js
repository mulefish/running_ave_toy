const Tracker =  require("./main.js");

const verdict = (a, b, msg ) => {
    let verdict = "FAIL: "
    if ( a === b ) {
        verdict = "PASS: "
    }
    console.log( verdict + msg + "    " + a )
} 

const happyPath_test = () => { 
    const t = new Tracker() 

    t.addDataPoint(2)
    t.addDataPoint(3)
    t.addDataPoint(4)

    const ave = t.getAverage()
    verdict(3,ave,"happyPath_test")
} 


function delay(milsec) {
    console.log("PAUSE for " + milsec + " milliseconds" )
    return new Promise(resolve => setTimeout(resolve, milsec));
  }

const getAverage_test = () => { 
    const t = new Tracker(2000) // Set the time window to 2 seconds ( rather than 5 minutes ))  
    // These should not be counted...  ( too old )
    for ( let i = 0 ; i < 10 ; i++ ) {
        t.addDataPoint(100)
    }
    delay(4000)
    .then(() => {

        // These should be counted... ( still in the window )
        for ( let i = 0 ; i < 10 ; i++ ) {
            t.addDataPoint(2)
        }
    })
    .then(() => t.getAverage())
    .then(()=>{
        verdict(2,t.getAverage(),"getAverage_test")
    })
} 

function main() {
    happyPath_test()
    getAverage_test()
}
main()