var absMagnitudeElement = document.getElementById("abs-magnitude")
var appMagnitudeElement = document.getElementById("app-magnitude")
var distanceElement = document.getElementById("distance")
var resultElement = document.getElementById("result")
var previousAbsMagnitudeInput = ""
var previousAppMagnitudeInput = ""
var previousDistanceInput = ""

function absMagnitudeInput() {
    if (sciNotInputRegex.test(absMagnitudeElement.value)) {
        previousAbsMagnitudeInput = absMagnitudeElement.value
    } else {
        absMagnitudeElement.value = previousAbsMagnitudeInput
    }
}

function appMagnitudeInput() {
    if (sciNotInputRegex.test(appMagnitudeElement.value)) {
        previousAppMagnitudeInput = appMagnitudeElement.value
    } else {
        appMagnitudeElement.value = previousAppMagnitudeInput
    }
}

function distanceInput() {
    if (sciNotInputRegex.test(distanceElement.value)) {
        previousDistanceInput = distanceElement.value
    } else {
        distanceElement.value = previousDistanceInput
    }
}

function calculateDM() {
    var result
    let absMagnitude = getAbsMagnitude()
    let appMagnitude = getAppMagnitude()
    let distance = getDistance()
    console.dir(absMagnitude)
    console.dir(appMagnitude)
    console.dir(distance)

    if (absMagnitude.valid && appMagnitude.valid && !distance.valid) {
        let ten = new SciNotNumber(1, 1)
        result = ten.pow(appMagnitude.subtract(absMagnitude).add(5).divide(5))
        switch (document.getElementById("distance-units").value) {
            case "pc":
                resultElement.innerHTML = result.toString() + " pc"
                break
            case "ly":
                resultElement.innerHTML = result.divide(ly_to_pc).toString() + " ly"
                break
            case "AU":
                resultElement.innerHTML = result.divide(au_to_pc).toString() + " AU"
                break
            case "km":
                resultElement.innerHTML = result.divide(meters_to_pc).divide(1000).toString() + " km"
                break
            case "m":
                resultElement.innerHTML = result.divide(meters_to_pc).toString() + " m"
                break
        }
    } else if (absMagnitude.valid && !appMagnitude.valid && distance.valid) {
        result = distance.log().multiply(5).subtract(5).add(absMagnitude)
        resultElement.innerHTML = result.toString()
    } else if (!absMagnitude.valid && appMagnitude.valid && distance.valid) {
        result = appMagnitude.add(5).subtract(distance.log().multiply(5))
        resultElement.innerHTML = result.toString()
    }
}

function getAbsMagnitude() {
    return new SciNotNumber(absMagnitudeElement.value.split("e")[0], absMagnitudeElement.value.split("e")[1] || 0)
}

function getAppMagnitude() {
    return new SciNotNumber(appMagnitudeElement.value.split("e")[0], appMagnitudeElement.value.split("e")[1] || 0)
}

function getDistance() {
    let input = new SciNotNumber(distanceElement.value.split("e")[0], distanceElement.value.split("e")[1] || 0)
    if (!input.valid) {
        return SciNotNumber.invalidNumber
    } else {
        switch (document.getElementById("distance-units").value) {
            case "pc":
                return input
            case "ly":
                return input.multiply(ly_to_pc)
            case "AU":
                return input.multiply(au_to_pc)
            case "km":
                return input.multiply(1000).multiply(meters_to_pc)
            case "m":
                return input.multiply(meters_to_pc)
        }
    }
}