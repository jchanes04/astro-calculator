var wavelengthElement = document.getElementById("wavelength")
var temperatureElement = document.getElementById("temperature")
var resultElement = document.getElementById("result")
var previousWavelengthInput = ""
var previousTemperatureInput = ""

function wavelengthElementInput() {
    if (sciNotRegex.test(wavelengthElement.value)) {
        previousWavelengthInput = wavelengthElement.value
    } else {
        wavelengthElement.value = previousWavelengthInput
    }
}

function temperatureElementInput() {
    if (sciNotRegex.test(temperatureElement.value)) {
        previousTemperatureInput = temperatureElement.value
    } else {
        temperatureElement.value = previousTemperatureInput
    }
}

function calculateWL() {
    var result
    let wavelength = getWavelength()
    let temperature = getTemperature()

    if (wavelength.valid && !temperature.valid) {
        let wiensConstant = new SciNotNumber(2.9, 6)
        console.log("test")
        result = wiensConstant.divide(wavelength)
        switch (document.getElementById("wavelength-units").value) {
            case "nm":
                resultElement.innerHTML = result.toString() + " nm"
                break
            case "\u03BCm":
                let x = new SciNotNumber(1,-3)
                resultElement.innerHTML = result.multiply(x).toString() + " \u03BCm"
                break
            case "mm":
                let x = new SciNotNumber(1,-6)
                resultElement.innerHTML = result.multiply(x).toString() + " mm"
                break
            case "m":
                let x = new SciNotNumber(1,-9)
                resultElement.innerHTML = result.multiply(x).toString() + " m"
                break
            case "km":
                let x = new SciNotNumber(1,-12)
                resultElement.innerHTML = result.multiply(x).toString() + " km"
                break
            case "\u212B":
                let x = new SciNotNumber(1,1)
                resultElement.innerHTML = result.multiply(x).toString() + " \u212B"
                break
        }
    } else if (!wavelength.valid && temperature.valid) {
        let wiensConstant = new SciNotNumber(2.9, 6)
        result = wiensConstant.divide(temperature)
        switch (document.getElementById("temperature-units").value) {
            case "\u2103K":
                resultElement.innerText = result + " \u2103K"
                break
            case "\u2103C": 
                resultElement.innerText = result.subtract(273.15) + " \u2103C"
                break
            case "\u2103F":
                resultElement.innerText = result.subtract(273).multiply(1.8).add(32) + " \u2103F"
                break
        }
    }
}

function getWavelength() {
    let input = new SciNotNumber(wavelengthElement.value.split("e")[0], wavelengthElement.value.split("e")[1] || 0)
    if (input === null) {
        return null
    } else {
        switch (document.getElementById("wavelength-units").value) {
            case "nm":
                return input
            case "\u03BCm":
                let x = new SciNotNumber(1,3)
                return input.multiply(x)
            case "mm":
                let x = new SciNotNumber(1,6)
                return input.multiply(x)
            case "m":
                let x = new SciNotNumber(1,9)
                return input.multiply(x)
            case "km":
                let x = new SciNotNumber(1,12)
                return input.multiply(x)
            case "\u212B":
                let x = new SciNotNumber(1,-1)
                return input.multiply(x)
        }
    }
}

function getTemperature() {
    let input = new SciNotNumber(temperatureElement.value.split("e")[0], temperatureElement.value.split("e")[1] || 0)
    if (input === null) {
        return null
    } else {
        switch (document.getElementById("temperature-units").value) {
            case "\u2103K":
                return input
            case "\u2103C":
                return input.add(273.15)
            case "\u2103F":
                return input.subtract(32).divide(1.8).add(273.15)
        }
    }
}