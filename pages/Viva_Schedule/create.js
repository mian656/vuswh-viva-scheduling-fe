import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layouts from '@/Components/layouts/lay'
import axios from 'axios'
const create = () => {

  //useState Section for get request
  const router = useRouter();
  const { id } = router.query;
  const [campuses, setCampuses] = useState([])
  const [error, setError] = useState("")
  const [selectedCampuses, setSelectedCampuses] = useState([])
  const [semester, setSemester] = useState([])

  //useState Section for post request
  const [campus, setCampus] = useState([])
  const [start_date, setStart_date] = useState("")
  const [end_date, setEnd_date] = useState("")
  const [start_time, setStart_time] = useState("")
  const [end_time, setEnd_time] = useState("")
  const [parallel_session_count, setParallel_session_count] = useState("")

  // useEffect(() => {
  //   axios.get("/semesterViva/create")
  //     .then((res) => {
  //       setSemester(res.data.data)
  //       console.log(res.data.data)
  //     })
  //     .catch((err) => {
  //       setError(err.message)
  //     })
  // }, [])



  //useEffect section
  useEffect(() => {
    axios.get("/campuses/pagedata")
      .then((res) => {
        setCampuses(res.data.data)
        console.log(res.data.data)
      })
      .catch((error) => {
        setError(error.message)
      })
  }, [])

  const CreateData = async () => {

    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);

    const formattedStartDate = startDateObj.toISOString().split('T')[0];
    const formattedEndDate = endDateObj.toISOString().split('T')[0];

    console.log(startDateObj)
    console.log(endDateObj)
    console.log(formattedStartDate)
    console.log(formattedEndDate)
    console.log(start_date)
    console.log(end_date)

    axios.post(`/viva-schedules/add/${id}`,
      {
        "campus": campus,
        "start-date": start_date,
        "end-date": end_date,
        "start-time": start_time,
        "end-time": end_time,
        "session-count": parallel_session_count,
      }
    ).then((res) => {
      console.log(res)
    })
      .catch((err) => {
        setError(err.message)
      })
  }

  // const handleCampusChange = (e) => {
  //   const selectedCampus = e.target.value;
  //   setSelectedCampuses((prevSelected) => [...prevSelected, selectedCampus]);
  // };

  const handleCampusChange = (e) => {
    const selectedCampus = e.target.value;

    // Check if the selected campus is already in the list
    const isSelected = selectedCampuses.includes(selectedCampus);

    // Update the selectedCampuses state based on whether it's selected or not
    if (isSelected) {
      // If selected, remove it from the list
      setSelectedCampuses((prevSelected) => prevSelected.filter(campus => campus !== selectedCampus));
    } else {
      // If not selected, add it to the list
      setSelectedCampuses((prevSelected) => [...prevSelected, selectedCampus]);
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    CreateData();
  }

  return (
    <div>
      <Layouts>
        <div className='bg-white'>
          <div className='text-blue-800 text-4xl font-bold m-8 mt-0 pt-4'>Create Viva Schedule</div>
          <div className='text-white text-lg text-center'>
            {/* {semester && semester.map((sem) => (
          <div key={sem.id} value={sem.name}>
            {sem.name}
          </div>
        ))} */}
          </div>
          <div className='container-fluid border-8 mx-28 w-[900px] h-[555px] border-blue-600'>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2 ml-24 mt-10">
                <div>
                  <label htmlFor="Campuses" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">Campuses</label>
                  <select id="Campuses"
                    onChange={handleCampusChange}
                    className="bg-gray-50 mt-0 h-28 border flex border-gray-50 outline outline-gray-500 outline-2 focus:outline-none text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple>
                    <option selected>Select</option>
                    {campuses && campuses.map((camp) => (
                      <option key={camp.id} value={camp.name}>
                        {camp.code}
                        <span>{camp.name}</span>
                      </option>
                    ))
                    }
                  </select>
                </div>
                {/* <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 align-middle">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg></span> */}

                <div>
                  <label htmlFor="Selected Campuses" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">Selected Campuses</label>
                  <select id="Selected Campuses"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="bg-gray-50 mt-0 h-28 border flex border-gray-50 outline outline-gray-500 outline-2 focus:outline-none text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple>
                    <option selected>Select</option>
                    {selectedCampuses.map((selectedCampus) => (
                      <option key={selectedCampus} value={selectedCampus}>
                        {selectedCampus}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {/* <input type='date' placeholder='yyyy-mm-dd' className='text-blue-500 w-24'/> */}

                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">Start Date:</label>
                  <input type="date"
                    value={start_date}
                    onChange={(e) => setStart_date(e.target.value)}
                    className="bg-gray-50 focus:outline-none border border-gray-50 outline outline-2 outline-gray-500 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    pattern="\d{4}-\d{2}-\d{2}" required />
                </div>
                <div>
                  <label htmlFor="time" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">Start Time:</label>
                  <input type="time"
                    value={start_time}
                    onChange={(e) => setStart_time(e.target.value)}
                    id="time"
                    className="bg-gray-50 border focus:outline-noneoutline outline outline-2 outline-gray-500 border-gray-50 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="yyyy-mm-dd" required />
                </div>
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">End Date:</label>
                  <input type="date"
                    value={end_date}
                    onChange={(e) => setEnd_date(e.target.value)}
                    pattern="[yyyy]-[mm]-[dd]"
                    className="bg-gray-50 focus:outline-none outline outline-2 outline-gray-500 border border-gray-50 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="yyyy-mm-dd" required />
                </div>
                <div>
                  <label htmlFor="time" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">End Time:</label>
                  <input type="time"
                    value={end_time}
                    onChange={(e) => setEnd_time(e.target.value)}
                    id="time"
                    className="bg-gray-50 focus:outline-none outline outline-2 outline-gray-500 border border-gray-50 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
                <div>
                  <label htmlFor="number" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">Number of parallel Sessions:</label>
                  <input type="number"
                    value={parallel_session_count}
                    onChange={(e) => setParallel_session_count(e.target.value)}
                    id="number"
                    className="bg-gray-50 focus:outline-none outline outline-2 outline-gray-500 border border-gray-50 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </div>
              </div>
              <button type="submit" className="text-white bg-blue-700  hover:scale-105 duration-300 hover:bg-[#1a3f49] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full float-right mr-52 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
              <button type="submit" className="text-white bg-blue-700  hover:scale-105 duration-300 hover:bg-[#1a3f49] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full float-right mr-4 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default</button>
            </form></div>
        </div></Layouts>
    </div>

  )
}

export default create