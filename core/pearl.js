// The purpose of the pearl is to provide a point for the data to collect and crystalize

class Pearl {

    constructor () {
        // console.log("Creating new pearl");

        // Load pearl data

        if (localStorage.pearl) {
            this.grains = JSON.parse(localStorage.pearl);
        } else {
            this.grains = createDefaultPearl();
        }

        // Get information about pearl
        this.size = this.getSize();
        this.message = "GARBO";
        this.name = "Parler";
    }

    getSize = () => {
        return this.grains.length;
    }


}