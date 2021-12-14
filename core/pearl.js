// The purpose of the pearl is to provide a point for the data to collect and crystalize

class Pearl {
    MESSAGE = "I AM CAPS!";
    name = "Pearly";

    constructor () {
        // console.log("Creating new pearl");

        // Load pearl data
        if (localStorage.pearl) {
            this.grains = localStorage.pearl;
        } else {
            this.grains = createDefaultPearl();
        }

        // Get information about pearl
        this.size = this.getSize();
    }

    getSize = () => {
        return this.grains.length;
    }


}