
class Car {
    constructor(registration, currentrange, milesneeded, leavingtime) {
        this.registration = registration;
        this.currentrange = currentrange;
        this.milesneeded = milesneeded;
        this.leavingtime = leavingtime;
    }
}

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

addCarButton.addEventListener('click', function() {
    ValidateRegistration(registrationInput.value)
    ValidateStoredRange(rangeInput.value)
    ValidateNextJourney(nextDistanceInput.value)
    ValidateLeaveTime(leaveTimeInput.value)
})

// #region Validate Car Values
function ValidateRegistration(value) {
    let regMatch = /^[0-9A-Z _]+$/
    let regValue = value

    if (regValue.match(regMatch) && regValue.length <= 8 && regValue.length > 0) {
        regError.textContent = ''
        console.log("Registration Validation Passed")
        return true
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
        return true
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
        return true
    } else {
        nextDistanceError.textContent = nextDistanceErrorText
        console.log("Next Distance Validation Failed")
        return false
    }
}

function ValidateLeaveTime(value) {
    let leaveTime = value
    let numbers = /^[0-9]+$/
    if (leaveTime.length < 5) {
        leaveTimeError.textContent = leaveTimeErrorText
        return false;
    } else if (leaveTime.charAt(2) != ":") {
        console.log("colon missing")
        leaveTimeError.textContent = leaveTimeErrorText
        return false
    }
    
    for (let x = 0; x < leaveTime.length; x++) {
        let charAtPoint = leaveTime.charAt(x)
        if (charAtPoint.match(numbers)) {
            console.log(charAtPoint)
        } else if (charAtPoint == ":") {
            console.log("colon -> " + charAtPoint)
        } else {
            leaveTimeError.textContent = leaveTimeErrorText
            return false;
        }
    }
    leaveTimeError.textContent = ""
    hour = parseInt(leaveTime.charAt(0) += leaveTime.charAt(1));
    console.log(hour)

    return true;
}
// #endregion