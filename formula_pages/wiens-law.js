var wavelengthElement = document.getElementById("wavelength")
var temperatureElement = document.getElementById("temperature")
var resultElement = document.getElementById("result")
var previousWavelengthInput = ""
var previousTemperatureInput = ""

function wavelengthElementInput() {
    if (sciNotInputRegex.test(wavelengthElement.value)) {
        previousWavelengthInput = wavelengthElement.value
    } else {
        wavelengthElement.value = previousWavelengthInput
    }
}

function temperatureElementInput() {
    if (sciNotInputRegex.test(temperatureElement.value)) {
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
        console.log("a")
        result = wiens_constant.divide(wavelength)
        switch (document.getElementById("temperature-units").value) {
            case "\u00B0K":
                resultElement.innerText = result.toString() + " \u00B0K"
                break
            case "\u00B0C": 
                resultElement.innerText = result.subtract(273.15).toString() + " \u00B0C"
                break
            case "\u00B0F":
                resultElement.innerText = result.subtract(273).multiply(1.8).add(32).toString() + " \u00B0F"
                break
        }
    } else if (!wavelength.valid && temperature.valid) {
        console.log("b")
        result = wiens_constant.divide(temperature)
        switch (document.getElementById("wavelength-units").value) {
            case "nm":
                resultElement.innerHTML = result.toString() + " nm"
                break
            case "\u00B5m":
                let nmToUm = new SciNotNumber(1,-3)
                resultElement.innerHTML = result.multiply(nmToUm).toString() + " \u00B5m"
                break
            case "mm":
                let nmToMm = new SciNotNumber(1,-6)
                resultElement.innerHTML = result.multiply(nmToMm).toString() + " mm"
                break
            case "m":
                let nmToM = new SciNotNumber(1,-9)
                resultElement.innerHTML = result.multiply(nmToM).toString() + " m"
                break
            case "km":
                let nmToKm = new SciNotNumber(1,-12)
                resultElement.innerHTML = result.multiply(nmToKm).toString() + " km"
                break
            case "\u212B":
                let nmToA = new SciNotNumber(1,1)
                resultElement.innerHTML = result.multiply(nmToA).toString() + " \u212B"
                break
        }
    }
}

function getWavelength() {
    let input = new SciNotNumber(wavelengthElement.value.split("e")[0], wavelengthElement.value.split("e")[1] || 0)
    if (!input.valid) {
        return SciNotNumber.invalidNumber
    } else {
        switch (document.getElementById("wavelength-units").value) {
            case "nm":
                return input
            case "\u00B5m":
                console.log('a')
                let umToNm = new SciNotNumber(1,3)
                console.dir(input.multiply(umToNm))
                return input.multiply(umToNm)
            case "mm":
                let mmToNm = new SciNotNumber(1,6)
                return input.multiply(mmToNm)
            case "m":
                let mToNm = new SciNotNumber(1,9)
                return input.multiply(mToNm)
            case "km":
                let kmToNm = new SciNotNumber(1,12)
                return input.multiply(kmToNm)
            case "\u212B":
                let aToNm = new SciNotNumber(1,-1)
                return input.multiply(aToNm)
        }
    }
}

function getTemperature() {
    let input = new SciNotNumber(temperatureElement.value.split("e")[0], temperatureElement.value.split("e")[1] || 0)
    if (!input.valid) {
        return SciNotNumber.invalidNumber
    } else {
        switch (document.getElementById("temperature-units").value) {
            case "\u00B0K":
                return input
            case "\u00B0C":
                return input.add(273.15)
            case "\u00B0F":
                return input.subtract(32).divide(1.8).add(273.15)
        }
    }
}