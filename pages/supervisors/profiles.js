import React, { useEffect, useState } from "react";
import Layout from "@/Components/layouts/Layout";
import axios from "axios";
function Supervisor(id) {
     const[profile, setProfile] = useState("");
     const[skype_id, setSkype_id] = useState("");
     const[campus, setCampus] = useState("");
     const[Designation, setDesignation] = useState("");
     const[error, setError] = useState("");
     useEffect(()=>{
      axios.patch(`/supervisors/updateprofile/${id}`)
     })
            
           //Validation Code
     const validateForm =()=>{
        let error={};

        if(!skype_id){
          error.skype_id="Skype id required*";
        }
        else if(skype_id>30)
        {
          error.skype_id="Id must be atleast 30 characters";
        }
        if(!campus){
          error.campus="Campus required*";
        }
        if(!Designation){
          error.Designation="Designation required*";
        }
        setError(error);

        if (Object.keys(error).length == 0) {
          return true;
        } else {
          return false
        }
     }
     const handleSubmit =(e)=>
     {
        e.preventDefault();

     }



  return (
    
    <div>
      <Layout>
      <div className="container-fluid mt-44 border-4 h-60 mx-80 text-center rounded-xl bg-white  border-blue-700 border-opacity-5 
      2xl:mt-72 2xl:mx-[400px] 2xl:w-[700px] 2xl:h-[400px] xl:h-[350px]  xl:mt-28 lg:h-[300px] lg:w-[600px] lg:mx-[200px]
      md:w-96 md:mx-48 md:mt-32">
        <h3 className="text-blue-700 font-bold text-2xl pt-1 2xl:text-3xl 2xl:pt-5 xl:pt-5 xl:text-3xl lg:text-3xl md:text-lg">
          Update Supervisor Profile
        </h3>
        <div className="p-6">
<form class="max-w-sm mx-auto flex flex-col gap-4" onClick={handleSubmit}>
<div>
  <input 
   type="text"
   id="text"
   placeholder="Skype id"
   class="bg-gray-50 border  focus:outline-none border-gray-300 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
   required />
 </div> {error.skype_id && <span className="text-red-600 -mt-5 text-sm">{error.skype_id}</span>}
  <div>
    <select 
    id="campus" 
    class="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option>Campus</option>
  </select>
  </div> {error.campus && <span className="text-red-600 -mt-5 text-sm">{error.campus}</span>}
  <div>
     <select 
     id="campus" 
     class="bg-gray-50 border border-gray-300 text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option>Designation</option>
  </select>
  </div> {error.Designation && <span className="text-red-600 -mt-5 text-sm">{error.Designation}</span>}
<div>

          <button
            type="button"
            className="bg-blue-600 rounded-2xl px-3 mt-4 text-white 2xl:h-12 2xl:text-2xl
            xl:h-10 xl:w-24  xl:text-xl lg:h-8 lg:text-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 h-9 rounded-2xl px-3 ml-5 text-white 2xl:h-12 2xl:text-2xl
            xl:h-10 xl:w-24 xl:text-xl lg:h-8 lg:text-lg"
          >
            Save
          </button>
          </div>
          </form>
          </div>
      </div></Layout>
    </div>
  );
}

export default Supervisor;
