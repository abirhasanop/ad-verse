import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PrimaryButton from '../../Components/Button/PrimaryButton'
import SmallSpinner from '../../Components/Spinner/SmallSpinner'
import { AuthContext } from '../../Contexts/AuthProvider'

const Login = () => {
    const { login, googleSignIn, loding, setLoding } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/"

    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    // login email
    const handleSubmit = (e) => {
        setLoding(true)
        e.preventDefault()
        login(userInfo.email, userInfo.password)
            .then(result => {
                const user = result.user
                setLoding(false)
                toast.success("Login Succesfully")
                navigate(from, { replace: true })
                console.log(user);
            })
            .catch(err => {
                console.log(err);
                setLoding(false)
                toast.error(err.message)
            })
    }

    // signin with google
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user
                console.log(user);
                toast.success("Login Succesfully")
                navigate(from, { replace: true })
                setLoding(false)
            })
            .catch(err => {
                console.log(err);
                setLoding(false)
                toast.error(err.message)
            })
    }

    // email validation
    const handleEmailChange = (e) => {
        const email = e.target.value

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError({ ...error, email: "Please provide a valid email" })
            setUserInfo({ ...userInfo, email: "" })
        } else {
            setError({ ...error, email: "" })
            setUserInfo({ ...userInfo, email: email })
        }

        // password validation
    }
    const handlePasswordChange = (e) => {
        const password = e.target.value
        setUserInfo({ ...userInfo, password: password })
    }


    console.log(userInfo);


    return (
        <div className='flex justify-center items-center pt-8'>
            <div style={{ width: "28rem" }} className='flex flex-col p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign in</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                    onSubmit={handleSubmit}
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500  bg-gray-200 text-gray-900`}
                                data-temp-mail-org='0'
                                // value={userInfo.email}
                                onChange={handleEmailChange}
                            />
                            {error.email && <p className='text-red-500'>{error.email}</p>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900`}
                                // value={userInfo.password}
                                onChange={handlePasswordChange}
                            />
                            {/* {error.password && <p className='text-red-500'>{error.password}</p>} */}
                        </div>
                    </div>

                    <div>
                        {/* <PrimaryButton
                            type='submit'
                            classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                        >
                            {loding ? <SmallSpinner /> : "Sign In"}
                        </PrimaryButton> */}
                        <button className='btn bg-orange-600 border-none w-full'>
                            {loding ? <SmallSpinner /> : "Sign In"}
                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button className='text-xs hover:underline text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className="divider">OR</div>
                <div>
                    <button onClick={handleGoogleSignIn} className='btn w-full'>Sing In With Google</button>
                </div>

                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{' '}
                    <Link to='/signup' className='hover:underline text-gray-600'>
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login
