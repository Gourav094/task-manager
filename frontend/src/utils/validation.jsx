export function validateUserData(data){
    const {email,password} = data
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    const isPassValid = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8}$/.test(password)
    if(!isEmailValid){
        return "Please Enter Valid Email"
    }
    else if(!isPassValid){
        return "Password should contain special character and 8 digits"
    }
    return ""
}

