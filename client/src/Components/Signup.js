import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const userAuthenticeted = () => {
        axios.get("http://localhost:4000/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("user"),
            },
        }).then((response) => {
            console.log(response);
            if (response.data.auth == true) {
                navigate('/home')
            }

        });
    };


    useEffect(() => {
        userAuthenticeted()
    }, [])

    const Submit = (e) => {
        const { firstname, email, password } = e
        if (firstname && email && password) {
            console.log(email);
            axios.post("http://localhost:4000/signup", e)
                .then((response) => {
                    if (response) { navigate('/') }
                }).catch((error) => {
                    const errormsg = error.response.data.msg
                    console.log(errormsg)
                    setError(true)
                })
        } else {
            console.log("error");
        }

    }


    return (
        <div className='flex flex-col justify-start items-center h-screen'>
            <div className='relative w-full h-full'>
                <div className='absolute flex flex-col  justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className="w-6/12 border rounded-lg shadow-md p-5 my-auto">
                        <h1 className="text-2xl font-extrabold text-center m-3 text-blue-700 ">Create user</h1>
                        {error ? <h1 className="text-red-500 text-center mx-auto">user already exist</h1> : <h1></h1>}
                        <form onSubmit={handleSubmit(Submit)} >
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h1 className="text-left text-lg font-mono mt-2" >Firstname</h1>
                                    <input type="text" className=" w-full p-2 shadow-md bg-slate-50 border-4 border-blue-50 rounded-md focus:outline-none"
                                        name="firstname"
                                        {...register("firstname", { required: "Firstname Required" })}
                                    />
                                    {errors.firstname && (<span className='text-red-500'>{errors.firstname.message}</span>)}
                                </div>


                                <div>
                                    <h1 className="text-left text-lg font-mono mt-2" >lastname</h1>
                                    <input type="text" className=" w-full p-2 shadow-md bg-slate-50 border-4 border-blue-50 rounded-md focus:outline-none"
                                        name="lastname"
                                        {...register("lastname", { required: "Lastname Required" })}
                                    />
                                    {errors.lastname && (<span className='text-red-500'>{errors.lastname.message}</span>)}
                                </div>

                                <div>
                                    <div className="flex">
                                        <h1 className="text-left text-lg font-mono mt-2" >DOB </h1> <h2 className="text-left ml-2 text-sm font-mono mt-3">(optional)</h2>
                                    </div>
                                    <input type="date" className=" w-full p-2 shadow-md bg-slate-50 border-4 border-blue-50 rounded-md focus:outline-none"
                                        name="dob" />
                                </div>

                                <div>
                                    <h1 className="text-left text-lg font-mono mt-2" >Email</h1>
                                    <input type="email" className=" w-full p-2 shadow-md bg-slate-50 border-4 border-blue-50 rounded-md focus:outline-none"
                                        name="email"
                                        {...register("email", {
                                            required: "Email Required",
                                            pattern: {
                                                value: /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/,
                                                message: "invalid Email Address"
                                            }
                                        })} />
                                    {errors.email && (<span className='text-red-500'>{errors.email.message}</span>)}
                                </div>

                                <div>
                                    <h1 className="text-left text-lg font-mono mt-2" >phone</h1>
                                    <input type="tel" className=" w-full p-2 shadow-md bg-slate-50 border-4 border-blue-50 rounded-md focus:outline-none"
                                        name="phone"
                                        {...register("phone", {
                                            required: "Phone number Required",
                                            pattern: {
                                                value: /^([+]\d{2}[ ])?\d{10}$/,
                                                message: "invalid phone number"
                                            }
                                        })} />
                                    {errors.phone && (<span className='text-red-500'>{errors.phone.message}</span>)}
                                </div>

                                <div>
                                    <div className="flex">
                                        <h1 className="text-left text-lg font-mono mt-2" >Occupation</h1><h2 className="text-left ml-2 text-sm font-mono mt-3">(optional)</h2>
                                    </div>
                                    <input type="text" className=" w-full p-2 shadow-md bg-slate-50 border-4 border-blue-50 rounded-md focus:outline-none"
                                        name="occupation" />
                                </div>

                                <div>
                                    <div className="flex">
                                        <h1 className="text-left text-lg font-mono mt-2" >Company</h1><h2 className="text-left ml-2 text-sm font-mono mt-3">(optional)</h2>
                                    </div>
                                    <input type="text" className=" w-full p-2 shadow-md bg-slate-50 border-4 border-blue-50 rounded-md focus:outline-none"
                                        name="company" />
                                </div>

                                <div>
                                    <h1 className="text-left text-lg font-mono mt-2" >Password</h1>
                                    <input type="password" className=" w-full p-2 shadow-md bg-slate-50 border-4 border-blue-50 rounded-md focus:outline-none"
                                        name="password"
                                        {...register("password", {
                                            required: "password Required",
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                message: "Min 8 characters including number and letter"
                                            }
                                        })} />
                                    {errors.password && (<span className='text-red-500'>{errors.password.message}</span>)}
                                </div>
                            </div>
                            <button className="bg-blue-700 p-2 rounded-md mt-7 text-white font-bold w-full" type="submit">Create</button>
                        </form>
                        <Link to={'/'}>
                            <p className="text-left mt-5 font-light text-blue-600">Already have an Account</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup