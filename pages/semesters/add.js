import Layout from "@/Components/layouts/Layout";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Add = () => {
  const router = useRouter();
  const [semcode, setSemcode] = useState("");
  const [errors, setErrors] = useState("")
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const postData = () => {
    const payload = {
      code: semcode,
      start_date: start_date,
      end_date: end_date,
    };
    axios
      .post("/semesters/add", payload)

      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        });
        console.log(res);
        router.push("/semesters");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      });
  };

  const validateForm = () => {
    let errors = {};
    if (!semcode) {
      errors.semcode = 'code required';
    } 

    if(!start_date){
      errors.start_date = 'Start Date required';
    }

    if(!end_date){
      errors.end_date = 'End Date required';
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
  };

  const goTosemesters = () => {
    router.push("/semesters");
  };





  return (
    <div>
      <Layout>
        {/* <main className="  bg-cover min-h-screen flex box-border justify-center items-center">
          <div className=" ml-56  sm:text-center min-[320px]:text-center max-[600px] w-[35rem] h-[25rem] outline-opacity-80 bg-white text-blue-700 border-opacity-5 border-solid border-8 border-blue-800 rounded-3xl max-w-2xl items-center">
            <h2 className="font-bold text-center mt-4 pt-3 p-3 text-3xl">
              Add Semester
            </h2>
            <form
              className="flex flex-col gap-2 items-center justify-between"
              onSubmit={handleSubmit}
              method="post"
            >
              <div className="relative">
                <input
                  className="p-2 mt-4  border w-96 h-12 pl-4 outline-2 outline outline-gray-400 border-gray-50 rounded-2xl"
                  type="text"
                  name="semcod"
                  placeholder="Semester Code"
                  value={semcode}
                  onChange={(e) => {
                    setSemcode(e.target.value);
                  }}
                />
              </div>
              <div className="relative">
                <input
                  className="p-2 mt-4  border w-96 h-12 pl-4 outline-2 outline outline-gray-400 border-gray-50 rounded-2xl"
                  type="date"
                  name="date"
                  value={start_date}
                  onChange={(e) => {
                    setStart_date(e.target.value);
                  }}
                />
              </div>

              <div className="relative">
                <input
                  className="p-2 mt-4 border w-96 h-12 pl-4 outline-2 outline outline-gray-400 border-gray-50 rounded-2xl"
                  type="date"
                  name="date"
                  onChange={(e) => {
                    setEnd_date(e.target.value);
                  }}
                  value={end_date}
                />
              </div>

              <div className="flex mt-5 space-x-5 p-0">
                <button
                  className="bg-[#4d41eb]  text-[#eeeff1] p-2 px-7   rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="bg-[#4d41eb]  text-[#eeeff1] p-2 px-7   rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
                  type="button"
                  onClick={goTosemesters}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main> */}
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 border-2 border-black rounded-xl sm:p-8">
              <h1 class="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Add Semester
              </h1>
              <form onSubmit={handleSubmit}
              method="post"
              class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester Code</label>
                      <input type="text"
                       name="code"
                       id="code"
                       value={semcode}
                      onChange={(e) => {
                    setSemcode(e.target.value);
                  }}
                       class="bg-gray-50 border border-gray-300 outline outline-2 outline-gray-500 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Fall 2023" required="" />
                  </div>
                  {errors.semcode && <span className="text-red-600 text-sm">{errors.semcode}</span>}
                  <div>
                      <label for="start_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                      <input type="date"
                        name="start_date"
                        id="start_date"
                        value={start_date}
                        onChange={(e) => {
                    setStart_date(e.target.value);
                  }} placeholder=""
                     class="bg-gray-50 border border-gray-300 outline outline-2 outline-gray-500 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  {errors.start_date && <span className="text-red-600 text-sm">{errors.start_date}</span>}
                  <div>
                      <label for="end_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                      <input type="date"
                       name="end_date"
                        id="end_date"
                        onChange={(e) => {
                          setEnd_date(e.target.value);
                        }}
                         placeholder=""
                         class="bg-gray-50 border border-gray-300 outline outline-2 outline-gray-500 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  {errors.end_date && <span className="text-red-600 text-sm">{errors.end_date}</span>}
                  <div className="flex mt-5 ml-12 space-x-5 p-0">
                  <button type="submit"
                   class="w-32 text-white rounded-xl  hover:scale-105 duration-300 hover:bg-[#1a3f49] bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Save
                  </button>

                  <button type="button"
                  onClick={goTosemesters}
                  class="w-32 text-white rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none  font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Cancel
                  </button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</section>

      </Layout>
    </div>
  );
};


export default Add;
