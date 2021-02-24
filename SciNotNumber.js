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

        if (decimalsTemp < 0) {
            decimalsTemp = decimalsTemp * -1
            this.negative = true
        } else if (decimalsTemp === 0) {
            this.decimals = 0
            this.power = 0
            this.negative = null
            this.valid = true
            return
        } else {
            this.negative = false
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
            while (decimalsTemp / 10**addToPower >= 10) {
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
    static zero = new SciNotNumber(0, 0)

    toString(places) {
        return this.valid ? `${this.negative ? "-" : ""}${this.decimals?.toFixed(places || 3)}e${this.power}` : "invalid"
    }

    toNumber() {
        return this.valid ? (this.negative ? -1 : 1) * this.decimals * 10**this.power : NaN
    }

    add(number) {
        var numberTemp
        if (number instanceof SciNotNumber) {
            if (number.valid && this.valid) {
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
        if (this.negative === numberTemp.negative || this.negative === null || numberTemp.negative === null) {
            let decimalsTemp = this.decimals + numberTemp.decimals * 10**powerDifference
            return new SciNotNumber((this.negative ? -1 : 1) * decimalsTemp, this.power)
        } else {
            let decimalsTemp = this.decimals - numberTemp.decimals * 10**powerDifference
            return new SciNotNumber((this.negative ? -1 : 1) *  decimalsTemp, this.power)
        }
    }

    subtract(number) {
        var numberTemp
        if (number instanceof SciNotNumber) {
            if (number.valid && this.valid) {
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
        if (this.negative === numberTemp.negative || this.negative === null || numberTemp.negative === null) {
            let decimalsTemp = this.decimals - numberTemp.decimals * 10**powerDifference
            return new SciNotNumber((this.negative ? -1 : 1) * decimalsTemp, this.power)
        } else {
            let decimalsTemp = this.decimals + numberTemp.decimals * 10**powerDifference
            return new SciNotNumber((this.negative ? -1 : 1) *  decimalsTemp, this.power)
        }
    }

    multiply(number) {
        var numberTemp
        if (number instanceof SciNotNumber) {
            if (number.valid && this.valid) {
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
        if (this.negative ===  null || numberTemp.negative === null) return SciNotNumber.zero
        return new SciNotNumber((this.negative === numberTemp.negative ? 1 : -1) * decimalsTemp, newPower)
    }

    divide(number) {
        var numberTemp
        if (number instanceof SciNotNumber) {
            if (number.valid && this.valid) {
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
        if (numberTemp.negative === null) return SciNotNumber.invalidNumber
        return new SciNotNumber((this.negative === numberTemp.negative || this.negative === null ? 1 : -1) * decimalsTemp, newPower)
    }

    pow(number) {
        var numberTemp
        if (typeof number === "number") {
            return new SciNotNumber(this.decimals**number, this.power * number)
        } else if (number instanceof SciNotNumber) {
            if (number.valid && this.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        }
        if (Number.isInteger(number.toNumber()) || !this.negative) {
            return new SciNotNumber(this.decimals**numberTemp.toNumber(), this.power * numberTemp.toNumber())
        } else {
            return SciNotNumber.invalidNumber
        }
        
    }

    log() {
        return this.valid ? new SciNotNumber(Math.log10(this.decimals) + this.power, 0) : SciNotNumber.invalidNumber
    }

    ln() {
        return this.valid ? new SciNotNumber(Math.log(this.decimals) + this.power * Math.log(10), 0) : SciNotNumber.invalidNumber
    }

    logb(number) {
        var numberTemp
        if (typeof number === "number") {
            return new SciNotNumber(Math.log(this.decimals) / Math.log(number) + this.power * Math.log(10) / Math.log(number), 0)
        } else if (number instanceof SciNotNumber) {
            if (number.valid && this.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        }
        return new SciNotNumber(Math.log(this.decimals) / number.ln().toNumber() + this.power * Math.log(10) / number.ln().toNumber(), 0)
    }

    floor() {
        return this.valid ? new SciNotNumber(Math.floor(this.toNumber()), 0) : SciNotNumber.invalidNumber
    }

    ceil() {
        return this.valid ? new SciNotNumber(Math.ceil(this.toNumber()), 0) : SciNotNumber.invalidNumber
    }

    mod(number) {
        var numberTemp
        if (typeof number === "number") {
            return new SciNotNumber(this.decimals**number, this.power * number)
        } else if (number instanceof SciNotNumber) {
            if (number.valid && this.valid) {
                numberTemp = number
            } else {
                return SciNotNumber.invalidNumber
            }
        } else if (typeof number === "string") {
            numberTemp = new SciNotNumber(number, 0)
        }
        let divided = this.divide(numberTemp)
        return new SciNotNumber(this.subtract(divided.floor().multiply(numberTemp)), 0)
    }
}

module.exports = SciNotNumber