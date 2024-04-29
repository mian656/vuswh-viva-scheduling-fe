import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import Layout from "@/Components/layouts/Layout";


const provinces = () => {
    const [provinces, setProvinces] = useState([]);
    const [isError, setIsError] = useState("");

    useEffect(() => {

        axios.get("/provinces/pagedata")
            .then(
                (list) => {
                    setProvinces(list.data.data);
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
                    <h2 className="ml-8 mt-8 font-bold text-3xl text-slate-600">Provinces List</h2>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-24 ml-5 mr-5 mt-5">
                        <table class="w-full text-sm text-left rtl:text-right mt-8 text-black  dark:text-gray-400">
                            <thead class="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                <tr className='text-center'>

                                    <th scope="col" class="px-6 py-3">
                                        SR#
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Provinces
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {provinces.map((province, serial) => (
                                    <tr key={province.id} class="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                        <td class="px-6 py-4">
                                            {serial + 1}
                                        </td>
                                        <td class="px-6 py-4">
                                            {province.name}
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

export default provinces
