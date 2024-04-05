import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import { validateUserData } from "../utils/validation";
import api from "../utils/api";
import {useDispatch} from "react-redux"
import { userLogin } from "../redux/slice/user";

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSignup =() => {
        const isValid = validateUserData(formData)
        if(!isValid){
            console.log("Data is not valid")
            return 
        }
        api.post('/auth/signup',formData)
        .then(() => {
            console.log('account successfully created')
            dispatch(userLogin({ email: formData.email, password: formData.password }));
            navigate('/')
        })
        .catch(error => console.error("Error creating account:", error));
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full mt-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img className="mx-auto h-14 w-auto" src={book} alt="Your Company"/> */}
                <h1 className="text-center py-6 font-bold">Task manager</h1>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Join TikTik</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <input id="email" type="text" name="name" onChange={handleChange} className="mt-2 px-4 py-1.5 outline-none block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email address <span className="text-red-500 text-base">*</span></label>
                    <input id="email" type="email" name="email" required onChange={handleChange} className="mt-2 px-4 py-1.5 outline-none block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Password <span className="text-red-500 text-base">*</span></label>
                    <input id="password" required name="password" onChange={handleChange} className="mt-2 px-4 py-1.5 outline-none block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={(e) => handleSignup(e)}>Sign in</button>
                </div>
                </form>
                <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?
                <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup