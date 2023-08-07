(function () {
    "use strict";

    var planetsString = "Mercury|Venus|Earth|Mars|Jupiter|Saturn|Uranus|Neptune";
    var planetsArray;

    /**
     * TODO:
     * Convert planetsString to an array, and save it in a variable named
     * planetsArray.
     * console.log planetsArray to check your work
     */

    planetsArray = planetsString.split("|");

    console.log(planetsArray);

    /**
     * TODO:
     * Create a string with <br> tags between each planet. console.log() your
     * results. Why might this be useful?
     *
     * BONUS:
     * Create another string that would display your planets in an undordered
     * list. You will need an opening AND closing <ul> tags around the entire
     * string, and <li> tags around each planet.
     */

    var planetsStringBreak = "Mercury<br>Venus<br>Earth<br>Mars<br>Jupiter<br>Saturn<br>Uranus<br>Neptune";
    console.log(planetsStringBreak);

    var planetsStringUnorderedList = "<ul>\n" + "        <li>Mercury</li>\n" + "        <li>Venus</li>\n" + "        <li>Earth</li>\n" + "        <li>Mars</li>\n" + "        <li>Jupiter</li>\n" + "        <li>Saturn</li>\n" + "        <li>Uranus</li>\n" + "        <li>Neptune</li>\n" + "    </ul>";

    console.log(planetsStringUnorderedList);

})();