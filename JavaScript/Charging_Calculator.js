
class Car {
    constructor(carid, registration, currentrangemiles, rangedneededmiles, currentpower, totalpowerneeded, leavingtimehour, leavingtimeminute, chargescore, carchargeperhour) {
        this.carid = carid;
        this.registration = registration;
        this.currentrangemiles = currentrangemiles;
        this.rangedneededmiles = rangedneededmiles;
        this.currentpower = currentpower
        this.totalpowerneeded = totalpowerneeded;
        this.leavingtimehour = leavingtimehour;
        this.leavingtimeminute = leavingtimeminute;
        this.chargescore = chargescore;
        this.carchargeperhour = [0,0,0,0,0,0,0,0,0,0];
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
// console.log("Charge total count: " + chargeValueBox.length)

// console.log("carChargingBox count: " + carChargingBox.length)

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
        let carCurrentMiles = ValidateStoredRange(rangeInput.value)
        let carNeededMiles = ValidateNextJourney(nextDistanceInput.value)
        let carLeaveTime = ValidateLeaveTime(leaveTimeInput.value)

        // If every input field is valid, do this code.
        if (carReg != false && carCurrentMiles != false && carNeededMiles != false && carLeaveTime != false) {

            let totalchargeneeded = Math.round(carNeededMiles/4)
            let currentcharge = carCurrentMiles/4
            // let carchargeperhour = new [0,0,0,0,0,0,0,0,0,0]
            addCar(carCounter, carReg, carCurrentMiles, carNeededMiles, currentcharge, totalchargeneeded, carLeaveTime[0], carLeaveTime[1], null)

        }
    }
})

// #region Validate Car Values

function ValidateRegistration(value) {
    let regMatch = /^[0-9A-Z _]+$/
    let regValue = value.toUpperCase();

    if (regValue.match(regMatch) && regValue.length <= 8 && regValue.length > 6) {
        regError.textContent = ''
        return regValue
    } else {
        regError.textContent = regErrorText
        return false
    }
}

function ValidateStoredRange(value) {
    let rangeValue = parseInt(value)
    if (parseInt(rangeValue)) {
        if (rangeValue >= 0 && rangeValue <= 250) {
            storedDistanceError.textContent = ''
            return rangeValue
        } else {
            storedDistanceError.textContent = storedDistanceErrorText
            return false
        }
    } else {
        storedDistanceError.textContent = storedDistanceErrorText
        return false
    }
}

function ValidateNextJourney(value) {
    let nextDistance = value;
    let totalDistance = ((value * 2) * 1.1)
    if (nextDistance > 0 && totalDistance <= 250 ) {
        nextDistanceError.textContent = ''
        return totalDistance
    } else {
        nextDistanceError.textContent = nextDistanceErrorText
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
        minuteLeaveTime = leaveTime.substring(3,5)
    
        let hourInt = parseInt(hourLeaveTime)
        let minuteInt = parseInt(minuteLeaveTime)

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

            leaveTimeError.textContent = leaveTimeErrorText
            return false

        }
    } else {
        // Input was null or not long enough -> 8:00 or 16:00
        leaveTimeError.textContent = leaveTimeErrorText
        return false;
    }
    

}
// #endregion

// #endregion

// For each car, that does not have enough range, get a score (charging left (kwh) / time until departure (h))
let sortedCarArray = []

function addCar(carCounter, carReg, carCurrentMiles, carNeededMiles, carCurrentCharge, carTotalNeededCharge, carLeaveTimeHour, carLeaveTimeMinute) {
    let newCar = new Car(carCounter, carReg, carCurrentMiles, carNeededMiles, carCurrentCharge, carTotalNeededCharge, carLeaveTimeHour, carLeaveTimeMinute, null)
    carArray.push(newCar)
    carCounter++

    setChargeScore()
    sortCars()
    CalculateCharging(systemHour)
    chargeCar()
    displayCars()
}

// Work out when to charge the cars

