import { useState } from "react";
import React from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";


const Forgotp = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState();
  // const [isFormValid, setIsFormValid] = useState(false);

  const postData = () => {
    const payload = {
      "email": email,
    };
    axios.post('/users/forgotPassword', payload)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        });
        console.log(res.data);
        console.log('Sent Email successfully!');
        router.push('/login')
      })
      .catch((err) => {
        setIsError(err.response.data.message);
        Swal.fire({
          icon: "error",
          title: "An Error Occured",
          text: err.response.data.message,
        });
        // console.log(err)
        console.log(err.response.data.message)

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

    setErrors(errors);
    if (Object.keys(errors).length == 0) {
      return true;
    } else {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      postData();
    }

  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full p-6 bg-white border-black border-4 rounded-xl shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}

              <div className="flex items-start">


              </div>
              <div>
                <button type="submit" className="float-right px-10 text-white hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium bg-blue-600 hover:bg-primary-700  focus:outline-none  rounded-xl text-sm  py-2.5 text-center  dark:focus:ring-primary-800">Continue</button>

              </div>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Forgotp
