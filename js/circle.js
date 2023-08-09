

(function() {
    "use strict";

    // create a circle object
    var circle = {
        radius: 3,
        area: 0,

        getArea: function () {
            // TODO: complete this method
            // hint: area = pi * radius^2
            let areaCalc = Math.PI * (Math.pow(this.radius, 2));
            this.area = areaCalc;
            // TODO: return the proper value
            return areaCalc;

        },

        logInfo: function (doRounding) {
            // TODO: complete this method.
            // console.log("The area calculated from getArea is this exact variable: " + this.area);
            // If doRounding is true, round the result to the nearest integer.
            // Otherwise, output the complete value
            let areaOfCircle = this.getArea();
            if (doRounding) {
                // this means we need to use the getArea method to retrieve the area and round it
                areaOfCircle = Math.round(areaOfCircle);

            console.log("Area of a circle with radius: " + this.radius + ", is: " + areaOfCircle);
        } else {
                console.log(areaOfCircle)
            }
    }}

    // log info about the circle
    console.log("Raw circle information");
    circle.logInfo(false);
    console.log("Circle information rounded to the nearest whole number");
    circle.logInfo(true);

    console.log("=======================================================");
    // TODO: Change the radius of the circle to 5.
    circle.radius = 5;
    // log info about the circle
    console.log("Raw circle information");
    circle.logInfo(false);
    console.log("Circle information rounded to the nearest whole number");
    circle.logInfo(true);
})();