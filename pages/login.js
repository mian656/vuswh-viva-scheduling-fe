import { useState } from "react";
import Link from 'next/link';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Image from "next/image";

import { useAuth } from "../contexts/AuthContext";


const SignIn = () => {
  const { login } = useAuth();
  const router = useRouter()
  const { param1, param2 } = router.query;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const postData = () => {
    const payload = {
      "email": email,
      "password": password
    };


    //   const res = axios.post("/auth/login" , payload)
    //   console.log(res)
    //   const {roles, id} = res.data.user
    //   if(roles.some(role=> role.name === "Supervisor")){
    //     const res = axios.get(`/supervisors/supervisorObj/${id}`)
    //     const {skype_id, campus, designation, id: supId} = res.data
    //     if(!skype_id || !campus || !designation){
    //       router.push(`/supervisors/profile/${supId}`)
    //     } else {
    //       router.push('/dashboard')
    //     }
    //   } else {
    //     router.push('/dashboard')
    //   }



    axios.post("/auth/login", payload)
      .then((res) => {
        login(res.data); // Save user data and access token to context
        console.log("login response checking", res.data);
        const { roles, id } = res.data.user
        console.log(res.data.user.roles);
        if (roles.some(role => role.name === "Supervisor")) {
          axios.get(`/supervisors/supervisorObj/${id}`)
            .then((res) => {
              const { skype_id, campus, designation, id: supId } = res.data
              if (!skype_id || !campus || !designation) {
                router.push(`/supervisors/profile/${supId}`)
              } else {
                router.push('/dashboard')
              }
            })
        } else {
          router.push('/dashboard')
        }
        console.log('Login successfully!');
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('uid', res.data.user.id);
        localStorage.setItem('email', res.data.user.email);
        // router.push('/dashboard')
      })
      .catch((err) => {
        // setIsError(err.message);
        console.log(err.response.data.message)
        Swal.fire({
          icon: "error",
          title: "The following error occured",
          text: err.response.data.message,
        });

      })
  }

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = 'Email is required.';
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }
    else if (!/\S+@(vu\.edu\.pk|VU\.EDU\.PK)$/.test(email)) {
      errors.email = 'Email must be @vu.edu.pk or @VU.EDU.PK';
      // errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required.';
    }
    else if (password.length < 8) {
      errors.password = 'Password must be at least 8 .';
    }
    else if (password.length > 17) {
      errors.password = 'Password must be less than equal to 16 characters .';
    }
    // else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/.test(password)) {
    //   errors.password = 'Password must be at least one uppercase letter, one lowercase letter, one number, and one special character(. @ # etc).';
    // }
    return errors;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      postData();
    } else {
      setErrors(errors);
    }

  }


  return (
    <>
      {/* <main className="  bg-cover min-h-screen flex box-border justify-center items-center">

        <div className=" sm:text-center min-[320px]:text-center max-[600px] w-[35rem] h-[25rem] outline-opacity-80 bg-white text-blue-700 border-solid border-8 border-blue-700 rounded-3xl max-w-2xl">
          <a href="/">
            <Image src='/logo.png' alt="viva" height={30} width={80}
              className="ml-56"></Image></a>
          <h2 className="font-bold text-center text-3xl text-blue-700">Sign In</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 items-center justify-between">

            <input className="m-5 w-96 h-12 p-2 pl-4 outline-2 outline outline-gray-400 border-2 border-gray-50 rounded-2xl"

              type="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              id="email"
            />
            {errors.email && <div className="text-red-600 -mt-5 text-sm">{errors.email}</div>}

            <div className="relative">
              <input className="p-2 border w-96 h-12 pl-4 outline-2 outline outline-gray-400 border-gray-50 rounded-2xl"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
              {errors.password && <div className=" text-red-600 text-sm">{errors.password}</div>}

            </div>

            <Link className=" text-sm text-red-600 ml-64 font-semibold playfair tooltip" href="/forgot-password">
              Forgot password?
            </Link>

            <button
              type="submit"
              className="
                bg-[#c5c1ff] 
                w-96 h-12 
                text-[#eeeff1] 
                p-2 
                px-7 
                rounded-xl 
                hover:scale-105 
                duration-300 
                hover:bg-[#1a3f49] 
                font-medium"
            >
              Sign in
            </button>
          </form>

        </div>
      </main> */}

<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div class="w-full bg-white rounded-lg border-2 border-black shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a href="#" class="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-32 h-24" src='/logo.png' alt="logo" />   
      </a>
              <h1 class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in 
              </h1>
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                      name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl outline outline-2 outline-gray-500 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="User@vu.edu.pk" required="" />
                  </div>
                  {errors.email && <div className="text-red-600 -mt-5 text-sm">{errors.email}</div>}
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password"
                       name="password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                      id="password" placeholder="Enter your Password" class="bg-gray-50 border border-gray-300 outline outline-2 outline-gray-500 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  {errors.password && <div className=" text-red-600 text-sm">{errors.password}</div>}
                  <div class="flex justify-center items-center">
                  <Link className="text-sm text-red-600 font-semibold playfair tooltip ml-auto" href="/forgot-password">
              Forget password?
            </Link>
          </div>
                  <button type="submit"
                   class="w-full text-white bg-blue-600 hover:scale-105 duration-300 hover:bg-[#1a3f49] rounded-xl hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>


{/* <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg border-2 border-black shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <a href="#" class="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-32 h-24" src='/logo.png' alt="logo" />   
        </a>
        <h1 class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in 
        </h1>
        <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email"
                   value={email}
                   onChange={(e) => { setEmail(e.target.value) }}
                   name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl outline outline-2 outline-gray-500 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="User@vu.edu.pk" required="" />
          </div>
          {errors.email && <div className="text-red-600 -mt-5 text-sm">{errors.email}</div>}
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password"
                   name="password"
                   value={password}
                   onChange={(e) => { setPassword(e.target.value) }}
                   id="password" placeholder="Enter your Password" class="bg-gray-50 border border-gray-300 outline outline-2 outline-gray-500 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
          </div>
          {errors.password && <div className=" text-red-600 text-sm">{errors.password}</div>}
          <div className="flex">
          <Link className="text-sm text-red-600 ml-auto font-semibold playfair tooltip" href="/forgot-password">
            Forget password?
          </Link>
          </div>
          <button type="submit"
                  class="w-full text-white bg-blue-600 hover:scale-105 duration-300 hover:bg-[#1a3f49] rounded-xl hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</section> */}

    </>
  );
}

export default SignIn