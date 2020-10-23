
class Car {
    constructor(carid, registration, currentrange, milesneeded, leavingtime) {
        this.carid = carid;
        this.registration = registration;
        this.currentrange = currentrange;
        this.milesneeded = milesneeded;
        this.leavingtime = leavingtime;
    }
}

let carArray = []
// 7-8 8-9 9-10 10-11 11-12 12-13 13-14 14-15 15-16 16-17
const solarValues = [ 40, 50, 60, 70, 80, 70, 70, 60, 50, 40 ]
const carMaximumRange = 250

// Add Car Button
const addCarButton = document.getElementById('create_vehicle')

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

    // These will either equal false, or the validated correct input.
    let carReg = ValidateRegistration(registrationInput.value)
    let carCharge = ValidateStoredRange(rangeInput.value)
    let carJourney = ValidateNextJourney(nextDistanceInput.value)
    let carLeaveTime = ValidateLeaveTime(leaveTimeInput.value)

    // If every input field is valid, do this code.
    if (carReg != false && carCharge != false && carJourney != false && carLeaveTime != false) {
        addCar(carCounter, carReg, carCharge, carJourney, carLeaveTime)

        console.log(carArray)
    }

})

// #region Validate Car Values

function ValidateRegistration(value) {
    let regMatch = /^[0-9A-Z _]+$/
    let regValue = value.toUpperCase();

    if (regValue.match(regMatch) && regValue.length <= 8 && regValue.length > 0) {
        regError.textContent = ''
        console.log("Registration Validation Passed")
        return regValue
    } else {
        regError.textContent = regErrorText
        console.log("Registration Validation Failed")
        return false
    }
}

function ValidateStoredRange(value) {
    let rangeValue = value
    if (rangeValue >= 0 && rangeValue <= 250) {
        storedDistanceError.textContent = ''
        console.log("Stored Range Validation Passed")
        return rangeValue
    } else {
        storedDistanceError.textContent = storedDistanceErrorText
        console.log("Stored Range Validation Passed")
        return false
    }
}

function ValidateNextJourney(value) {
    let nextDistance = value;
    let totalDistance = ((value * 2) + (value*0.1))
    if (nextDistance > 0 && totalDistance <= 250 ) {
        nextDistanceError.textContent = ''
        console.log("Next Distance Validation Passed")
        return nextDistance
    } else {
        nextDistanceError.textContent = nextDistanceErrorText
        console.log("Next Distance Validation Failed")
        return false
    }
}

function ValidateLeaveTime(value) {
    let leaveTime = value
    let numbers = /^[0-9]+$/

    // let hourLeaveTime
    // let minuteLeaveTime

    if (leaveTime.length == 4) {// If AM input is 4 characters e.g 8:00 it becomes 08:00
        leaveTime = "0"
        leaveTime += value
    } 

    hourLeaveTime = leaveTime.substring(0,2)
    console.log(hourLeaveTime)
    minuteLeaveTime = leaveTime.substring(3,5)
    console.log(minuteLeaveTime)

    let hourInt = parseInt(hourLeaveTime)
    console.log("hourInt: " + hourInt)
    let minuteInt = parseInt(minuteLeaveTime)
    console.log("minuteInt: " + minuteInt)
    if (parseInt(hourLeaveTime) && hourInt > -1 && hourInt <= 24) { 

        if (parseInt(minuteLeaveTime) && minuteInt >= 0 && minuteInt <= 60) {

            // console.log("3rd Character is: " + leaveTime.charAt(2))

            if (leaveTime.charAt(2) === ":") { // Middle character is a colon

                leaveTimeError.textContent = ""

            } else { // Middle character is not a colon

                leaveTimeError.textContent = leaveTimeErrorText

                return false
            }
        
            console.log("Leave Time Validation Passed")
        
            return leaveTime

        } else {

            console.log("Invalid Minute: " + minuteInt)

        }

    } else {

        console.log("Invalid Hour: " + hourInt)

    }

}
// #endregion

function addCar(carCounter, carReg, carCharge, carJourney, carLeaveTime) {
    let newCar = new Car(carCounter, carReg, carCharge, carJourney, carLeaveTime)
    carArray.push(newCar)
}