function validateEmail(email){
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}
function validatePassword(password){
    return /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8}$/.test(password)
}

module.exports = {
    validateEmail,
    validatePassword
}