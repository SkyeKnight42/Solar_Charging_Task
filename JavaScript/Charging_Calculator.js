
class Car {
    constructor(carid, registration, currentrange, rangeneeded, leavingtimehour, leavingtimeminute, chargescore) {
        this.carid = carid;
        this.registration = registration;
        this.currentrange = currentrange;
        this.rangeneeded = rangeneeded;
        this.leavingtimehour = leavingtimehour;
        this.leavingtimeminute = leavingtimeminute;
        this.chargescore = chargescore
    }
}

let carArray = []

// 7-8 8-9 9-10 10-11 11-12 12-13 13-14 14-15 15-16 16-17
const solarValues = [ 40, 50, 60, 70, 80, 70, 70, 60, 50, 40 ]
let hourButtons = document.getElementsByClassName("hour_button")
let availableSolarValues = [ 40, 50, 60, 70, 80, 70, 70, 60, 50, 40 ]
const carMaximumRange = 250
let systemHour = 7

const carStatistics = document.getElementsByClassName('vehicle_statistics')// Table rows for each car
const carRegBox = document.getElementsByClassName('car_reg')
const carChargingBox = document.getElementsByClassName('charge_cel')
const chargeValueBox = document.getElementsByClassName('charge_total')
console.log("Charge total count: " + chargeValueBox.length)
// //#region Hour Button Event Listeners

for (let x = 0; x < hourButtons.length; x++) {
    hourButtons[x].addEventListener('click', function() {
        hourButtons[systemHour - 7].classList.remove('charging')
        
        systemHour = parseInt(hourButtons[x].textContent)
        hourButtons[parseInt(hourButtons[x].textContent)-7].classList.add('charging')
        console.log("systemHour changed to: " + systemHour)



        // When the hour changes
        // Remove cars that have enough charge

        // Resort the charging priority

        // Sequence cars to charge
    })
}

// #endregion

// Add Car Button
const addCarButton = document.getElementById('create_vehicle')

// #region Car Creation and Validation

// Form Variables
const registrationInput = document.getElementById('registration_input')
const rangeInput = document.getElementById('stored_range')
const nextDistanceInput = document.getElementById('next_distance_input')
const leaveTimeInput = document.getElementById('leave_time_input')

// Time Values
let hour
let minute

// Invalid Input Variables
// #region
const regError = document.getElementById('reg_error')
const regErrorText = 'Invalid Registration'
const storedDistanceError = document.getElementById('stored_distance_error')
const storedDistanceErrorText = 'Invalid Stored Range'
const nextDistanceError = document.getElementById('next_distance_error')
const nextDistanceErrorText = 'Invalid Distance'
const leaveTimeError = document.getElementById('leave_time_error')
const leaveTimeErrorText = 'Invalid Leave Time'
// #endregion

// This counts the current number of cars in the array
let carCounter = 0;

addCarButton.addEventListener('click', function() {

    if (carArray.length < 6) {
        // These will either equal false, or the validated correct input.
        let carReg = ValidateRegistration(registrationInput.value)
        let carCharge = ValidateStoredRange(rangeInput.value)
        let carJourney = ValidateNextJourney(nextDistanceInput.value)
        let carLeaveTime = ValidateLeaveTime(leaveTimeInput.value)

        // If every input field is valid, do this code.
        if (carReg != false && carCharge != false && carJourney != false && carLeaveTime != false) {
            addCar(carCounter, carReg, carCharge, carJourney, carLeaveTime[0], carLeaveTime[1])

            // console.log(carArray)
        }
    }
})

// #region Validate Car Values

function ValidateRegistration(value) {
    let regMatch = /^[0-9A-Z _]+$/
    let regValue = value.toUpperCase();

    if (regValue.match(regMatch) && regValue.length <= 8 && regValue.length > 6) {
        regError.textContent = ''
        // console.log("Registration Validation Passed")
        return regValue
    } else {
        regError.textContent = regErrorText
        // console.log("Registration Validation Failed")
        return false
    }
}

function ValidateStoredRange(value) {
    let rangeValue = value
    //console.log("Value: " + rangeValue)
    if (parseInt(rangeValue)) {
        if (rangeValue >= 0 && rangeValue <= 250) {
            storedDistanceError.textContent = ''
            //console.log("Stored Range Validation Passed")
            return rangeValue
        } else {
            storedDistanceError.textContent = storedDistanceErrorText
            //console.log("Stored Range Validation Failed")
            return false
        }
    } else {
        //console.log("Input Value was not an integer")
        storedDistanceError.textContent = storedDistanceErrorText
        return false
    }
}

function ValidateNextJourney(value) {
    let nextDistance = value;
    let totalDistance = ((value * 2) * 1.1)
    if (nextDistance > 0 && totalDistance <= 250 ) {
        nextDistanceError.textContent = ''
        //console.log("Next Distance Validation Passed")
        // return totalDistance
        return totalDistance
    } else {
        nextDistanceError.textContent = nextDistanceErrorText
        //console.log("Next Distance Validation Failed")
        return false
    }
}

