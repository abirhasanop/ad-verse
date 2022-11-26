import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PrimaryButton from '../../Components/Button/PrimaryButton'
import SmallSpinner from '../../Components/Spinner/SmallSpinner'
import { AuthContext } from '../../Contexts/AuthProvider';

const SignUp = () => {
    const { createUserWithEmail, googleSignIn, loding, setLoding, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/"


    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        name: "",
        role: "buyer",
        varified: false
    })

    // signin with email password
    const handleSubmit = (e) => {
        setLoding(true)
        e.preventDefault()

        createUserWithEmail(userInfo.email, userInfo.password)
            .then(result => {
                const user = result.user
                if (user) {
                    const profileInfo = { displayName: userInfo.name }
                    updateUserProfile(profileInfo)
                        .then(() => { })
                        .catch(err => console.log(err))

                    toast.success("Account Created Succesfully")
                    saveUserToDb(userInfo.name, userInfo.email, userInfo.role, userInfo.varified)
                    navigate(from, { replace: true })
                }
                console.log(user);
                setLoding(false)
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
                toast.success("Account Created Succesfully")
                setLoding(false)
            })
            .catch(err => {
                console.log(err);
                setLoding(false)
                toast.error(err.message)
            })
    }


    // Sendiing User to Database
    const saveUserToDb = (name, email, role, varified) => {
        const user = { name, email, varified, role }
        fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })

    }


    // all validations
    const handleNameChange = (e) => {
        setUserInfo({ ...userInfo, name: e.target.value })
    }
    const handleEmailChange = (e) => {
        const email = e.target.value

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError({ ...error, email: "Please provide a valid email" })
            setUserInfo({ ...userInfo, email: "" })
        } else {
            setError({ ...error, email: "" })
            setUserInfo({ ...userInfo, email: email })
        }

    }
    const handlePasswordChange = (e) => {
        const password = e.target.value

        const lengthError = password.length < 6;
        const noSymbolError = !/[\!\@\#\$\%\^\&\*]{1,}/.test(password);
        const noCapitalLetterError = !/[A-Z]{1,}/.test(password);
        // have doubt on this redx
        const noNumberError = !/(?=.*[0-9].*[0-9])/.test(password)

        if (lengthError) {
            setError({ ...error, password: "Password must have more that 6 charecters" })
            setUserInfo({ ...userInfo, password: "" })
        } else if (noNumberError) {
            setError({ ...error, password: "Password must have atleast 2 digits" })
            setUserInfo({ ...userInfo, password: "" })
        }
        else if (noSymbolError) {
            setError({ ...error, password: "Password must have speacial charencters" })
            setUserInfo({ ...userInfo, password: "" })
        } else if (noCapitalLetterError) {
            setError({ ...error, password: "Password must have atleast one capital latter" })
            setUserInfo({ ...userInfo, password: "" })
        }
        else {
            setError({ ...error, password: "" })
            setUserInfo({ ...userInfo, password: password })
        }
    }

    const handleRoleChange = (e) => {
        const role = e.target.value
        setUserInfo({ ...userInfo, role: role })
    }





    return (
        <div className='flex justify-center items-center pt-8'>
            <div style={{ width: "30rem" }} className='flex flex-col  p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Signup</h1>
                    <p className='text-sm text-gray-400'>Create a new account</p>
                </div>
                <form
                    noValidate=''
                    action=''
                    className='space-y-12 ng-untouched ng-pristine ng-valid'
                    onSubmit={handleSubmit}
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                required
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                                onChange={handleNameChange}
                            />
                        </div>

                        {/* image field */}
                        {/* <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                                className='file-input file-input-bordered w-full max-w-xs'

                            />
                        </div> */}


                        {/* ro role field */}
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Role?
                            </label>
                            <select onChange={handleRoleChange} name='role' className="select border-gray-300 bg-gray-200 focus:outline-green-500 w-full">
                                <option>buyer</option>
                                <option>seller</option>
                            </select>
                        </div>
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
                                className={`w-full px-3 py-2 border rounded-md border-gray-300  bg-gray-200 text-gray-900
                ${error.email ? "focus:outline-red-500" : "focus:outline-green-500"}
                `}
                                data-temp-mail-org='0'
                                // value={userInfo.email}
                                onChange={handleEmailChange}
                            />
                            {error.email && <p className='text-red-500'>{error.email}</p>}
                        </div>
                        <div>
                            <div className='flex justify-between mb-2'>
                                <label htmlFor='password' className='text-sm'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='Enter Your Password'
                                className={`w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 text-gray-900
                ${error.password ? "focus:outline-red-500" : "focus:outline-green-500"}
                `}
                                // value={userInfo.password}
                                onChange={handlePasswordChange}
                            />
                            {error.password && <p className='text-red-500'>{error.password}</p>}
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div>
                            {/* <PrimaryButton
                                type='submit'
                                classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                            >
                                {loding ? <SmallSpinner /> : "Sign Up"}
                            </PrimaryButton> */}
                            <button className='btn bg-orange-600 border-none w-full'>
                                {loding ? <SmallSpinner /> : "Sign Up"}
                            </button>
                        </div>
                    </div>
                </form>
                <div className="divider">OR</div>
                <div>
                    <button onClick={handleGoogleSignIn} className='btn w-full'>Sing In With Google</button>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account yet?{' '}
                    <Link to='/login' className='hover:underline text-gray-600'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default SignUp;