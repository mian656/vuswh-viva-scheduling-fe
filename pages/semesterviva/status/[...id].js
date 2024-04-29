import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Swal from "sweetalert2";
import semesterviva from "..";
import { useAuth } from "../../../contexts/AuthContext";

export async function getServerSideProps(context) {
  const { params } = context;
  const data = await axios.get(`/semesterViva/SemesterVivaClose/${params.id}`);
  const semester = data.data.record.semester;
  const status = data.data.status;
  const records = data.data;
  console.log(data.data.record.semester_viva_start_date);
  const date = data.data.record.semester_viva_start_date;
  return {
    props: {
      id: params.id,
      semesterRecord: semester,
      statusRecord: status,
      start_date: date,
    },
  };
}

const statusUpdate = ({
  id,
  semesterRecord,
  statusRecord,
  semestervRecord,
  start_date,
}) => {
  const router = useRouter();
  const [status, setStatus] = useState(statusRecord.value || "");
  const [semester, setSemester] = useState(semesterRecord.semester);
  const [start, setStart] = useState(start_date);
  const [error, setError] = useState("");
  const { accessToken } = useAuth();
  console.log("layout user checking", accessToken);

  // useEffect(() => {
  //   axios
  //     .get("/provinces/lookup")
  //     .then((res) => {
  //       setProvinces(res.data);
  //       //   console.log(res.data)
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       // console.log(error.data);
  //     });
  // }, []);

  const updates = () => {
    console.log("testinggg", status);
    axios
      .patch(
        `/semesterViva/SemesterVivaClose/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "An error occurred",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updates();
  };

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
  const formattedDate = formatDate(start);
  console.log(formattedDate);
  console.log(start);
  // useEffect section
  console.log(statusRecord);
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

  return (
    <div className="bg-white min-h-screen mt-0 pt-10">
      <div>
        <div className="text-white font-bold text-4xl 2xl:text-5xl 2xl:mt-12  xl:text-4xl lg:text-4xl md:text-3xl sm:text-xl ml-32"></div>
        <div className="container-fluid border-8 border-blue-700 mx-36 h-[560px] 2xl:mt-20 2xl:mx-36 xl:mx-80 xl:mt-12 lg:mx-36 lg:mt-16 md:mx-16 sm:mx-10">
          <div className="flex justify-center -mb-5 mt-20">
            <label
              htmlFor="semester"
              className="block text-2xl font-medium text-[1.65rem] text-blue-700 text-center border-b pb-4 border-black"
            >
              Semester Viva open/close
            </label>
          </div>
          <div className="flex  justify-center mt-20">
            <label
              htmlFor="start_date"
              className="block text-md text-blue-700 text-center border-b border-black"
            >
              Semester Viva : {semesterRecord.code}
            </label>
          </div>
          <div className="flex justify-center mt-5 ">
            <label
              htmlFor="start_date"
              className="block text-md  text-blue-700 text-center border-b border-black"
            >
              Start Date : {formattedDate}
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-5 flex-col items-center">
              <label
                htmlFor="status"
                className="block text-md text-blue-700 text-center border-black"
              >
                Semester Viva Status
                <br />
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 bg-gray-50 focus:outline-none border outline-2 outline-gray-500 outline border-gray-50 text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 w-52 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="open">open</option>
                <option value="closed">closed</option>
              </select>
            </div>

            <button
              type="submit"
              className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-40 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        2xl:w-32 2xl:text-xl xl:w-28 xl:mr-10 lg:w-24 lg:mr-12 md:mr-16 md:w-20 mt-24"
            >
              Save
            </button>
            <button
              type="button"
              className="text-white mb-16 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        2xl:w-32 2xl:text-xl xl:w-28 lg:w-24 md:w-20 mt-24"
              onClick={goToList}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default statusUpdate;
