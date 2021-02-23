//const SciNotNumber = require("../SciNotNumber")

var angleElement = document.getElementById("angle")
var distanceElement = document.getElementById("distance")
var resultElement = document.getElementById("result")
var previousAngleInput = ""
var previousDistanceInput = ""

function angleElementInput() {
    let units = document.getElementById("angle-units").value
    if (units === "arcseconds" || units === "deg") {
        if (sciNotInputRegex.test(angleElement.value)) {
            previousAngleInput = angleElement.value
        } else {
            angleElement.value = previousAngleInput
        }
    } else if (units === "DMS") {
        angleElement.value = angleElement.value.replaceAll("d", "°").replaceAll("m", "'").replaceAll("s", '"')
        if (DMSInputRegex.test(angleElement.value)) {
            previousAngleInput = angleElement.value
        } else {
            angleElement.value = previousAngleInput
        }
    } else if (units === "rad") {
        if (radianInputRegex.test(angleElement.value)) {
            previousAngleInput = angleElement.value
        } else {
            angleElement.value = previousAngleInput
        }
    }
}

function distanceElementInput() {
    if (sciNotInputRegex.test(distanceElement.value)) {
        previousDistanceInput = distanceElement.value
    } else {
        distanceElement.value = previousDistanceInput
    }
}

function angleUnitsChange() {
    previousAngleInput = ""
    angleElementInput()
}

function calculateParallax() {
    var result
    let angle = getAngle()
    let distance = getDistance()
    console.dir(angle)
    console.dir(distance)

    if (angle.valid && !distance.valid) {
        result = angle.pow(-1)
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
    } else if (!angle.valid && distance.valid) {
        result = distance.pow(-1)
        switch (document.getElementById("angle-units").value) {
            case "arcseconds":
                resultElement.innerHTML = result.toString() + " as"
                break
            case "DMS":
                console.dir(result)
                let deg = result.divide(3600).floor()
                let min = result.mod(3600).divide(60).floor()
                let sec = result.mod(60)
                console.dir(deg)
                console.dir(min)
                console.dir(sec)
                resultElement.innerHTML = deg.toString() + "°" + min.toString() + "'" + sec.toString() + '"'
                break
            case "deg":
                resultElement.innerHTML = result.divide(3600).toString() + "°"
                break
            case "rad":
                resultElement.innerHTML = result.multiply(4.84814e-6).toString() + " rad"
                break
        }
    }
}

function getAngle() {
    let input = angleElement.value
    switch (document.getElementById("angle-units").value) {
        case "arcseconds":
            return new SciNotNumber(input, 0)
        case "deg":
            return new SciNotNumber(parseFloat(input) * 3600, 0)
        case "rad":
            let radianMatch = radianVeriyRegex.exec(input)
            if (radianMatch === null) return SciNotNumber.invalidNumber
            if (radianMatch[1] !== undefined) {
                let num = radianMatch[1].split("/")[0]
                let den = radianMatch[1].split("/")[1]
                return new SciNotNumber(20 * (parseFloat(num) / parseFloat(den)) / PI, 0)
            } else if (radianMatch[2] !== undefined) {
                return new SciNotNumber(radianMatch[2], 0)
            }
        case "DMS":
            let DMSMatch = DMSVerifyRegex.exec(input)
            if (DMSMatch === null || input === "") return SciNotNumber.invalidNumber
            console.dir(DMSMatch)
            let deg = parseFloat(DMSMatch[1]) || 0
            let min = parseFloat(DMSMatch[2]) || 0
            let sec = parseFloat(DMSMatch[3]) || 0
            return new SciNotNumber(deg * 3600 + min * 60 + sec, 0)
    }
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