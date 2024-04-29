import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";

const fireSwal = (icon, title, message) => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: message,
  });
};

const change = () => {
  const router = useRouter();
  // const {Bearer_token} = router.query;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setIsError] = useState("");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  console.log(accessToken);

  const postData = async () => {
    const patchURL = `/users/changePassword/`;

    if (newPassword === confirmPassword) {
      axios
        .patch(
          patchURL,
          {
            oldPassword: oldPassword,
            password: newPassword,
            confirmPassword: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          fireSwal("sucess", "Sucess!", " Password Set!");
          // router.push('/login');
        })
        .catch((err) => {
          console.log(err);
          fireSwal("error", "An error Occured!", err.response.data.message);
        });
    } else if (oldPassword !== userPassword) {
      fireSwal(
        "error",
        "Incorrect Old Password",
        "Please enter the correct old password."
      );
    }
  };
  const validateForm = () => {
    let errors = {};

    if (!oldPassword) {
      errors.oldPassword = "Old password is required";
    }
    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 8 || newPassword.length > 16) {
      errors.newPassword = "Password must be between 8 and 16 characters.";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}/.test(
        newPassword
      )
    ) {
      errors.newPassword =
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    const errors = validateForm();
    if (Object.keys(errors).length == 0) {
      await postData();
      router.push("/dashboard");
      setIsError({});
    } else {
      setIsError(errors);
    }
   
  };
  const handleCancel = () => {
    // Go back to the previous page
    router.back();
  };

  return (
    <>
      {/* <main className="  bg-cover min-h-screen flex box-border justify-center items-center">
        <div className=" sm:text-center min-[320px]:text-center max-[600px] w-[35rem] h-[25rem] outline-opacity-80 bg-white text-blue-700 border-opacity-5 border-solid border-8 border-gray-700 rounded-3xl max-w-2xl items-center">
          <h2 className="font-bold text-center pt-14 p-2 text-3xl mt-5">
            Change Password
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 items-center justify-between"
          >
            <div className="relative mt-2">
              <input
                className="border m-1 w-96 h-12 p-2 pl-4 outline-2 outline outline-gray-400 border-gray-50 rounded-xl"
                type="password"
                name="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                id="oldPassword"
              />
            </div>
            <div className="relative">
              <input
                className="border  m-1 w-96 h-12 p-2 pl-4 outline-2 outline outline-gray-400 border-gray-50 rounded-xl"
                type="password"
                name="password"
                placeholder="Create New Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
              />
            </div>
            <div className="relative">
              <input
                className="p-2 border w-96 h-12 pl-4 outline-2 outline outline-gray-400 border-gray-50 rounded-xl"
                type="password"
                name="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex space-x-3 p-2 mt-8">
              <button
                className=" text-[#eeeff1] p-2 w-24 px-7 bg-blue-700  rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
                type="submit"
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                className=" text-[#eeeff1] p-2 w-24 px-7 bg-blue-700  rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main> */}

      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full p-6 bg-white border-black border-4 rounded-xl shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              onSubmit={handleSubmit}
              class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              action="#"
            >
              <div>
                <label
                  for="old-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  name="old-password"
                  id="old-password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  class="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {Error.oldPassword && (
                  <div className="text-red-600 text-sm">
                    {Error.oldPassword}
                  </div>
                )}
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Create New Password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  class="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {Error.newPassword && (
                  <div className="text-red-600 text-sm">
                    {Error.newPassword}
                  </div>
                )}
              </div>
              {/* {errors.password && <div className="text-red-600 -mt-5 text-sm">{errors.password}</div>} */}
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  class="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                {Error.confirmPassword && (
                  <div className="text-red-600 text-sm">
                    {Error.confirmPassword}
                  </div>
                )}
              </div>
              {/* {errors.confirmPassword && <div className="text-red-600 text-sm">{errors.confirmPassword}</div>} */}
              <div class="flex items-start"></div>

              <div className="justify-center flex">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-10 text-white mb-5 rounded-xl ml-5 float-right w-32 text-center hover:bg-[#282929] font-medium  py-2.5  bg-gray-600 hover:bg-primary-700  focus:outline-none text-sm dark:focus:ring-primary-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-10 text-white mb-5 rounded-xl ml-5 w-32 text-center  float-right hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium bg-blue-600 hover:bg-primary-700  focus:outline-none   text-sm  py-2.5 dark:focus:ring-primary-800 "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default change;
