class SciNotNumber {
    constructor(decimals, power) {
        var decimalsTemp, powerTemp
        var addToPower = 0
        
        if (decimals === '') {
            this.valid = false
            return
        } else if (typeof decimals === "string") {
            decimalsTemp = parseFloat(decimals)
        } else if (typeof decimals === "number") {
            decimalsTemp = decimals
        } else {
            this.valid = false
            return
        }

        if (power === '') {
            this.valid = false
            return
        } else if (typeof power === "string") {
            powerTemp = parseInt(power)
        } else if (typeof power === "number" && Number.isInteger(power)) {
            powerTemp = power
        } else if (typeof power === "number") {
            powerTemp = Math.floor(power)
            decimalsTemp *= Math.pow(10, (power - Math.floor(power)))
        } else {
            this.valid = false
            return
        }

        if (decimalsTemp > 1) {
            while (decimalsTemp / 10**addToPower > 10) {
                addToPower++
            }
            this.decimals = decimalsTemp / 10**addToPower
        } else {
            while (decimalsTemp / 10**addToPower < 1) {
                addToPower--
            }
            this.decimals = decimalsTemp / 10**addToPower
        }

        this.power = powerTemp + addToPower
        if (this.decimals !== NaN && this.power !== NaN) {
            this.valid = true
        }
    }

    static invalidNumber = new SciNotNumber()

    toString(places) {
        return this.valid ? `${this.decimals?.toFixed(places || 3)}e${this.power}` : "invalid"
    }

    toNumber() {
        return this.decimals * 10**this.power
    }

    add(number) {
        var numberTemp
        if (number instanceof SciNotNumber) {
            if (number.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "number" || typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        } else {
            return null
        }
        let powerDifference = numberTemp.power - this.power
        let decimalsTemp = this.decimals + numberTemp.decimals * 10**powerDifference
        return new SciNotNumber(decimalsTemp, this.power)
    }

    subtract(number) {
        var numberTemp
        if (number instanceof SciNotNumber) {
            if (number.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "number" || typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        } else {
            return null
        }
        let powerDifference = numberTemp.power - this.power
        let decimalsTemp = this.decimals - numberTemp.decimals * 10**powerDifference
        return new SciNotNumber(decimalsTemp, this.power)
    }

    multiply(number) {
        var numberTemp
        if (number instanceof SciNotNumber) {
            if (number.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "number" || typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        } else {
            return null
        }
        let newPower = this.power + numberTemp.power
        let decimalsTemp = this.decimals * numberTemp.decimals
        return new SciNotNumber(decimalsTemp, newPower)
    }

    divide(number) {
        var numberTemp
        if (number instanceof SciNotNumber) {
            if (number.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "number" || typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        } else {
            return null
        }
        let newPower = this.power - numberTemp.power
        let decimalsTemp = this.decimals / numberTemp.decimals
        return new SciNotNumber(decimalsTemp, newPower)
    }

    pow(number) {
        var numberTemp
        if (typeof number === "number") {
            return new SciNotNumber(this.decimals**number, this.power * number)
        } else if (number instanceof SciNotNumber) {
            if (number.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        }
        return new SciNotNumber(this.decimals**numberTemp.toNumber(), this.power * numberTemp.toNumber())
    }

    floor() {
        return new SciNotNumber(Math.floor(this.toNumber()), 0)
    }

    ceil() {
        return new SciNotNumber(Math.ceil(this.toNumber()), 0)
    }

    mod(number) {
        var numberTemp
        if (typeof number === "number") {
            return new SciNotNumber(this.decimals**number, this.power * number)
        } else if (number instanceof SciNotNumber) {
            if (number.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        }
        let divided = this.divide(numberTemp)
        return new SciNotNumber(this.subtract(divided.floor().multiply(this)), 0)
    }
}

module.exports = SciNotNumber