var velocityElement = document.getElementById("velocity")
var redshiftElement = document.getElementById("redshift")
var resultElement = document.getElementById("result")
var previousVelocityInput = ""
var previousRedshiftInput = ""

function velocityElementInput() {
    if (sciNotRegex.test(velocityElement.value)) {
        previousVelocityInput = velocityElement.value
    } else {
        velocityElement.value = previousVelocityInput
    }
}

function redshiftElementInput() {
    if (sciNotRegex.test(redshiftElement.value)) {
        previousRedshiftInput = redshiftElement.value
    } else {
        redshiftElement.value = previousRedshiftInput
    }
}

function calculateRDS() {
    var result
    let velocity = getVelocity()
    let redshift = getRedshift()

    if (velocity.valid && !redshift.valid) {
        let ratio = velocity.divide(speed_of_light)
        let one = new SciNotNumber(1, 0)
        result = (ratio.add(1).divide(one.subtract(ratio))).pow(0.5).subtract(one)
        resultElement.innerText = result
    } else if (!velocity.valid && redshift.valid) {
        let aSquared = redshift.add(1).pow(2)
        console.log(aSquared.toString())
        result = aSquared.subtract(1).divide(aSquared.add(1)).multiply(speed_of_light)
        console.log(result.toString())
        switch (document.getElementById("velocity-units").value) {
            case "m/s":
                resultElement.innerText = result + " m/s"
                break
            case "mph": 
                resultElement.innerText = result.divide(mph_to_meters_per_second) + " mph"
                break
            case "c":
                resultElement.innerText = result.divide(speed_of_light) + " c"
                break
        }
    }
}

function getVelocity() {
    let input = new SciNotNumber(velocityElement.value.split("e")[0], velocityElement.value.split("e")[1] || 0)
    if (input === null) {
        return null
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

function getRedshift() {
    return new SciNotNumber(redshiftElement.value.split("e")[0], redshiftElement.value.split("e")[1] || 0)
}