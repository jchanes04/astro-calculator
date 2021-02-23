var massElement = document.getElementById("mass")           //
var radiusElement = document.getElementById("radius")       // gets HTML elements to be referenced later, these are the text boxes where numbers are input
var velocityElement = document.getElementById("velocity")   //
var resultElement = document.getElementById("result")       //
var previousMassInput = ""      //
var previousRadiusInput = ""    // keeps track of the user's last valid input
var previousVelocityInput = ""  //

function massElementInput() {
    if (sciNotRegex.test(massElement.value)) {
        previousMassInput = massElement.value   // if input is valid, do nothing to the text in the box and set the variable to what's in the box
    } else {
        massElement.value = previousMassInput   // if the input is not valid, undo what was just inputted by setting back to the last valid value
    }
}

function radiusElementInput() {
    if (sciNotRegex.test(radiusElement.value)) {
        previousRadiusInput = radiusElement.value
    } else {
        radiusElement.value = previousRadiusInput
    }
}

function velocityElementInput() {
    if (sciNotRegex.test(velocityElement.value)) {
        previousVelocityInput = velocityElement.value
    } else {
        velocityElement.value = previousVelocityInput
    }
}

function calculateCV() {
    var result 
    let mass = getMass()
    let radius = getRadius()
    let velocity = getVelocity()
    //console.log(mass.toString())      //
    //console.log(radius.toString())    // for bugtesting
    //console.log(velocity.toString())  //
    
    if (!mass.valid && radius.valid && velocity.valid) {    // check which text box is left empty, solve for that one
        result = velocity.pow(2).multiply(radius).divide(gravitational_constant)
        switch (document.getElementById("mass-units").value) {  // check the units selected for the empty box so the result is displayed in the intended units
            case "kg":
                resultElement.innerHTML = result.toString() + " kg"     // set the contents of the element where results are displayed to the resulting number with units
                break
            case "solar-mass":
                resultElement.innerHTML = result.divide(solar_mass_to_kilograms).toString() + " M<sub>&#8853;</sub>"
                break
        }
    } else if (mass.valid && !radius.valid && velocity.valid) {
        result = gravitational_constant.multiply(mass).divide(velocity.pow(2))
        switch (document.getElementById("radius-units").value) {
            case "m":
                resultElement.innerHTML = result.toString() + " m"
                break
            case "km":
                resultElement.innerHTML = result.divide(1000).toString() + " km"
                break
            case "AU":
                resultElement.innerHTML = result.divide(au_to_meters).toString() + " AU"
                break
            case "ly":
                resultElement.innerHTML = result.divide(ly_to_meters).toString() + " ly"
                break
        }
    } else if (mass.valid && radius.valid && !velocity.valid) {
        result = gravitational_constant.multiply(mass).divide(radius).pow(0.5)
        switch (document.getElementById("velocity-units").value) {
            case "m/s":
                resultElement.innerHTML = result.toString() + " m/s"
                break
            case "mph":
                resultElement.innerHTML = result.divide(mph_to_meters_per_second).toString() + " mph"
                break
            case "c":
                resultElement.innerHTML = result.divide(speed_of_light).toString() + " c"
                break
        }
    }
}

function getMass() {
    let input = new SciNotNumber(massElement.value.split("e")[0], massElement.value.split("e")[1] || 0)     // sets power as 0 if massElement.value.split("e")[1] is undefined or an empty string (both falsy, so second operand is returned)
    if (!input.valid) {
        return SciNotNumber.invalidNumber
    } else {
        switch (document.getElementById("mass-units").value) {  // read value of units and convert input to proper SI/astronomical units for the calculation to be performed
            case "kg":
                return input
            case "solar-mass":
                return input.multiply(solar_mass_to_kilograms)
        }
    }
}

function getRadius() {
    let input = new SciNotNumber(radiusElement.value.split("e")[0], radiusElement.value.split("e")[1] || 0)
    if (!input.valid) {
        return SciNotNumber.invalidNumber
    } else {
        switch (document.getElementById("radius-units").value) {
            case "m":
                return input
            case "km":
                return input.multiply(1000)
            case "AU":
                return input.multiply(au_to_meters)
            case "ly":
                return input.multiply(ly_to_meters)
        }
    }
}

function getVelocity() {
    let input = new SciNotNumber(velocityElement.value.split("e")[0], velocityElement.value.split("e")[1] || 0)
    if (!input.valid) {
        return SciNotNumber.invalidNumber
    } else {
        switch (document.getElementById("velocity-units").value) {
            case "m/s":
                return input
            case "mph":
                return input.multiply(mph_to_meters_per_second)
            case "c":
                return input.multiply(speed_of_light)
        }
    }
}