function setChargeScore() {
    
    let scoreForCars = [] 

    let currentDateTime = new Date()
    let currentHour = currentDateTime.getHours()
    let currentMinute = currentDateTime.getMinutes()

    // Round to the closest hour
    if (currentMinute >  30) {
        currentHour++
    }

    // Gets and assigns a charging score
    for (let x = 0; x < carArray.length; x++) { // For each car in the array

        let currentrangemiles = carArray[x].currentrangemiles 
        let rangedneededmiles = carArray[x].rangedneededmiles

        if (currentrangemiles < rangedneededmiles) { // Look if the car has enough charge or not.

            let hoursLeft
            let carHour = carArray[x].leavingtimehour
            if (carHour > 17) {
                hoursLeft = 17 - currentHour
            } else {
                hoursLeft = carHour - currentHour
            }

            let distanceToCharge = rangedneededmiles - currentrangemiles // How many miles of charge is needed
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
}

let hourChargingArray = []

function CalculateCharging(_hour) {

    // Reset the hour Charging Array
    hourChargingArray = [0,0,0,0,0,0,0,0,0,0]

    // Reset the available charging amount
    availableSolarValues = solarValues

    for (let solar = 0; solar < 10; solar++) {
        availableSolarValues[solar] = solarValues[solar]
    }

    console.log(availableSolarValues)
    let hourIndex = 7

    // For every car
    for (let x = 0; x < sortedCarArray.length; x++) {

        sortedCarArray[x].carchargeperhour = []
        // For every hour
        for (let y = 0; y < 10; y++) {

            // Are we too late to charge the car for this hour
            if (_hour <= (y + 7)) {

                let powerStored = sortedCarArray[x].currentpower
                let powerNeeded = sortedCarArray[x].totalpowerneeded

                // power calculated for all hours total
                
                let totalPlannedCharge = 0
                for (let h = 1; h <= sortedCarArray[x].carchargeperhour.length; h++) {
                    totalPlannedCharge += sortedCarArray[x].carchargeperhour[h-1]
                }

                // Do we need to charge this car?
                // if (powerStored < powerNeeded) {
                if (totalPlannedCharge < powerNeeded) {

                    // YES

                    // Do we have enough power to charge the car at a full 11kwh

                    if (availableSolarValues[y] >= 11) {

                        // YES
                        let remainingChargeNeeded = powerNeeded - totalPlannedCharge

                        if (remainingChargeNeeded > 11) {
                            availableSolarValues[y] -= 11
                            sortedCarArray[x].carchargeperhour[y] = 11
                            hourChargingArray.push(11)
                        } else {
                            availableSolarValues[y] -= remainingChargeNeeded
                            sortedCarArray[x].carchargeperhour[y] = remainingChargeNeeded
                            hourChargingArray.push(remainingChargeNeeded)
                        }

                    } else if (availableSolarValues[y] > 0) {

                        // SOME 
                        let chargeRemaining = availableSolarValues[y]

                        // the remaining charge left available
                        availableSolarValues[y] = 0
                        sortedCarArray[x].carchargeperhour[y] = chargeRemaining
                        hourChargingArray.push(chargeRemaining)
                        

                    } else {

                        // NONE
                        hourChargingArray.push(0)
                        sortedCarArray[x].carchargeperhour[y] = 0
                    }

                } else {

                    // NO the car is charged
                    hourChargingArray.push(0)
                    sortedCarArray[x].carchargeperhour[y] = 0
                }

            } else {

                // YES
                // To late to charge the car for this hour
                hourChargingArray.push(0)
            }
        }

    console.log("post: " + availableSolarValues)

    }

}

function chargeCar() {
    for (let x = 0; x < hourChargingArray.length; x++) {

        if (hourChargingArray[x] > 0) {
            carChargingBox[x].classList.add('charging')
        } else {
            carChargingBox[x].classList.remove('charging')
        }

    }

    let chargeValues = []
    for (let x = 0; x < sortedCarArray.length; x++) {

        for (let y = 0; y < 10; y++) {
            chargeValues.push(sortedCarArray[x].carchargeperhour[y])
        }

    }

    for (let x = 0; x < chargeValues.length; x++) {

        if (hourChargingArray[x] > 0) {
            carChargingBox[x].classList.add('charging')
            carChargingBox[x].textContent = chargeValues[x]
        } else {
            carChargingBox[x].classList.remove('charging')
            carChargingBox[x].textContent = ""
        }
    }
}

function displayCars() {

    for (let x = 0; x < sortedCarArray.length; x++) {
        let totalDistance = (sortedCarArray[x].rangedneededmiles * 2) * 1.1
        carRegBox[x].textContent = sortedCarArray[x].registration + " -> " + sortedCarArray[x].rangedneededmiles/4 + "kwh"
        if (sortedCarArray[x].currentrangemiles >= sortedCarArray[x].rangedneededmiles) {
            chargeValueBox[x].textContent = "Charged!"
        } else {
            chargeValueBox[x].textContent = sortedCarArray[x].currentrangemiles + '/' + Math.round(sortedCarArray[x].rangedneededmiles) + ' miles'
        }
    }
}