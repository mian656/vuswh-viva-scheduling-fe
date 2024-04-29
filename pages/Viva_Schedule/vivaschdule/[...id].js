import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import Layouts from "@/Components/layouts/lay";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      id: params.id,
    },
  };
}

const vivaschedule = ({ id }) => {
  // const router = useRouter();
  // const { id } = router.query;
  const [vivasch, setVivasch] = useState([]);

  useEffect(() => {
    axios
      .get(`/viva-schedules/pagedata/${id}`)
      .then((res) => {
        console.log(res.data.data);
        console.log(id);
        setVivasch(res.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "error",
          text: error.response.data.message,
        });
      });
  }, [id]);

  return (
    <div>
      <Layouts>
        <div className=" min-[320px]:text-center  w-full md:w-full lg:w-full h-screen md:h-screen lg:h-screen outline-opacity-80 bg-white text-blue-700 border-opacity-5 border-solid border-8 border-blue-800">
          <h2 className="ml-8 mt-8 font-bold text-3xl">Viva Schedule</h2>
          <div className="container rounded-2xl border-2 bg-slate-50 mt-4 border-blue-900 h-44">
            <form>
              <div className="flex">
                <label className="mt-6 ml-3">Semester</label> <br />
                <input
                  className="border m-5 w-60 h-10 p-2  outline-2 outline outline-gray-400 border-gray-50 rounded-2xl"
                  type="text"
                  placeholder="Semesters"
                />
                <label className="mt-6">Start Date</label>
                <input
                  className="border m-5 w-60 h-10 p-2  outline-2 outline outline-gray-400 border-gray-50 rounded-2xl"
                  type="date"
                  placeholder="date"
                />
                <label className="mt-6">End Date</label>
                <input
                  className="border m-5 w-60 h-10 p-2  outline-2 outline outline-gray-400 border-gray-50 rounded-2xl"
                  type="date"
                />
              </div>
              <div>
                <div className="flex">
                  <label className="mt-6 ml-3">Campus</label> <br />
                  <input
                    className="border m-5 w-96 h-10 p-2  outline-2 outline outline-gray-400 border-gray-50 rounded-2xl"
                    type="text"
                    placeholder="Semesters"
                  />
                  <div className="flex space-x-2 p-1 float-right">
                    <button
                      className="bg-[#4d41eb]  text-[#eeeff1] p-2 px-7 h-10 mt-4 w-36 rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
                      type="submit"
                    >
                      Reset
                    </button>
                    <button
                      className="bg-[#4d41eb]  text-[#eeeff1] p-2 px-7  h-10 mt-4 w-36 rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
                      type="submit"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="bg-slate-300 mt-2 h-16">
            <a href={"#"}>
              <button
                // onClick={Addvivasem}
                type="button"
                method="post"
                className="p-2 px-7 w-40 rounded-xl  hover:scale-105 inline-block float-right mr-12 bg-blue-900 mt-3 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
              >
                +Viva Semester
              </button>
            </a>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="justify-center items-center w-full mt-2  border-2 p-5 bg-white text-blue-700 rounded-xl">
              <thead class="h-20 items-center justify-between ">
                <tr className="p3 gap-10 items-center justify-between bg-slate-300">
                  <th scope="col" class="px-6 py-3">
                    Sr
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Campuses
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Semester
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Sessions
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-600">
                {vivasch.map((sch, serial) => {
                  return (
                    <tr className=" text-center h-20 align-middle" key={sch.id}>
                      <td className=" border-blue-800 y-2 px-4 py-1 text-sm ">
                        {serial + 1}
                      </td>
                      <td class="px-6 py-4">{sch.campus?.code}</td>
                      <td class="px-6 py-4">{sch.semester?.code}</td>
                      <td class="px-6 py-4">
                        <ul>
                          <li>{sch.start_date}</li>
                          <li>{sch.end_date}</li>
                        </ul>
                      </td>
                      <td class="px-6 py-4">{sch.parallel_session_count}</td>
                      <td class="px-6 py-4 flex">
                        <a href={"/Viva_Schedule/slots/" + id}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-6 h-6 justify-between align-middle ml-20 hover:cursor-pointer"
                          >
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path
                              fill-rule="evenodd"
                              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Layouts>
    </div>
  );
};
export default vivaschedule;
