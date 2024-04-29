import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import Layouts from "@/Components/layouts/lay";
import Layout from "@/Components/layouts/Layout";
import axios from "axios";
// import Layout from "@/Components/layouts/Layout";
import KeepMountedModal from "../modal";
import Link from "next/link";

const semesterviva = () => {
  const [semestervivadetails, setSemesterViva] = useState([]);
  const [semesterviva, setSemester] = useState([]);
  const [semester, setSemesters] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get("/semesterViva/pagedata")
      .then((res) => {
        setSemester(res.data.data);
        setSemester(res.data.data.meta.pageCount);
        // console.log(res.data.data)
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

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

  console.log(semester);
  // const post = async()=>{
  //   axios.post("/semesters/add",{
  //     "code": code,
  //     "start_date": start_date,
  //     "end_date": end_date
  //   },
  //   {
  //     headers:{
  //         "Content-Type": "application/json"
  //     }
  //   }).then((res)=>{
  //     console.log(res)
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }
  // const submit = (e) => {
  //     e.preventDefault();
  //     post();
  //   };

  const viva_schedule = (id) => {
    const vivaschedulelist = `/viva_schedule/vivaschdule/` + id;
    console.log(vivaschedulelist);
  };

  const Update = (uid) => {
    const updateUserLink = "/details" + uid;
    console.log(updateUserLink);
  };
  const Addsem = () => {
    const addSemester = "/add";
    console.log(addSemester);
  };
  const pop = () => {
    const { value: formValues } = Swal.fire({
      title: "Add Semester Viva",
      html: (
        <form>
          <label class="text-lg text-blue-600 float-left ml-24">
            Semester Code*
          </label>
          <input
            type="text"
            id="swal-input1"
            class="swal2-input mt-1"
            placeholder="Semester Code"
            required
          />
          <label class="text-lg text-blue-600 float-left ml-24">
            Start Date*
          </label>
          <input
            type="date"
            id="swal-input2"
            class="swal2-input w-[270px] mt-1"
            placeholder="Start Date"
            format="[yyyy-]"
            required
          />
          <label class="text-lg text-blue-600 float-left ml-24">
            End Date*
          </label>
          <input
            type="date"
            id="swal-input3"
            class="swal2-input w-[270px] mt-1"
            placeholder="End Date"
            required
          />
        </form>
      ),
      focusConfirm: false,
    });
    if (formValues) {
      // Use Axios to send an HTTP POST request
      try {
        const response = axios.post("/semesters/add", formValues);

        // Display success message using SweetAlert
        Swal.fire({
          title: "Success!",
          text: "Data posted successfully",
          icon: "success",
        });
      } catch (error) {
        // Display error message using SweetAlert
        Swal.fire({
          title: "Error!",
          text: "An error occurred while posting data",
          icon: "error",
        });
      }
    }
  };

  const activeSemester = (e, uid) => {
    Swal.fire({
      title: "Activate/ Deactivate Semester Viva",
      text: "You want to activate or deactivate semester viva",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Activate",
      denyButtonText: `Deactivate`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const activate =
          "semesterViva/ActivateDeactivate/" + uid + "?action=activate";
        await axios.patch(activate);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        const deactivate =
          "semesterViva/ActivateDeactivate/" + uid + "?action=deactivate";
        await axios.patch(deactivate);
        Swal.fire("Changes are  saved", "", "success");
      }
    });
  };
  return (
    <div>
      <div className="bg-white">
        <Layout>
          <div className="text-white text-center ml-7 w-full font-bold text-3xl mt-7">
            Semester Viva
          </div>
          <div className="bg-slate-400 w-full mt-20 flex justify-end">
            <button
              type="button"
              className="bg-[#4d41eb] w-15 h-15 text-[#eeeff1] p-2 rounded-md hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
            >
              <a href="/semesterviva/create">+ Semester Viva</a>{" "}
            </button>
          </div>

          <div class="relative overflow-x-auto rounded-3xl  shadow-md sm:rounded-lg">
            <table class=" justify-center items-center w-full mt-16  overflow-y-scroll border-2 p-5 bg-white text-blue-700 rounded-xl">
              <thead class="text-lg h-16 gap-2 items-center justify-between divide-y divide-blue-700">
                <tr className="gap-10 items-center justify-between bg-slate-300">
                  <th scope="col" class="px-6 py-3">
                    Sr#
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Semester
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-700">
                {semesterviva.map((sem, serial) => (
                  <tr class="text-center" key={sem.id}>
                    <td
                      scope="row"
                      class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium "
                    >
                      {serial + 1}
                    </td>
                    <td className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                      {sem.semester?.code}
                    </td>
                    <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                      {sem.semester_viva_start_date}
                    </td>
                    <td class="px-6 py-4 h-16 border-blue-800 y-2 text-[0.95rem] font-medium">
                      {sem.status}
                    </td>
                    <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium flex -ml-24">
                      {sem.status === "open" && (
                        <Link href={"/Viva_Schedule/vivaschdule/" + sem.id}>
                          <svg
                            onClick={viva_schedule}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 ml-64 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                            />
                          </svg>
                        </Link>
                      )}
                      {/* <KeepMountedModal /> */}
                      {sem.status === "open" && (
                        <a href={"/semesterviva/status/" + sem.id}>
                          <svg
                            onClick={Update}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="blue"
                            class="w-6 h-6 ml-1 cursor-pointer"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                          </svg>
                        </a>
                      )}
                      {sem.status === "open" && (
                        <a href={"semesterviva/details/" + sem.id}>
                          <svg
                            onClick={Update}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 ml-1  cursor-pointer"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </a>
                      )}
                      {sem.status !== "open" && (
                        <a href={"semesterviva/details/" + sem.id}>
                          <svg
                            onClick={Update}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 ml-[275px]  cursor-pointer"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="container-fluid flex border-2  border-blue-600 bg-opacity-70 mt-6 rounded-xl mx-4 w-[1100px] bg-blue-700">
            <select className="ml-5 w-16 rounded-lg h-10 mt-1 text-black">
              {" "}
              <option selected>10 </option>
              <option value="1">20</option>
            </select>{" "}
            <span className="text-white flex-col text-xs ml-2 mt-1">
              User Per Page
            </span>
            <div className="text-white text-center -mt-1 ml-[300px]">
              Page{" "}
              <span className="bg-white text-black flex-col flex text-center">
                1
              </span>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-base float-right ml-72 mr-3 mt-1  h-10">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default semesterviva;
