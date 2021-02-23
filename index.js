const fs = require("fs")    // filesystem, used to read and write to files
const SciNotNumber = require('./SciNotNumber')
const sciNotInputRegex = /^[0-9]*\.?[0-9]*(e[0-9]*)?$/   // tests valid numerical input
const sciNotVerifyRegex = /^[0-9]+(?:\.[0-9]+)?(e[0-9]+)?$/
const DMSInputRegex = /^(?:[0-9]*?|([0-9]*\.?[0-9]*))[\xB0d]?(?:[0-9]*?|([0-9]*\.?[0-9]*))[\'m]?(?:[0-9]*?|([0-9]*\.?[0-9]*))[\"s]?$/
const DMSVerifyRegex = /^([0-9]+(?:\.[0-9]+)?[\xB0d])?([0-9]+(?:\.[0-9]+)?[\'m])?([0-9]+(?:\.[0-9]+)?[\"s])?$/
const radianInputRegex = /^([0-9]*\.?[0-9]*)|([0-9]*\/[0-9]*)[pπ]?$/
const radianVerifyRegex = /^([0-9]+\/[0-9]+)|([0-9]+(?:\.[0-9]+)?)[pπ]?$/

const PI = 3.1415926535
const gravitational_constant = new SciNotNumber(6.6743, -11)
const speed_of_light = new SciNotNumber(3, 8)

const miles_to_meters = new SciNotNumber(1.60934, 3)
const mph_to_meters_per_second = new SciNotNumber(4.4704, -1)
const solar_mass_to_kilograms = new SciNotNumber(1.99, 30)
const au_to_pc = new SciNotNumber(4.84184, -6)
const au_to_meters = new SciNotNumber(1.5, 11)
const ly_to_pc = new SciNotNumber(3.06601, -1)
const ly_to_meters = new SciNotNumber(9.46, 15)
const meters_to_pc = new SciNotNumber(3.2408, -17)

function getFormulaPage(page) {     // called when a new formula page needs to be loaded
    let pageHTML = fs.readFileSync("./formula_pages/" + page + ".html")     
    document.getElementById("main").innerHTML = pageHTML    // fetches HTML and insterts inside the div with ID "main"
    let scriptHTML = fs.readFileSync("./formula_pages/" + page + ".js")
    let scriptElement = document.createElement("script")
    scriptElement.innerHTML = scriptHTML
    document.head.appendChild(scriptElement)    // fetches JS and insters inside the head of the document
}