function ValidateLeaveTime(value) {
    let leaveTime = value
    let numbers = /^[0-9]+$/

    // let hourLeaveTime
    // let minuteLeaveTime

    if (leaveTime.length >= 4 && leaveTime.length < 6) { // Only accept the input is it is 4 or 5 characters long.
        if (leaveTime.length == 4) {// If AM input is 4 characters e.g 8:00 it becomes 08:00
            leaveTime = "0"
            leaveTime += value
        } 
        
        hourLeaveTime = leaveTime.substring(0,2)
        //console.log(hourLeaveTime)
        minuteLeaveTime = leaveTime.substring(3,5)
        //console.log(minuteLeaveTime)
    
        let hourInt = parseInt(hourLeaveTime)
        // console.log("hourInt: " + hourInt)
        let minuteInt = parseInt(minuteLeaveTime)
        // console.log("minuteInt: " + minuteInt)

        if (parseInt(hourLeaveTime) && hourInt >= 0 && hourInt < 24) { // Test hour is valid
    
            if (leaveTime.charAt(2) === ":") { // Middle character is a colon

                if (parseInt(minuteLeaveTime) && minuteInt > 0 && minuteInt < 60) { // Test minute is valid
                    leaveTimeError.textContent = ""
                    let leaveTimeArray = []
                    leaveTimeArray.push(hourInt)
                    leaveTimeArray.push(minuteInt)
                    return leaveTimeArray
                } else if (minuteLeaveTime === "00") { // Minute value entered is equal to 0 minutes
                    leaveTimeError.textContent = ""
                    let leaveTimeArray = []
                    leaveTimeArray.push(hourInt)
                    leaveTimeArray.push(0)
                    return leaveTimeArray
                } else { // Minute value for leave time is invalid
                    leaveTimeError.textContent = leaveTimeErrorText
                    return false
                }

            } else { // Middle character is not a colon and is thus not valid.
                leaveTimeError.textContent = leaveTimeErrorText 
                return false
            }

        } else { // Hour input is not valid.

            //console.log("Invalid Hour: " + hourInt)
            leaveTimeError.textContent = leaveTimeErrorText
            return false

        }
    } else {
        // Input was null or not long enough -> 8:00 or 16:00
        leaveTimeError.textContent = leaveTimeErrorText
        //console.log("Invalid Leave Time.")
        return false;
    }
    

}
// #endregion

// #endregion

function addCar(carCounter, carReg, carCharge, carJourney, carLeaveTime) {
    let newCar = new Car(carCounter, carReg, carCharge, carJourney, carLeaveTime, null)
    carArray.push(newCar)
    carCounter++

    chargeCars()
    sortCars()
    CalculateCharging(systemHour)
    ChargeCars()
    displayCars()

}

// Work out when to charge the cars

// For each car, that does not have enough range, get a score (charging left (kwh) / time until departure (h))
let sortedCarArray = []


function chargeCars() {
    
    let scoreForCars = [] 

    let currentDateTime = new Date()
    // console.log(currentDateTime)
    let currentHour = currentDateTime.getHours()
    // console.log("Hour: " + currentHour)
    let currentMinute = currentDateTime.getMinutes()
    // console.log("Minute: " + currentMinute)

    // Round to the closest hour
    if (currentMinute >  30) {
        currentHour++
    }

    // console.log("Current Hour Rounded to: " + currentHour)

    // console.log("Car Array Length: " + carArray.length)

    // Gets and assigns a charging score
    for (let x = 0; x < carArray.length; x++) { // For each car in the array

        let currentRange = carArray[x].currentrange 
        let rangeNeeded = carArray[x].rangeneeded
        // console.log("Current Range: " + currentRange)
        // console.log("Range Needed: " + rangeNeeded)

        if (currentRange < rangeNeeded) { // Look if the car has enough charge or not.

            // console.log("Range Needed: " + rangeNeeded)

            let hoursLeft
            let carHour = carArray[x].leavingtimehour
            if (carHour > 17) {
                hoursLeft = 17 - currentHour
            } else {
                hoursLeft = carHour - currentHour
            }

            console.log("CR " + currentRange)
            console.log("RN " + rangeNeeded)
            let distanceToCharge = rangeNeeded - currentRange // How many miles of charge is needed
            let kwhToCharge = distanceToCharge / 4; // How many kwh does the remaining distance require?
            let chargeScore = kwhToCharge / hoursLeft // Average kwh Needed to charge per hour

            scoreForCars.push(chargeScore)
            carArray[x].chargescore = chargeScore
        } else {
            scoreForCars.push(0)
            carArray[x].chargescore = 0
        }
    }
}

