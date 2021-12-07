// The purpose of the pearl is to provide a point for the data to collect and crystalize

class Pearl {
    name = "Pearly";
    grains = [];

    constructor () {
        console.log("Creating new pearl");
        if (localStorage.pearl) {
            this.grains = localStorage.pearl;
        } else {
            this.grains = createDefaultPearl();
        }
    }
}