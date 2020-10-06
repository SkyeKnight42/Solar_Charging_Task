
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

// Invalid Input Variables
const regError = document.getElementById('reg_error')
const regErrorText = 'Invalid Registration'
const storedDistanceError = document.getElementById('stored_distance_error')
const storedDistanceErrorText = 'Invalid Stored Range'
const nextDistanceError = document.getElementById('next_distance_error')
const nextDistanceErrorText = 'Invalid Distance'
const leaveTimeError = document.getElementById('leave_time_error')
const leaveTimeErrorText = 'Invalid Leave Time'

addCarButton.addEventListener('click', function() {
    ValidateRegistration(registrationInput.value)
})

// #region Validate Car Values
function ValidateRegistration(value) {
    let regMatch = /^[0-9A-Z _]+$/
    let regValue = value

    if (regValue.match(regMatch) && regValue.length <= 8 && regValue.length > 0) {
        // console.log("Valid Registration")
        regError.textContent = ''
        return true
    } else {
        // console.log("Invalid Registration")
        regError.textContent = regErrorText
        return false
    }
}

function ValidateStoredRange(value) {
    let rangeValue = value
    if (rangeValue >= 0 && rangeValue <= 250) {
        storedDistanceError.textContent = ''
        return true
    } else {
        storedDistanceError.textContent = storedDistanceErrorText
        return false
    }
}
// #endregion