import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios from 'axios';

const fireSwal = (icon, title, message) => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: message,
  });
};

const verifyaccount = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const postData = async () => {
    const patchURL = `/auth/verifyaccount/${token}`;
    if (password === confirmPassword) {
      try {
        const res = await axios.patch(patchURL, {
          password: password,
          confirmPassword: confirmPassword,
        });
        console.log(res);
        fireSwal('success', 'Success!', 'Password Set!');
        router.push('/login');
      } catch (err) {
        console.log(err);
        fireSwal('error', 'An error occurred!', err.response.data.message);
      }
    } else {
      console.log('password does not match');
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8 || password.length > 16) {
      errors.password = 'Password must be between 8 and 16 characters.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}/.test(password)) {
      errors.password = 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      postData();
    } else {
      setErrors(errors);
    }
  };

  const handleCancel = () => {
    // Go back to the previous page
    router.back();
  };

  return (

    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full p-6 bg-white border-black border-4 rounded-xl shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create Password
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input type="password" name="password" id="password" placeholder="Create New Password" value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors({}); }} class="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            {errors.password && <div className="text-red-600 -mt-5 text-sm">{errors.password}</div>}
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
              <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors({}); }} className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            {errors.confirmPassword && <div className="text-red-600 text-sm">{errors.confirmPassword}</div>}
            <div className="flex items-start">


            </div>

            <div className='justify-center flex'>
            <button type="submit" className="px-10 text-white mb-5 rounded-xl ml-5 w-32 text-center  float-right hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium bg-blue-600 hover:bg-primary-700  focus:outline-none   text-sm  py-2.5 dark:focus:ring-primary-800 ">Submit</button>
              <button type="button" onClick={handleCancel} className="px-10 text-white mb-5 rounded-xl ml-5 float-right w-32 text-center hover:scale-105 duration-300 hover:bg-[#282929] font-medium  py-2.5  bg-gray-700 hover:bg-primary-700  focus:outline-none text-sm dark:focus:ring-primary-800">Cancel</button>
             
            </div>


          </form>
        </div>
      </div>
    </section>




  );
};

export default verifyaccount;
