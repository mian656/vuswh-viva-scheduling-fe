import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import Layout from "@/Components/layouts/Layout";


const Cities = () => {
    // const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [isError, setIsError] = useState("");

    useEffect(() => {

        axios.get("/cities/pagedata")
            .then(
                (list) => {
                    setCities(list.data.data);              
                    console.log(list.data.data);


                }
            )
            .catch(
                (err) => {
                    setIsError(err.message)
                }
            )
    }, []);


    return (
        <div>
            <Layout>
                {isError != "" && <h3>{(isError)}</h3>}

                <div className=" mt-4 min-[320px]:text-center  w-full h-screen outline-opacity-80 bg-white text-slate-500 ">
                    <h2 className="ml-8 mt-8 font-bold text-3xl text-slate-600">Cities List</h2>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-24 ml-5 mr-5 mt-5">
                        <table class="w-full text-sm text-left rtl:text-right mt-8 text-black  dark:text-gray-400">
                            <thead class="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                <tr className='text-center'>

                                    <th scope="col" class="px-6 py-3">
                                        SR#
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        City
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Province
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map((cities, index) => (
                                    <tr key={cities.id} class="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                        <td class="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <td class="px-6 py-4">
                                            {cities.name}
                                        </td>
                                        <td class="px-6 py-4">
                                            {cities.province.name}
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Cities
