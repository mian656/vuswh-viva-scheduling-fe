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

const semestervivadetails = () => {
  const [semester, setSemester] = useState("");
  const [semester_viva_start_date, setDate] = useState("");
  const [viva_slot_duration, setSlot] = useState("");
  const [viva_slot_gap, setGap] = useState("");
  const [regular_break_from, setRegbreak] = useState("");
  const [regular_break_to, setBreakto] = useState("");
  const [friday_break_from, setFridaybreak] = useState("");
  const [friday_break_to, setFridaybreakto] = useState("");
  const [is_saturday, setSaturday] = useState(false);
  const [is_sunday, setSunday] = useState(false);
  const [Error, setIsError] = useState("");

  useEffect(() => {
    axios
      .get("/semesterViva/create")
      .then((res) => {
        setSemester(res.data);
        console.log(res.data);
        // console.log(res.data.data)
      })
      .catch((error) => {
        setIsError(error.message);
      });
  }, []);

  // useEffect section

  //2nd useeffect for city based on prov.

  // console.log(province)

  //router code
  const mainList = () => {
    router.push("/campuses");
  };

  //post request
  const postData = async () => {
    axios
      .post("/semesterViva/create", {
        semester_viva_start_date: semester_viva_start_date,
        viva_slot_duration: viva_slot_duration,
        viva_slot_gap: viva_slot_gap,
        regular_break_from: regular_break_from,
        regular_break_to: regular_break_to,
        friday_break_from: friday_break_from,
        friday_break_to: friday_break_to,
        is_saturday: is_saturday,
        is_sunday: is_sunday,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        });
        console.log(res);
      });
    // .catch((error) => {
    //   console.log(error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: error,
    //   });
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div>
      <div className="text-white font-bold text-4xl m-8 2xl:text-5xl 2xl:mt-12 xl:text-4xl lg:text-4xl md:text-3xl sm:text-xl ml-32">
        Semester Viva Details
      </div>
      <div className="container-fluid border-8 border-slate-300 mx-36 h-[730px] 2xl:mt-20 2xl:mx-36 xl:mx-36 xl:mt-12 lg:mx-36 lg:mt-16 md:mx-16 sm:mx-10">
        <div className="flex -mb-5 mt-28 ml-20">
          <label
            htmlFor="semester"
            className="block text-md font-medium text-[1.34rem] dark:text-white text-center"
          >
            Semester :
          </label>
        </div>
        <div className="flex mt-20 h-10 ml-20">
          <label
            htmlFor="start_date"
            className="block text-md font-medium text-[1.34rem] dark:text-white text-center"
          >
            Semester Viva :
          </label>
        </div>
        <div className="flex mt-20 h-10 ml-20">
          <label
            htmlFor="start_date"
            className="block text-md font-medium text-[1.34rem] dark:text-white text-center"
          >
            Break :
          </label>
        </div>
        <button
          type="submit"
          className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-40 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                2xl:w-32 2xl:text-xl xl:w-28 xl:mr-40 lg:w-24 lg:mr-12 md:mr-16 md:w-20 mt-72"
        >
          Update
        </button>
        <button
          type="button"
          className="text-white mb-16 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                2xl:w-32 2xl:text-xl xl:w-28 lg:w-24 md:w-20 mt-72"
          onClick={mainList}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default semestervivadetails;
