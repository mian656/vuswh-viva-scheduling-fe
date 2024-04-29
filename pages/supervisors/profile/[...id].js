import React, { useEffect, useState } from "react";
import Layout from "@/Components/layouts/Layout";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";


// import Select from "react-select";

export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      id: params.id
    }
  }
}

function Supervisor({ id }) {
  const router = useRouter()
  const [profile, setProfile] = useState("");
  const [skype_id, setSkype_id] = useState("");
  const [campus, setCampus] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [designation, setDesignation] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("campuses/create")
      .then((res) => {
        const campusOptions = res.data.map((campus) => ({
          value: campus.id,
          label: campus.code,
        }));
        setCampus(campusOptions);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("designations/lookup")
      .then((res) => {
        const designationOptions = res.data.map((designation) => ({
          value: designation.id,
          label: designation.name,
        }));
        setDesignation(designationOptions);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const patch = async () => {
    try {
      const res = await
        axios
          .patch(`/supervisors/updateprofile/${id}`, {
            skype_id: skype_id,
            campus_id: selectedCampus,
            designation_id: selectedDesignation,
          })
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data,
      });
      router.push('/dashboard')
    } catch (err) {
      console.error(err.message);
    }
  };

  //Validation Code
  const validateForm = () => {
    let error = {};

    if (!skype_id) {
      error.skype_id = "Skype id required*";
    } else if (skype_id > 30) {
      error.skype_id = "Id must be atleast 30 characters";
    }
    if (!campus) {
      error.campus = "Campus required*";
    }
    if (!designation) {
      error.designation = "Designation required*";
    }
    setError(error);

    if (Object.keys(error).length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      patch();
    }
  };

  return (
    <div>
      <Layout>
        <div
          className="container-fluid mt-44 border-4 h-60 mx-80 text-center rounded-xl bg-white  border-blue-700 border-opacity-5 
      2xl:mt-72 2xl:mx-[400px] 2xl:w-[700px] 2xl:h-[400px] xl:h-[350px]  xl:mt-28 lg:h-[300px] lg:w-[600px] lg:mx-[200px]
      md:w-96 md:mx-48 md:mt-32"
        >
          <h3 className="text-blue-700 font-bold text-2xl pt-1 2xl:text-3xl 2xl:pt-5 xl:pt-5 xl:text-3xl lg:text-3xl md:text-lg">
            Update Supervisor Profile
          </h3>
          <div className="p-6">
            <form
              class="max-w-sm mx-auto flex flex-col gap-4"
              onSubmit={handleSubmit}
              method="Patch"
            >
              <div>
                <input
                  type="text"
                  id="text"
                  placeholder="Skype id"
                  class="bg-gray-50 border  focus:outline-none border-gray-300 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={skype_id}
                  onChange={(e) => {
                    setSkype_id(e.target.value);
                  }}
                />
              </div>{" "}
              {error.skype_id && (
                <span className="text-red-600 -mt-5 text-sm">
                  {error.skype_id}
                </span>
              )}
              <div>
                {/* <Select
                  id="campus"
                  className="m-1 border outline-2 outline outline-gray-400 border-gray-50 dark:text-black"
                  onChange={(selectedOption) =>
                    setSelectedCampus(selectedOption.value)
                  }
                  options={campus}
                /> */}
                <select
                  id="campus"
                  class="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                >
                  {campus.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>{" "}
              {error.campus && (
                <span className="text-red-600 -mt-5 text-sm">
                  {error.campus}
                </span>
              )}
              <div>
                <select
                  id="designation"
                  class="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                >
                  {designation.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>{" "}
              {error.designation && (
                <span className="text-red-600 -mt-5 text-sm">
                  {error.designation}
                </span>
              )}
              <div>
                <button
                  type="button"
                  className="bg-blue-600 rounded-2xl px-3 mt-4 text-white 2xl:h-12 2xl:text-2xl
            xl:h-10 xl:w-24  xl:text-xl lg:h-8 lg:text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 h-9 rounded-2xl px-3 ml-5 text-white 2xl:h-12 2xl:text-2xl
            xl:h-10 xl:w-24 xl:text-xl lg:h-8 lg:text-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Supervisor;
