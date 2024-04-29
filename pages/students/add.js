import React, { useEffect, useState } from 'react';
import Layouts from '@/Components/layouts/lay';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const addstd = () => {
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [fullname, setFullname] = useState('');
  const [userName, setUserName] = useState('');
  const [vuid, setVuid] = useState('');
  const [studyCampus, setStudyCampus] = useState([]);
  const [studyCampus1, setStudyCampus1] = useState([]);
  const [study_status, setStudy_status] = useState('');
  const [city, setCity] = useState([]);
  const [citty, setCitty] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [supervisor1, setSupervisor1] = useState([]);
  const [groupid, setGroupid] = useState('');
  const [project, setProject] = useState('');
  const [vivaCamp, setVivaCamp] = useState([]);
  const [vivaCampp, setVivaCampp] = useState([]);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    axios.get('students/getAddStd')
    .then((res) => {
      setStudyCampus(res.data.studyCampusLookup);
      setCity(res.data.cityLookup);
      setSupervisor(res.data.supervisorsLookup);
      setVivaCamp(res.data.vivaCampusLookup);
    });
  }, []);

  const extractUsername = (email) => {
    // Assuming email is in the format username@domain.com
    return email.split('@')[0];
  };

  const postData = () => {
    const payload = {
      userName: extractUsername(email),
      fullname: fullname,
      vuid: vuid,
      campus: studyCampus1,
      study_status: study_status,
      city: citty,
      supervisor: supervisor1,
      groupid: groupid,
      project_title: project,
      vivaCampus: vivaCampp,
    };
  
    //Email and phone No is not mandatory
    if (email.trim() !== '') {
      payload.email = email;
  }

  if (phoneno.trim() !== '') {
      payload.phoneno = phoneno;
  }

    axios
      .post('/students/addStudent', payload)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data,
        });
        console.log(res);
        console.log('vivacampus', vivaCampp);
        console.log('study campus', studyCampus1);
      })
      .catch((error) => {
        console.log(error.response.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
      });
  };

  const validateForm = () => {
    let errors = {};

    // if (!email) {
    //   errors.email = 'Email is required.';
    // }
    // else 
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //   errors.email = 'Email is invalid.';
    // }
    // else if (!/\S+@(vu\.edu\.pk|VU\.EDU\.PK)$/.test(email)) {
    //   errors.email = 'Email must be @vu.edu.pk or @VU.EDU.PK';
    //   // errors.email = 'Email is invalid';
    // }

    // if (!phoneno) {
    //   errors.phoneno = 'Phone No is required.';
    // } else 
    // if (!/^\d+$/.test(phoneno)) {
    //   errors.phoneno = 'Phone No must contain only numbers.';
    // } else if (phoneno.length < 11) {
    //   errors.phoneno = 'Phone No must be at least 11 digits.';
    // } else if (phoneno.length > 13) {
    //   errors.phoneno = 'Phone No must be less than or equal to 13 digits.';
    // }

    if (!fullname) {
      errors.fullname = 'Full Name is required.';
    } else if (!/^[a-zA-Z\s]*$/.test(fullname)) {
      errors.fullname = 'Full Name must not contain numbers or special characters.';
    } else if (fullname.length > 50) {
      errors.fullname = 'Full Name must be less then 50 characters.';
    }

    if (!vuid) {
      errors.vuid = 'Vu Id is required.';
    } else if (vuid.length !== 11) {
      errors.vuid = 'Vu Id must be 11 characters.';
    } else if (!/^[a-zA-Z0-9]+$/.test(vuid)) {
      errors.vuid = 'VU ID must contain alphanumeric characters.';
    }
    
    
    if (!groupid) {
      errors.groupid = 'Group Id is required.';
    } else if (groupid.length > 21) {
      errors.groupid = 'Group Id have max 20 alphanumeric characters.';
    } else if (!/^[a-zA-Z0-9]+$/.test(groupid)) 
    { errors.groupid = 'Group ID must contain alphanumeric characters.' }
    
    if (!project) {
      errors.project = 'Project Title is required.';
    } else if (project.length > 100) {
      errors.project = 'Project Title have max 100 characters.';}
  


    return errors;
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      postData();
    } else {
      setErrors(errors);
    }
  };

  const goTostudents = () => {
    // router.push("/students");
  };

  return (
    <div>
      <Layouts>
        <main className="bg-cover min-h-screen  flex box-border">
          <div className="outline-opacity-80 bg-white text-blue-700 border-opacity-5 border-solid border-8 border-blue-800  sm:w-screen md:w-screen">
            <h2 className="sm:ml-16 font-bold text-2xl sm:text-3xl">Add Students</h2>
            <form onSubmit={handleSubmit} method="post" className="px-4 sm:px-8">
              <h2 className="ml-16 text-2xl">User Information</h2>
              <hr className='w-9/12 ml-16 border-t-2 border-gray-300' />
              <div className=' mt-3 ml-16 shadow-sm shadow-gray-600 border-gray-200 border '>
                <div div className='flex'>
                  <div className='m-2 ml-10 '>
                    <label className="block text-md">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3  border-gray-50 text-sm rounded-xl block "
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setUserName(extractUsername(e.target.value));
                      }} />
                    {/* {errors.email && <div className="text-red-600  text-sm">{errors.email}</div>} */}
                  </div>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">User Name</label>
                    <input
                      id="username"
                      name="username"
                      variant="filled"
                      value={userName}
                      placeholder="User Name"
                      className="bg-gray-200 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                      readOnly
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }} />
                  </div>
                </div>
                <div div className='flex'>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">Phone No</label>
                    <input
                      type="text"
                      id="phoneno"
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                      placeholder="+923071001657"
                      value={phoneno}
                      onChange={(e) => {
                        setPhoneno(e.target.value);
                      }}
                       />
                    {/* {errors.phoneno && <div className="text-red-600  text-sm">{errors.phoneno}</div>} */}
                  </div>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">Full Name</label>
                    <input
                      type="text"
                      id="fullname"
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                      placeholder="Full Name" 
                      value={fullname}
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }} />
                    {errors.fullname && <div className="text-red-600  text-sm">{errors.fullname}</div>}
                  </div>
                </div>
              </div>
              <h2 className="ml-16 text-2xl">Student Information</h2>
              <hr className='w-9/12 ml-16 border-t-2 border-gray-300' />
              <div className=' mt-3 ml-16 shadow-sm shadow-gray-600 border-gray-200 border '>
                <div div className='flex'>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">VU ID</label>
                    <input
                      type="text"
                      id="vuid"
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                      placeholder="Student VU ID" 
                      value={vuid}
                      onChange={(e) => {
                        setVuid(e.target.value);
                      }} />
                    {errors.vuid && <div className="text-red-600  text-sm">{errors.vuid}</div>}
                  </div>

                  <div className='m-2 ml-10'>
                    <label className="block text-md">Study Status</label>

                    <select
                      value={study_status}
                      id="study_status"
                      onChange={(e) => { setStudy_status(e.target.value); }}
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block " >
                      <option selected>Select</option>
                      <option value="Regular">Regular</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                </div>
                <div div className='flex'>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">Study Campus</label>
                    <select

                      onChange={(e) => { setStudyCampus1(e.target.value); }}
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                       >
                      <option id="studyCampusLookup" selected>Select</option>
                      {studyCampus.map((study) => (
                        <option key={study.id} value={study.id}>
                          {study.name}
                        </option>
                      ))
                      }
                    </select>
                  </div>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">City</label>
                    <select
                      onChange={(e) => { setCitty(e.target.value); }}
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block ">
                      <option id="cityLookup" selected>Select</option>
                      {city.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))
                      }
                    </select>
                  </div>
                </div>
              </div>
              <h2 className="ml-16 text-2xl">Project Information</h2>
              <hr className='w-9/12 ml-16 border-t-2 border-gray-300' />
              <div className=' mt-3 ml-16 shadow-sm shadow-gray-600 border-gray-200 border '>
                <div div className='flex'>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">Group ID</label>
                    <input
                      type="text"
                      id="groupid"
                      value={groupid}
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                      placeholder="Group ID"
                      onChange={(e) => {
                        setGroupid(e.target.value);
                      }} />
                      {errors.groupid && <div className="text-red-600  text-sm">{errors.groupid}</div>}
                  </div>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">Project Title</label>
                    <input
                      type="text"
                      id="project"
                      value={project}
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                      placeholder="Project Title"
                      onChange={(e) => {
                        setProject(e.target.value);
                      }}
                   />
                      {errors.project && <div className="text-red-600  text-sm">{errors.project}</div>}
                  </div>
                </div>
                <div div className='flex'>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">Supervisors</label>
                    <select
                      onChange={(e) => { setSupervisor1(e.target.value); }}
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block ">
                      <option id="supervisorsLookup" selected>Select</option>
                      {supervisor.map((sup) => (
                        <option key={sup.id} value={sup.id}>
                          {sup.name}
                        </option>
                      ))
                      }
                    </select>
                  </div>
                  <div className='m-2 ml-10'>
                    <label className="block text-md">Viva Campus</label>
                    <select
                      onChange={(e) => { setVivaCampp(e.target.value); }}
                      className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block ">
                      <option id="vivaCampusLookup" selected>Select</option>
                      {vivaCamp.map((viva) => (
                        <option key={viva.id} value={viva.id}>
                          {viva.name}
                        </option>
                      ))
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 pt-3 sm:pt-6 float-right">
                <button
                  className="bg-[#4d41eb] w-1/2 sm:w-30 text-[#eeeff1] p-2 px-4 sm:px-7 rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
                  type="submit"
                  onClick={goTostudents}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#4d41eb] w-1/2 sm:w-30 text-[#eeeff1] p-2 px-4 sm:px-7 rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </main>
      </Layouts>
    </div>
  );
};

export default addstd;