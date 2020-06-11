//HELPER METHODS//
//
//validate/check for empty fields
const isEmpty = (string) => {
    //trim eliminates whitespaces
    if (string.trim() === '') return true;
    else return false;
}
//check if the email is an email using regular expression
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}
//END OF HELPER METHODS//

exports.validateSignupData = (data) => {
    //create an errors object
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty!'
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address!';
    }

    if (isEmpty(data.password)) errors.password = 'Must not be empty!';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match!';
    if (isEmpty(data.username)) errors.username = 'Must not be empty!';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false //if no keys, no errors, thus it is true.
    }
}

//same idea as validating signup data
exports.validateLoginData = (data) => {
    let errors = {}
    if (isEmpty(data.email)) errors.email = 'Must not be empty!';
    if (isEmpty(data.password)) errors.password = 'Must not be empty!';
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false //if no keys, no errors, thus it is true.
    }
}