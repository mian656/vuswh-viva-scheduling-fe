// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import Layout from "@/Components/layouts/Layout";
// import "react-notifications/lib/notifications.css";
// // import Layout from '@/Components/layouts/Layout';
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";

// const addcampus = () => {
//   //useState section
//   const [campuse, setCampuse] = useState([]);
//   const [provinces, setProvinces] = useState([]); //for get
//   const [cities, setCities] = useState([]); //for get
//   const [error, setError] = useState("");
//   const router = useRouter();
//   // const Reload = () => {
//   //     window.location.reload;
//   // }

//   //useState for post request
//   const [code, setCode] = useState("");
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [province, setProvince] = useState([]);
//   const [city, setCity] = useState([]);
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [fax, setFax] = useState("");
//   const [coordinates, setCoordinates] = useState("");
//   const [skype_id, setSkype_id] = useState("");
//   const [campus_purpose, setCampusPurpose] = useState("");

//   // useEffect section
//   useEffect(() => {
//     axios
//       .get("/provinces/lookup")
//       .then((res) => {
//         setProvinces(res.data);
//       })
//       .catch((error) => {
//         setError(error.message);
//         // console.log(error.data.data);
//       });
//   }, []);

//   //2nd useeffect for city based on prov.
//   useEffect(() => {
//     if (province) {
//       axios
//         .get(`/cities/lookup/${province}`)
//         .then((res) => {
//           setCities(res.data);
//           console.log(res.data);
//         })
//         .catch((err) => {
//           setError(err.message);
//         });
//     }
//   }, [province]); // Add 'province' to the dependency array

//   // console.log(province)

//   //router code for add campus
//   const mainList = () => {
//     router.push("/campuses");
//   };

//   //router code for cancel button
//   const backlist = () => {
//     router.push("/campuses");
//   };

//   //post request
//   const postData = async () => {
//     axios
//       .post("/campuses/create", {
//         code: code,
//         name: name,
//         address: address,
//         phone: phone,
//         province: province,
//         city: city,
//         mobile: mobile,
//         email: email,
//         fax: fax,
//         coordinates: coordinates,
//         skype_id: skype_id,
//         campus_purpose: campus_purpose,
//       })
//       .then((res) => {
//         console.log(res);
//         NotificationManager.success("Success message", "Campus Created!");
//       });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     postData();
//   };

//   return (
//     <div>
//       <Layout>
//         <div className="bg-white">
//           <NotificationContainer />
//           <div className="text-slate-700 font-bold text-4xl m-8 text-center 2xl:text-5xl 2xl:mt-12 xl:text-4xl xl:mt-0 xl:pt-5 lg:text-4xl md:text-3xl sm:text-xl">
//             Add Campus
//           </div>
//           <div className="container-fluid border-8 border-black mx-36 h-[730px] 2xl:mt-20 2xl:mx-36  xl:mt-10 lg:mx-36 lg:mt-16 md:mx-16 sm:mx-10">
//             <form onSubmit={handleSubmit}>
//               <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8 pl-36 2xl:pl-44 xl:ml-20 lg:pl-11 md:pl-2 sm:pl-">
//                 <div>
//                   <label
//                     htmlFor="campus_code"
//                     className="block mb-2 text-md font-medium text-slate-600  dark:text-white"
//                   >
//                     Campus Code
//                   </label>
//                   <input
//                     type="text"
//                     id="campus_code"
//                     value={code}
//                     onChange={(e) => {
//                       setCode(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400   focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Code"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="campus_name"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Campus Name
//                   </label>
//                   <input
//                     type="text"
//                     id="last_name"
//                     value={name}
//                     onChange={(e) => {
//                       setName(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Campus Name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={phone}
//                     onChange={(e) => {
//                       setPhone(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Phone"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="mobile"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Mobile
//                   </label>
//                   <input
//                     type="tel"
//                     id="mobile"
//                     value={mobile}
//                     onChange={(e) => {
//                       setMobile(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Mobile"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="fax"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Fax
//                   </label>
//                   <input
//                     type="tel"
//                     id="fax"
//                     value={fax}
//                     onChange={(e) => {
//                       setFax(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Fax"
//                     required
//                   />
//                 </div>

