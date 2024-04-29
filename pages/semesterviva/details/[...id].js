import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Swal from "sweetalert2";
import semesterviva from ".";

const details = () => {
  const router = useRouter();
  const [semesterviva, setSemesterviva] = useState("");
  const [error, setError] = useState("");
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`/semesterViva/semestervivadetails/${id}`)
        .then((res) => {
          setSemesterviva(res.data);
          // console.log(res.data);
          // console.log(res.data.break_duration_in_minutes);
          // console.log(res.data.includes);
          // console.log(res.data.semesterviva);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error.message);
        });
    }
  }, [id]);

  const goToList = () => {
    router.push("/semesterviva");
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Get month, day, and year
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    // Construct the formatted date string
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }

  // Example usage:
  const formattedDate = formatDate(
    semesterviva.semesterviva &&
      semesterviva.semesterviva.semester_viva_start_date
  );

  // useEffect section

  //2nd useeffect for city based on prov.

  // console.log(province)

  //router code
  //post request

  // .catch((error) => {
  //   console.log(error);
  //   Swal.fire({
  //     icon: "error",
  //     title: "Error",
  //     text: error,
  //   });
  // });

  const semesterv = (id) => {
    router.push`/status/` + id;
  };

  const updateb = () => {
    router.push(`/semesterviva/status/${id}`);
  };

  return (
    <div>
      <div className="bg-white">
        <div className="text-blue-700 font-bold text-4xl m-8 2xl:text-5xl 2xl:mt-12 xl:text-2xl xl:mt-0 xl:pt-5 lg:text-4xl md:text-3xl sm:text-xl ml-32">
          Semester Viva Details
        </div>
        <div className="container-fluid border-8 border-blue-700 mx-36 h-[500px] 2xl:mt-20 2xl:mx-36 xl:mx-56 xl:mt-12 lg:mx-36 lg:mt-16 md:mx-16 sm:mx-10">
          <div className="flex -mb-5 mt-14 ml-32 -mr-36">
            <label
              htmlFor="semester"
              className="block text-2xl font-medium text-[1.65rem] dark:text-white text-center"
            >
              Semester :{" "}
              {semesterviva.semesterviva &&
                semesterviva.semesterviva.semester.code}
              (current Active Semester)
            </label>
          </div>
          <div className="flex  mt-16 h-10 ml-[45px]">
            <label
              htmlFor="start_date"
              className="block text-md font-medium text-[1.34rem] dark:text-white text-center"
            >
              Semester Viva :
              <span className="ml-[40px] text-[1.1rem] text-blue-700">
                {formattedDate}{" "}
              </span>{" "}
              <br />
              <span className="ml-[240px] text-[1.1rem] text-blue-700">
                Viva slot{" "}
                {semesterviva.semesterviva &&
                  semesterviva.semesterviva.viva_slot_duration}{" "}
                mints <span />
              </span>
              <br />
              {/* <span className="text-white mr-[-140px] ml-[54%]">
              Viva slot duration{" "}
              {semesterviva.semesterviva &&
                semesterviva.semesterviva.viva_slot_duration}{" "}
              mints{" "}
            </span> */}
              <span className="ml-[272px] text-[1.1rem] text-blue-700">
                Viva slot gap{" "}
                {semesterviva.semesterviva &&
                  semesterviva.semesterviva.viva_slot_gap}{" "}
                mints <span />
              </span>
              <br />
              <br />
            </label>
          </div>
          <div className="flex mt-24 h-10 ml-[111px] -mb-20">
            <label
              htmlFor="start_date"
              className="block text-md font-medium text-[1.34rem] dark:text-white text-center"
            >
              Break :{" "}
              <span className=" ml-[105px] text-[1.1rem] text-blue-700">
                Regular Break time {semesterviva.break_duration_in_minutes}{" "}
                mints{" "}
              </span>{" "}
              <br />
              <span className="ml-[173px] text-[1.1rem] text-blue-700">
                Friday Break time {semesterviva.friday_time} mints{" "}
              </span>{" "}
              <br />
              <span className="ml-[205px] text-[1.1rem] text-blue-700">
                {semesterviva.includes}
              </span>{" "}
              <br />
              <br />
            </label>
          </div>
          <button
            type="button"
            className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-40 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                2xl:w-32 2xl:text-xl xl:w-28 xl:mr-20 lg:w-24 lg:mr-12 md:mr-16 md:w-20 mt-48"
            onClick={updateb}
          >
            Update
          </button>
          <button
            type="button"
            className="text-white mb-16 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                2xl:w-32 2xl:text-xl xl:w-28 lg:w-24 md:w-20 mt-48"
            onClick={goToList}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default details;
