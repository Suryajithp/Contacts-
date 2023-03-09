import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useEffect, useState } from 'react'



const Login = () => {

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
    const { email, password } = e
    if (email && password) {
      console.log(password);
      axios.post("http://localhost:4000/", e)
        .then((response) => {
          console.log(response.data.msg);
          localStorage.setItem('user', response.data.token)
          navigate('/home')
        }).catch((error) => {
          const errormsg = error.response.data.msg
          console.log(errormsg)
          setError(errormsg)
        })
    } else {
      console.log("poyi");
    }
  }
  return (
    <div className='flex flex-col justify-start items-center h-screen'>
      <div className='relative w-full h-full'>
        <div className='absolute flex flex-col  justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className="w-3/12 border rounded-lg shadow-md  p-5 my-auto">
            <h1 className="text-2xl font-extrabold text-center m-3 text-blue-700 ">Login</h1>
            {error ? <h1 className="text-red-500 text-center mx-auto">{error}</h1> : <h1></h1>}
            <form onSubmit={handleSubmit(Submit)}>
              {errors.name && (<span className='text-red-500'>{errors.name.message}</span>)}
              <h1 className="text-left text-lg font-mono mt-2 " >Email</h1>
              <input type="email" className=" w-full p-2 shadow-md bg-slate-50 border-4  border-blue-50 rounded-md focus:outline-none"
                name="email"
                {...register("email", {
                  required: "Email Required",
                  pattern: {
                    value: /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/,
                    message: "invalid Email Address"
                  }
                })} />
              {errors.email && (<span className='text-red-500'>{errors.email.message}</span>)}
              <h1 className="text-left text-lg font-mono mt-2 " >Password</h1>
              <input type="password" className=" w-full p-2 shadow-md bg-slate-50 border-4  border-blue-50 rounded-md focus:outline-none"
                name="password"
                {...register("password", {
                  required: "password Required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "invalid password "
                  }
                })} />
              {errors.password && (<span className='text-red-500'>{errors.password.message}</span>)}
              <button className="bg-blue-700 p-2 rounded-md mt-7 text-white font-bold w-full" type="submit">Login</button>
            </form>
            <Link to={'/creatuser'}>
              <p className="text-left mt-5 font-light text-blue-600">Create new Account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login