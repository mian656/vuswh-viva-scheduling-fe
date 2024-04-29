import React from "react";
import { useState, useEffect } from "react";
import Layouts from "@/Components/layouts/lay";
import axios from "axios";
import Layout from "@/Components/layouts/Layout";

const supervisors = () => {
  const [supervisor, setSupervisor] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("/supervisors/pagedata")
      .then((res) => {
        setSupervisor(res.data.data);
        // console.log(res.data.data)
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  console.log(supervisor);

  const edit = () => {};

  return (
    <div>
      <Layout>
        {/* {isError != "" && <h3>{(isError)}</h3>} */}
        <h1 className="ml-4 mt-5 font-bold text-4xl">Supervisor</h1>
        <h2 className="ml-8 mt-2 text-2xl">Supervisors List</h2>
        <div class="relative overflow-x-auto rounded-3xl  shadow-md sm:rounded-lg">
          {/* <table class=" justify-center items-center w-full mt-5 overflow-y-scroll mon-screen-bottom border-2 p-5 bg-white text-blue-700 rounded-xl">
            <thead class="text-lg h-16 gap-2 items-center justify-between divide-y divide-blue-700">
              <tr className="gap-10 items-center justify-between bg-slate-300">
                <th scope="col" class="px-6 py-3">
                  Sr#
                </th>
                <th scope="col" class="px-6 py-3">
                  Supervisor
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Skype
                </th>
                <th scope="col" class="px-6 py-3">
                  Campus
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-700">
              {supervisor.map((sup, serial) => (
                <tr class="text-center" key={sup.id}>
                  <td
                    scope="row"
                    class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium "
                  >
                    {serial + 1}
                  </td>
                  <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                    {sup.name}
                    <br/>
                    {sup.designation?.name}
                    <br/>
                    {sup.user?.phoneno}
                  </td>
                  <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                    {sup.user?.email}
                  </td>
                  <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                    {sup.skype_id}
                  </td>
                  <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                    {sup.campus?.name}
                  </td>
                  <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium flex">
                    <svg
                      onClick={edit}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="blue"
                      class="w-6 h-6 ml-4 cursor-pointer"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}

          <table class="w-full text-sm text-left rtl:text-right mt-5 text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 text-center uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  SR#
                </th>
                <th scope="col" class="px-6 py-3">
                  Supervisor
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Skype
                </th>
                <th scope="col" class="px-6 py-3">
                  Campus
                </th>
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {supervisor.map((sup, serial) => (
                <tr
                  key={sup.id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td class="px-6 py-4 text-center">{serial + 1}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {sup.name}
                    <br />
                    {sup.designation?.name}
                    <br />
                    {sup.user?.phoneno}
                  </th>

                  <td class="px-6 py-4 text-center">{sup.user?.email}</td>
                  <td class="px-6 py-4">{sup.skype_id}</td>
                  <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                    {sup.campus?.name}
                  </td>
                  <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium flex">
                    <svg
                      onClick={edit}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      class="w-6 h-6 ml-32 cursor-pointer"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default supervisors;
