import { Link ,useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { userLogin } from "../redux/slice/user"
import { validateUserData } from "../utils/validation"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((user) => user)
    console.log(userData)

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const isValid = validateUserData({email,password})
        if(!isValid){
            console.log("Data is not valid")
            return 
        }
        dispatch(userLogin({ email, password }))
        navigate('/')
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full mt-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img className="mx-auto h-14 w-auto" src={book} alt="Your Company"/> */}
                <h1 className="text-center py-6 font-bold">Task manager</h1>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email address <span className="text-red-500 text-base">*</span></label>
                    <input id="email" name="email" type="email" required className="mt-2 px-4 py-1.5 outline-none block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Password <span className="text-red-500 text-base">*</span></label>
                    <input id="password" name="password" required className="mt-2 px-4 py-1.5 outline-none block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Sign in</button>
                </div>
                </form>
                <p className="mt-8 text-center text-sm text-gray-500">
                Not a member?
                <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign up Now</Link>
                </p>
            </div>
        </div>
    )
}

export default Login