function sortCars() {

    sortedCarArray = []
    for (let x = 0; x < carArray.length; x++) { // Pick a car

        let indexHighScore = null

        // If the comparision car is not already in the sorted array, make it the current High Score
        if (sortedCarArray.includes(carArray[x]) == false) {
            indexHighScore = x
        }
        // Else keep it null

        for (let y = 0; y < carArray.length; y++) {

            // If the sorted array does not contain the comparing car.
            if (sortedCarArray.includes(carArray[y]) == false ) {
                
                // No high score so assign the first available car to be the comparison
                if (indexHighScore == null) {
                    indexHighScore = y
                } else { // We have a high score index already

                    // 
                    if (carArray[x].chargescore < carArray[y].chargescore) {
                        indexHighScore = y
                    }
                }

            }

        }

        sortedCarArray.push(carArray[indexHighScore])

    }

    console.log(sortedCarArray)
}

let hourChargingArray = []

function CalculateCharging(_hour) {

    // console.log("charging cars")
    // Reset the available charging amount
    availableSolarValues = solarValues

    let hourIndex = 7
    console.log("hourIndex: " + hourIndex)

    // For every hour
    for (let x = 0; x < 11; x++) {
        // console.log("CalculateCharging " + x)
        // Are we past the current time?
        console.log("hourIndex: " + hourIndex + " x: " + x)
        if (x >= hourIndex) { // No
             
            // For each car
            for (let z = 0; z < sortedCarArray.length; z++) {

                // console.log("CalculateCharging " + z)

                let carChargeScore = sortedCarArray[z].chargescore
                // console.log("carChargeScore: " + carChargeScore)
                let carRangeStored = sortedCarArray[z].currentrange
                // console.log("carRangeStored: " + carRangeStored)
                let carRangeNeeded = sortedCarArray[z].rangeneeded
                // console.log("carRangeNeeded: " + carRangeNeeded)

                // Test the car does not have enough stored power
                if (carRangeStored > carRangeNeeded) {

                    // Test if we can charge the full carChargeScore
                    console.log("Hour is " + systemHour + " charge available is: " + availableSolarValues[hourIndex])
                    if (availableSolarValues[hourIndex] >= carChargeScore) {

                        // Charge the car up the carChargeScore amount * the mileage per kwh
                        // hourChargingArray[x*z] = carChargeScore 
                        console.log("Car will charge: " + carChargeScore)
                        hourChargingArray.push(carChargeScore)
                        availableSolarValues[x] -= carChargeScore
                        carRangeStored += (carChargeScore * 4)
                        // sortedCarArray[z].currentrange += (carChargeScore * 4)
                        // carChargingBox[z*10 + (parseInt(systemHour) - 7)].classList.add("charging")

                    } else {

                        hourChargingArray.push(availableSolarValues[hourIndex])
                        availableSolarValues[x] = 0
                        carRangeStored += (availableSolarValues[hourIndex] * 4)
                        // sortedCarArray[z].currentrange += (availableSolarValues[hourIndex] * 4)
                        // carChargingBox[z*10 + (parseInt(systemHour) - 7)].classList.add("charging")
                    }
                    // Set the hour box for the car to green 
                }
            }

        } else { // Yes

            // Set the empty hour to zero
            for (let y = 0; y < 6; y++) {
                hourChargingArray.push(0)
            }
        }

    }
}

function ChargeCars() {

    console.log("hourChargingArray length: " + hourChargingArray.length)
    for (let x = 0; x < hourChargingArray.length; x++) {

        if (hourChargingArray[x] > 0) {
            carChargingBox[x].classList.add('charging')
        } else {
            carChargingBox[x].classList.remove('charging')
        }

    }

}

function displayCars() {

    for (let x = 0; x < carChargingBox.length; x++) {
        carChargingBox[x].textContent = x
        carChargingBox[x].classList.remove('charging')
    }

    for (let x = 0; x < sortedCarArray.length; x++) {
        console.log("Charge Score: " + sortedCarArray[x].chargescore)
        let totalDistance = (sortedCarArray[x].rangeneeded * 2) * 1.1
        carRegBox[x].textContent = sortedCarArray[x].registration + " -> " + Math.round((sortedCarArray[x].currentrange / totalDistance)*100) + "%"
        if (sortedCarArray[x].currentrange >= sortedCarArray[x].rangeneeded) {

            chargeValueBox[x].textContent = "Charged!"

        } else {
            chargeValueBox[x].textContent = sortedCarArray[x].currentrange + '/' + Math.round(sortedCarArray[x].rangeneeded) + ' miles'

            // let chargeBoxToSelect = x * 10
            // console.log("ChargeBoxToSelect: " + chargeBoxToSelect)
            // let box = carChargingBox[(x * 10)] 
            // carChargingBox[x*10 + (parseInt(systemHour) - 7)].classList.add("charging")
        }
    }
}