//                 <div className="mb-6">
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="email"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="skype_id"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Skype ID
//                   </label>
//                   <input
//                     type="text"
//                     id="skype_id"
//                     value={skype_id}
//                     onChange={(e) => {
//                       setSkype_id(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Skype ID"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="campus_purpose"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Campus Purpose
//                   </label>
//                   <select
//                     id="campus_purpose"
//                     value={campus_purpose}
//                     onChange={(e) => {
//                       setCampusPurpose(e.target.value);
//                     }}
//                     className="bg-gray-50 focus:outline-none block w-72 mt-0 border border-gray-50 outline outline-2 outline-gray-400  text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   >
//                     <option selected>Select</option>
//                     <option value="Viva Campus">Viva Campus</option>
//                     <option value="Faculty Campus">Faculty Campus</option>
//                     <option value="Both Campuses">Both</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="Coordinates"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Coordinates
//                   </label>
//                   <input
//                     type="text"
//                     value={coordinates}
//                     id="Coordinates"
//                     onChange={(e) => {
//                       setCoordinates(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Coordinates"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="Address"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     value={address}
//                     id="Address"
//                     onChange={(e) => {
//                       setAddress(e.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="address"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="Province"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     Province
//                   </label>
//                   <select
//                     id="Province"
//                     value={province}
//                     onChange={(e) => {
//                       setProvince(e.target.value);
//                     }}
//                     className="bg-gray-50 block w-72 mt-0 focus:outline-none border border-gray-50 outline outline-2 outline-gray-400  text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   >
//                     <option selected>Select</option>
//                     {provinces.map((prov) => (
//                       <option key={prov.id} value={prov.id}>
//                         {prov.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="City"
//                     className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
//                   >
//                     City
//                   </label>
//                   <select
//                     id="City"
//                     value={city}
//                     onChange={(e) => {
//                       setCity(e.target.value);
//                     }}
//                     className="bg-gray-50 block w-72 mt-0 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   >
//                     <option selected>Select</option>
//                     {cities.map((citi) => (
//                       <option key={citi.id} value={citi.id}>
//                         {citi.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* <div>
// <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unique visitors (per month)</label>
// <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
// </div> */}
//               </div>
//               <button
//                 type="submit"
//                 className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-40 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
//                 2xl:w-32 2xl:text-xl xl:w-28 xl:mr-40 lg:w-24 lg:mr-12 md:mr-16 md:w-20"
//                 onClick={mainList}
//               >
//                 Add
//               </button>
//               <button
//                 type="button"
//                 className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
//                 2xl:w-32 2xl:text-xl xl:w-28 lg:w-24 md:w-20"
//                 onClick={backlist}
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default addcampus;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/Components/layouts/Layout";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const addcampus = () => {
  const [campuse, setCampuse] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [skype_id, setSkype_id] = useState("");
  const [campus_purpose, setCampusPurpose] = useState("");

  useEffect(() => {
    axios
      .get("/provinces/lookup")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (province) {
      axios
        .get(`/cities/lookup/${province}`)
        .then((res) => {
          setCities(res.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [province]);

  const mainList = () => {
    router.push("/campuses");
  };

  const backlist = () => {
    router.push("/campuses");
  };

  const postData = async () => {
    axios
      .post("/campuses/create", {
        code: code,
        name: name,
        address: address,
        phone: phone,
        province: province,
        city: city,
        mobile: mobile,
        email: email,
        fax: fax,
        coordinates: coordinates,
        skype_id: skype_id,
        campus_purpose: campus_purpose,
      })
      .then((res) => {
        console.log(res);
        NotificationManager.success("Success message", "Campus Created!");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div>
      <Layout>
        <div className="bg-white flex flex-col min-h-screen">
          <NotificationContainer />
          <div className='text-slate-700 text-4xl  font-bold m-5'>Campuses</div>
          <h3 className="text-slate-700 ml-12 text-xl">Add Campus</h3>
          <div className="flex-grow">
            <form onSubmit={handleSubmit} className="container-fluid h-[720px] mt-10 mx-52 border-8 mb-5 border-black">
              <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8 pl-36 2xl:pl-44 xl:ml-20 lg:pl-11 md:pl-2 sm:pl-">
                <div>
                  <label
                    htmlFor="campus_code"
                    className="block mb-2 text-md font-medium text-slate-600  dark:text-white"
                  >
                    Campus Code
                  </label>
                  <input
                    type="text"
                    id="campus_code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400   focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Code"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="campus_name"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Campus Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Campus Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Phone"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mobile"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fax"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Fax
                  </label>
                  <input
                    type="tel"
                    id="fax"
                    value={fax}
                    onChange={(e) => {
                      setFax(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Fax"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fax"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Fax
                  </label>
                  <input
                    type="tel"
                    id="fax"
                    value={fax}
                    onChange={(e) => {
                      setFax(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Fax"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="skype_id"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Skype ID
                  </label>
                  <input
                    type="text"
                    id="skype_id"
                    value={skype_id}
                    onChange={(e) => {
                      setSkype_id(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Skype ID"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="campus_purpose"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Campus Purpose
                  </label>
                  <select
                    id="campus_purpose"
                    value={campus_purpose}
                    onChange={(e) => {
                      setCampusPurpose(e.target.value);
                    }}
                    className="bg-gray-50 focus:outline-none block w-72 mt-0 border border-gray-50 outline outline-2 outline-gray-400  text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select</option>
                    <option value="Viva Campus">Viva Campus</option>
                    <option value="Faculty Campus">Faculty Campus</option>
                    <option value="Both Campuses">Both</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="Coordinates"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Coordinates
                  </label>
                  <input
                    type="text"
                    value={coordinates}
                    id="Coordinates"
                    onChange={(e) => {
                      setCoordinates(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Coordinates"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="Address"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    id="Address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="address"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="Province"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    Province
                  </label>
                  <select
                    id="Province"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                    }}
                    className="bg-gray-50 block w-72 mt-0 focus:outline-none border border-gray-50 outline outline-2 outline-gray-400  text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select</option>
                    {provinces.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="City"
                    className="block mb-2 text-md font-medium text-slate-600 dark:text-white"
                  >
                    City
                  </label>
                  <select
                    id="City"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    className="bg-gray-50 block w-72 mt-0 border border-gray-50 outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select</option>
                    {cities.map((citi) => (
                      <option key={citi.id} value={citi.id}>
                        {citi.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="container mx-auto flex justify-end">
                <button
                  type="submit"
                  className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-xl w-32 text-md sm:w-auto  px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                "
                  onClick={mainList}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-24 focus:outline-none focus:ring-blue-300 font-medium rounded-xl w-32 text-md sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                "
                  onClick={backlist}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          {/* Sticky footer */}
          <footer className="w-full bg-gray-300 py-4">
            <div className="container mx-auto flex justify-end">
              <button
                type="submit"
                className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={mainList}
              >
                Add
              </button>
              <button
                type="button"
                className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={backlist}
              >
                Cancel
              </button>
            </div>
          </footer>
        </div>
      </Layout>
    </div>
  );
};

export default addcampus;
