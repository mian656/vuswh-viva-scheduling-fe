import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useRouter } from "next/router";
import Layout from '@/Components/layouts/Layout';
import fetchindData from './fetchindData';
import { useSearchParams } from 'next/navigation';



export async function getServerSideProps() {
    const data = await axios.get("/campuses/pagedata");
    return {
        props: {
            data: data.data,
        }
    }
}



const list = ({ data }) => {
    const searchParams = useSearchParams();

    //decalre usestate section
    const [campus, setCampus] = useState([]);
    const [error, setError] = useState("");
    const [city, setCity] = useState([]);
    const [meta, setMeta] = useState(data.meta);
    const [page, setPage] = useState(data.meta);
    const [search, setSearch] = useState([]);

    //Use-effect portion
    useEffect(() => {
        setCampus(data.data);
        setCity(data.data.map((item) => item.city.name))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "search": search,
            // "city": city,
        }

        const filteredData = await fetchindData(data, searchParams);
        console.log(filteredData.data)
        setCampus(filteredData.data)
        setMeta(filteredData.meta)
    }

    return (
        <div>

            <Layout>
                <div className='text-slate-700 text-3xl  font-bold m-5'>Campuses</div>
                <h3 className='text-slate-700 text-xl ml-10 pt-0'>Campuses List</h3>
                {/* <div className='container-fluid rounded-2xl border-4 mx-0 bg-slate-50 border-blue-900 h-44'>

                        <form>
                            <div className="grid gap-6 mb-6 md:grid-cols-2 m-4 ml-20">

                                <div className="mb-3">
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>

                                    <div class="relative mb-4 flex w-96  flex-wrap items-stretch">
                                        <input
                                            type="search"
                                            className="relative ml-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-gray-500 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                            placeholder="Search"
                                            aria-label="Search"
                                            aria-describedby="button-addon1"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }}
                                            value={search} />


                                        <button
                                            className="relative z-[2]  flex items-center rounded-r bg-gray-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                                            type="button"
                                            id="button-addon1"
                                            data-te-ripple-init
                                            data-te-ripple-color="light">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-5 w-5">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                    <select id="city" className="bg-gray-50 mt-0 border flex border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {city.map((cityName) => (
                                            <option key={cityName.id} value={cityName}>
                                                {cityName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="inline-block rounded-xl float-right bg-red-500 mr-10 px-6 pb-2 pt-2 -mt-5 text-sm font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-block rounded-xl float-right mr-3 bg-blue-500 px-6 pb-2 pt-2 -mt-5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            >
                                Apply
                            </button>
                        </form>
                    </div> */}

                {/* <div className='relative m-6 p-5 bg-gray-500 text-blue-700 overflow-hidden rounded-2xl'>
                    <input type='checkbox' className='absolute peer top-0 inset-x-0 w-full h-12 z-10  cursor-pointer opacity-0' />
                    <div className=' bg-gray-500    text-black h-12 w-full pl-5 flex items-center'>
                        <h1 className='text-lg font-bold bg-gray-500 text-black'>Filters</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div className='bg-white text-blue-700 overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40'>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 m-4 ml-20">
                        <div className='p-4'>
                        <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>

<div class="relative mb-4 flex w-96  flex-wrap items-stretch">
    <input
        type="search"
        className="relative ml-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-gray-500 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon1"
        onChange={(e) => {
            setSearch(e.target.value);
        }}
        value={search} />


    <button
        className="relative z-[2]  flex items-center rounded-r bg-gray-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        type="button"
        id="button-addon1"
        data-te-ripple-init
        data-te-ripple-color="light">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd" />
        </svg>
    </button>
</div>
<label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                    <select id="city" className="bg-gray-50 mt-0 border flex border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {city.map((cityName) => (
                                            <option key={cityName.id} value={cityName}>
                                                {cityName}
                                            </option>
                                        ))}
                                    </select>

                            <button type='button' className="border m-4 w-60 h-10 p-2 outline-2 outline outline-gray-400 border-gray-50 rounded-2xl text-lg">Status<label className="relative inline-flex items-center cursor-pointer ml-3">
                                <input type="checkbox" value="" className="sr-only peer " />
                                <div className="w-9 h-5 outline outline-gray-400  border-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-sky-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-sky-200"></div>
                            </label></button><br />
                        </div>

                        <div className='flex space-x-2 p-1 float-right'>
                            <button className="bg-[#4d41eb]  text-[#eeeff1] p-2 px-7   rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium" type="submit">Cancel</button>
                            <button className="bg-[#4d41eb]  text-[#eeeff1] p-2 px-7   rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium" type="submit">Apply Filters</button>
                        </div>
                    </div>
                    </div>
                </div> */}

                <div className='relative m-6 p-5 mt-5 bg-gray-500  text-blue-700 overflow-hidden rounded-2xl'>
                    <input type='checkbox' className='absolute peer top-0 inset-x-0 w-full h-12 z-10 cursor-pointer opacity-0' />
                    <div className='bg-gray-500 text-black h-12 w-full pl-5 flex items-center'>
                        <h1 className='text-lg font-bold bg-gray-500 text-black'>Filters</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div className='bg-white text-blue-700 overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40'>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 m-4 ml-20">
                            <div className='p-4'>
                                <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
                                <div className="relative mb-4 flex w-full  flex-wrap items-stretch">
                                    <input
                                        type="search"
                                        className="relative ml-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-gray-500 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:text-white dark:focus:border-primary"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="button-addon1"
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        value={search} />

                                    <button
                                        className="relative z-[2]  flex items-center rounded-r bg-gray-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                                        type="button"
                                        id="button-addon1"
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5">
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className='p-4'>
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <select id="city" className="bg-gray-50 mt-0 outline outline-2 outline-gray-500 border flex border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {city.map((cityName) => (
                                        <option key={cityName.id} value={cityName}>
                                            {cityName}
                                        </option>
                                    ))}
                                </select>

                                <div className='flex space-x-2 p-1 ml-64 mt-2 mb-0'>
                                    <button className="bg-blue-700 text-[#eeeff1] p-2 px-7 w-36 rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium" type="submit">Cancel</button>
                                    <button className="bg-blue-700 text-[#eeeff1] p-2 px-7 w-36 rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium" type="submit">Apply Filters</button>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
                <div className='bg-gray-500 mt-2 h-16 w-full'>
                    <button
                        type="button"
                        className="inline-block text-black float-right mr-12 rounded-xl hover:scale-105 w-28 bg-white mt-3 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                    ><a href='/campuses/add'>
                            + Add</a>
                    </button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full  text-sm text-center divide-y divide-slate-700 rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                        <thead className="text-xs uppercase text-gray-700 bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-20 py-3">
                                    Sr#
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Campuses
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    City
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {campus.map((cam, ser) => (
                                <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700" key={cam.id}>
                                    <td scope="row" className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                                        {ser + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ul>
                                            <li>{cam.name}</li>
                                            <li>{cam.code}</li>
                                            <li>{cam.phone}</li>
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4">
                                        {cam.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {cam.city && (
                                            <span className="inline-block m-1 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                                {cam.city.name}
                                            </span>
                                        )}

                                    </td>
                                    <td className="px-6 py-4 flex">
                                        <a href={'/campuses/details/' + cam.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 justify-between align-middle ml-28 hover:cursor-pointer">
                                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                            </svg></a>
                                        <a href={'/campuses/update/' + cam.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 hover:cursor-pointer ml-2">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                            </svg></a>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>



                </div>

                {/* <table class="w-full text-sm text-left rtl:text-right mt-5 text-gray-500 dark:text-gray-400">
                    <thead class="text-xs mx-32 text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" class="px-6 py-3">
                                SR#
                            </th>
                            <th scope="col" class="px-6 py-3">
                            Campus
                            </th>
                            <th scope="col" class="px-6 py-3">
                            Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                            City
                            </th>
                            <th scope="col" class="px-6 py-3">
                            View
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {campus.map((cam, serial) => (
                            <tr key={cam.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <td class="px-6 py-4">
                                    {serial + 1}
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <ul>
                                                <li>{cam.name}</li>
                                                <li>{cam.code}</li>
                                                <li>{cam.phone}</li>
                                            </ul>
                                </th>

                                <td class="px-6 py-4">
                                {cam.email}
                                </td>
                                <td class="px-6 py-4">
                                {cam.city && (
                                                <span className="inline-block m-1 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                                    {cam.city.name}
                                                </span>
                                            )}
                                </td>
                                <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium flex">
                                        <a href={'/campuses/details/' + cam.id}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 justify-between align-middle ml-20 hover:cursor-pointer">
                                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                    <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                                </svg></a>
                                            <a href={'/campuses/update/' + cam.id}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 hover:cursor-pointer ml-4">
                                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                                </svg></a>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table> */}
                {/* <div className='container-fluid flex border-2  border-blue-600 bg-opacity-70 mt-6 rounded-xl mx-4 w-[1100px] bg-blue-900'>
                        <select className='ml-5 w-16 rounded-lg h-10 mt-2 text-black'> <option selected>10 </option>

                            <option value="1">20</option>
                        </select> <span className='text-white flex-col text-xs ml-2 mt-1.5'>User Per Page</span>
                        <div className='text-white text-center -mt-1 ml-[300px]'>Page <span className='bg-white text-black flex-col flex text-center'>1</span></div>

                        <nav aria-label="Page navigation example">
                            <ul className="inline-flex -space-x-px text-base float-right ml-72 mr-3 mt-1.5  h-10">
                                <li>
                                    <a href="#" className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div> */}
            </Layout>

        </div>
    )
}

export default list