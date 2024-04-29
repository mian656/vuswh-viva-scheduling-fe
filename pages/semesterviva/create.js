// import { comment } from "postcss";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import Layout from "../../Components/layouts/Layout";
// import Multiselect from "multiselect-react-dropdown";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
// import "react-notifications/lib/notifications.css";

// const Signup = () => {
//   const [semester_viva_start_date, setDate] = useState("");
//   const [viva_slot_duration, setSlot] = useState("");
//   const [viva_slot_gap, setGap] = useState("");
//   const [regular_break_from, setRegbreak] = useState("");
//   const [regular_break_to, setBreakto] = useState("");
//   const [friday_break_from, setFridaybreak] = useState("");
//   const [friday_break_to, setFridaybreakto] = useState("");
//   const [is_saturday, setSaturday] = useState("");
//   const [is_sunday, setSunday] = useState("");
//   const [Error, setIsError] = useState("");
//   const [FormValid, setFormValid] = useState(false);

//   //   useEffect(() => {
//   //     axios
//   //       .get("users/create")
//   //       .then((res) => {
//   //         // console.log(res.data.roles);
//   //         setRoles(res.data.roles);
//   //       })
//   //       .catch((error) => {
//   //         setIsError(error.message);
//   //       });
//   //   }, []);

//   // console.log(roles);

//   //post request

//   const post = async () => {
//     axios
//       .post("/semesterViva/create", {
//         semester_viva_start_date: semester_viva_start_date,
//         viva_slot_duration: viva_slot_duration,
//         viva_slot_gap: viva_slot_gap,
//         regular_break_from: regular_break_from,
//         regular_break_to: regular_break_to,
//         friday_break_from: friday_break_from,
//         friday_break_to: friday_break_to,
//         is_saturday: is_saturday,
//         is_sunday: is_sunday,
//       })
//       .then((res) => {
//         console.log(res);
//         NotificationManager.success("Success message", "Created!");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   //Form Validate

//   const validateForm = async () => {
//     let errors = {};

//     if (!semester_viva_start_date) {
//       errors.semester_viva_start_date = "Semester viva start date is required*";
//     }
//     // else if (fullname.length > 50) {
//     //   errors.fullname = 'Full name must be 50 characters'
//     // }

//     if (!viva_slot_duration) {
//       errors.viva_slot_duration = "Viva slot duration is required*";
//     }

//     if (!viva_slot_gap) {
//       errors.viva_slot_gap = "Viva slot gap is required*";
//     }

//     if (!regular_break_from) {
//       errors.regular_break_from = "Regular break start time is required*";
//     }

//     if (!regular_break_to) {
//       errors.regular_break_to = "Regular break end time is required*";
//     }

//     if (!is_saturday) {
//       errors.is_saturday = "Saturday not specified*";
//     }

//     if (!is_sunday) {
//       errors.is_sunday = "Sunday not specified*";
//     }

//     setIsError(errors);
//     if (Object.keys(errors).length === 0) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const onSelect = (selectedList, selectedItem) => {
//     //  console.log("Selected List", selectedList);
//     //  console.log("Selected Item", selectedItem);
//     setSelectRoles((prevRoles) => [...prevRoles, selectedItem.id]);
//     // setSelectRoles([...selectRoles, selectedItem.id])
//     //     console.log("Selected Role", selectRoles);
//     setSelectRoles((prevRoles) => {
//       console.log("Selected Roles", prevRoles);
//       return prevRoles;
//     });
//   };

//   // const onRemove = (selectedList, removedItem) => {
//   //   console.log("Selected List", selectedList);
//   //   console.log("Removed Item", removedItem);

//   //   const updatedRoles = selectRoles.filter(role => role !== removedItem);
//   //   setSelectRoles(updatedRoles);
//   // }
//   const submit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // console.log('Form has errors. Please correct them.');
//       // NotificationManager.error('Warning message', 'You have an error', 3000);
//       console.log(selectRoles);
//       post();
//     }
//   };
//   return (
//     <>
//       <Layout>
//         <NotificationContainer />
//         <div
//           className="conatiner-fluid  flex-col ml-96 mr-96 h-80 justify-between items-center mt-10 flex-1 border-8 rounded-2xl border-white  bg-white
//         2xl:mt-56 2xl:mx-[330px] 2xl:h-[450px] xl:w-[600px] xl:mx-60 xl:h-[450px] xl:mt-20 lg:h-[450px] lg:mx-40 lg:mt-32 lg:w-[450px] md:mx-20 md:mt-24 md:w-[430px] sm:mx-28 sm:mt-24 sm:w-[400px]"
//         >
//           <h3 className="text-blue-800 text-center font-bold text-2xl 2xl:text-4xl xl:text-3xl xl: lg:pt-2 lg:text-2xl md:text-base sm:text-base sm:pt-1">
//             Create Semester Viva
//           </h3>
//           <div
//             className="container-fluid w-96  mx-16 h-64 border-8 mt-0 rounded-xl bg-white  border-white
//            2xl:mt-5 2xl:h-[330px] xl:w-[500px] xl:mt-4 xl:h-72 xl:mx-[40px] lg:mt-5 lg:w-[350px] lg:mx-[40px]  md:w-[300px] md:mx-16 sm:w-[260px] sm:mt-1"
//           >
//             <form onSubmit={submit}>
//               <div className="flex items-center">
//                 <label htmlFor="regular_break_to" className="text-black">
//                   Start Date:
//                 </label>
//                 <input
//                   type="text"
//                   value={semester_viva_start_date}
//                   onChange={(e) => {
//                     setFullname(e.target.value);
//                   }}
//                   id="semester_viva_start_date"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:text-lg 2xl:h-9 2xl:mt-7 xl:h-10 xl:w-full xl:mt-2 lg:w-full lg:mt-0 lg:h-8 md:w-full md:h-7 md:mt-1 sm:w-full sm:h-6 sm:mt-2"
//                   placeholder="Start Date"
//                   required
//                 />
//               </div>
//               {Error.semester_viva_start_date && (
//                 <span className="text-red-600 font-semibold text-sm">
//                   {Error.semester_viva_start_date}
//                 </span>
//               )}
//               {/* <div>
//               <input type="text" id="user_name" className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:h-9 2xl:text-lg xl:h-10 xl:w-full lg:w-full lg:h-8 md:w-full md:h-7 md:mt-2 sm:w-full sm:h-6 sm:mt-2" placeholder="User Name" readOnly />
//             </div> */}

//               <div className="flex items-center">
//                 <label htmlFor="slot_duration" className="text-black">
//                   Slot Duration:
//                 </label>
//                 <input
//                   type="text"
//                   value={viva_slot_duration}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                   }}
//                   id="email"
//                   className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:h-9 2xl:text-lg xl:h-10 xl:w-full lg:w-full lg:h-8 md:w-full md:h-7 md:mt-2 sm:w-full sm:h-6 sm:mt-2"
//                   placeholder="Slot Duration"
//                   required
//                 />
//               </div>
//               {Error.viva_slot_duration && (
//                 <p className="text-red-600 font-semibold text-sm">
//                   {Error.viva_slot_duration}
//                 </p>
//               )}

//               <div className="flex items-center">
//                 <label htmlFor="slot_gap" className="text-black">
//                   Slot Gap:
//                 </label>
//                 <input
//                   type="text"
//                   value={viva_slot_gap}
//                   onChange={(e) => {
//                     setPhoneno(e.target.value);
//                   }}
//                   id="viva_slot_gap"
//                   className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:h-9 2xl:text-lg xl:h-10 xl:w-full lg:w-full lg:h-8 md:w-full md:h-7 md:mt-2 sm:w-full sm:h-6 sm:mt-2"
//                   placeholder="Slot Gap"
//                   required
//                 />
//               </div>
//               {Error.viva_slot_gap && (
//                 <p className="text-red-600 font-semibold text-sm">
//                   {Error.viva_slot_gap}
//                 </p>
//               )}

//               <div className="flex items-center">
//                 <label htmlFor="regular_break_from" className="text-black">
//                   Regular Break From:
//                 </label>
//                 <input
//                   type="text"
//                   value={regular_break_from}
//                   onChange={(e) => {
//                     setPhoneno(e.target.value);
//                   }}
//                   id="regular_break_from"
//                   className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:h-9 2xl:text-lg xl:h-10 xl:w-full lg:w-full lg:h-8 md:w-full md:h-7 md:mt-2 sm:w-full sm:h-6 sm:mt-2"
//                   placeholder="Regular Break From"
//                   required
//                 />
//               </div>
//               {Error.regular_break_from && (
//                 <p className="text-red-600 font-semibold text-sm">
//                   {Error.regular_break_from}
//                 </p>
//               )}

//               <div className="flex items-center">
//                 <label htmlFor="regular_break_to" className="text-black">
//                   Regular Break To:
//                 </label>
//                 <input
//                   type="text"
//                   value={regular_break_to}
//                   onChange={(e) => {
//                     setPhoneno(e.target.value);
//                   }}
//                   id="regular_break_from"
//                   className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:h-9 2xl:text-lg xl:h-10 xl:w-full lg:w-full lg:h-8 md:w-full md:h-7 md:mt-2 sm:w-full sm:h-6 sm:mt-2"
//                   placeholder="To"
//                   required
//                 />
//               </div>
//               {Error.regular_break_to && (
//                 <p className="text-red-600 font-semibold text-sm">
//                   {Error.regular_break_to}
//                 </p>
//               )}

//               <div>
//                 <input
//                   type="text"
//                   value={friday_break_from}
//                   onChange={(e) => {
//                     setPhoneno(e.target.value);
//                   }}
//                   id="regular_break_from"
//                   className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:h-9 2xl:text-lg xl:h-10 xl:w-full lg:w-full lg:h-8 md:w-full md:h-7 md:mt-2 sm:w-full sm:h-6 sm:mt-2"
//                   placeholder="Friday Break From"
//                   required
//                 />
//               </div>
//               {Error.friday_break_from && (
//                 <p className="text-red-600 font-semibold text-sm">
//                   {Error.friday_break_from}
//                 </p>
//               )}

//               <div>
//                 <input
//                   type="text"
//                   value={friday_break_to}
//                   onChange={(e) => {
//                     setPhoneno(e.target.value);
//                   }}
//                   id="regular_break_from"
//                   className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:h-9 2xl:text-lg xl:h-10 xl:w-full lg:w-full lg:h-8 md:w-full md:h-7 md:mt-2 sm:w-full sm:h-6 sm:mt-2"
//                   placeholder="To"
//                   required
//                 />
//               </div>
//               {Error.friday_break_to && (
//                 <p className="text-red-600 font-semibold text-sm">
//                   {Error.friday_break_to}
//                 </p>
//               )}

//               <div>
//                 <input
//                   type="text"
//                   value={is_saturday}
//                   onChange={(e) => {
//                     setPhoneno(e.target.value);
//                   }}
//                   id="regular_break_from"
//                   className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//               2xl:w-full 2xl:h-9 2xl:text-lg xl:h-10 xl:w-full lg:w-full lg:h-8 md:w-full md:h-7 md:mt-2 sm:w-full sm:h-6 sm:mt-2"
//                   placeholder="Is saturday included"
//                   required
//                 />
//               </div>
//               {Error.is_saturday && (
//                 <p className="text-red-600 font-semibold text-sm">
//                   {Error.is_saturday}
//                 </p>
//               )}

//               <div>
//                 <button
//                   type="reset"
//                   className="bg-blue-800 text-white px-4 rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] ml-28 mt-4 outline-black 2xl:w-28 2xl:ml-28 2xl:h-10 2xl:text-2xl xl:w-24 xl:ml-64 xl:h-8 xl:text-xl lg:text-lg lg:w-20 lg:h-7 lg:ml-24 lg:h-6 lg:px-0 md:w-14 md:h-6 md:text-sm md:ml-20 md:px-2
//             sm:text-sm sm:ml-14 sm:px-1 sm:w-12"
//                 >
//                   Reset
//                 </button>
//                 <button
//                   type="submit"
//                   className=" bg-blue-800 text-white px-4 rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] ml-4 2xl:w-28 2xl:h-10 2xl:text-2xl xl:w-24  xl:h-8 xl:text-xl lg:text-lg lg:w-20 lg:h-7 md:h-6 w-10 md:text-sm md:w-16 md:px-3
//                sm:text-sm sm:px-0 sm:w-14 sm:ml-2"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default Signup;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Swal from "sweetalert2";

const addcampus = () => {
  const router = useRouter();
  const [semester, setSemester] = useState("");
  const [semester_viva_start_date, setDate] = useState("");
  const [viva_slot_duration, setSlot] = useState("");
  const [viva_slot_gap, setGap] = useState("");
  const [regular_break_from, setRegbreak] = useState("");
  const [regular_break_to, setBreakto] = useState("");
  const [friday_break_from, setFridaybreak] = useState("");
  const [friday_break_to, setFridaybreakto] = useState("");
  const [is_saturday, setSaturday] = useState(false);
  const [is_sunday, setSunday] = useState(false);
  const [Error, setIsError] = useState("");

  useEffect(() => {
    axios
      .get("/semesterViva/create")
      .then((res) => {
        setSemester(res.data);
        console.log(res.data);
        // console.log(res.data.data)
      })
      .catch((error) => {
        setIsError(error.message);
      });
  }, []);

  // useEffect section

  //2nd useeffect for city based on prov.

  // console.log(province)

  //router code
  const mainList = () => {
    router.push("/semesterviva");
  };

  //post request
  const postData = async () => {
    axios
      .post("/semesterViva/create", {
        semester_viva_start_date: semester_viva_start_date,
        viva_slot_duration: viva_slot_duration,
        viva_slot_gap: viva_slot_gap,
        regular_break_from: regular_break_from,
        regular_break_to: regular_break_to,
        friday_break_from: friday_break_from,
        friday_break_to: friday_break_to,
        is_saturday: is_saturday,
        is_sunday: is_sunday,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        });
        console.log(res);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "An error occurred",
        });
      });

    // .catch((error) => {
    //   console.log(error);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: error,
    //   });
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div>
      <div className="bg-white">
        <div className="text-white font-bold text-4xl m-8 text-center 2xl:text-5xl 2xl:mt-12 xl:text-4xl lg:text-4xl md:text-3xl sm:text-xl">
          Add Semester Viva
        </div>
        <div className="container-fluid border-8 border-blue-700 mx-36 h-[730px] 2xl:mt-20 2xl:mx-36 xl:mx-36 xl:mt-2 lg:mx-36 lg:mt-16 md:mx-16 sm:mx-10">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center -mb-20 mt-10">
              <label
                htmlFor="semester"
                className="block text-md font-medium text-[1.34rem] text-gray-900 dark:text-white text-center mr-5"
              >
                Semester : {semester.code}
              </label>
            </div>
            <div className="flex justify-center mt-32 h-10">
              <label
                htmlFor="start_date"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white text-center mr-5"
              >
                Semester Viva Start Date
              </label>
              <input
                type="date"
                id="start_date"
                value={semester_viva_start_date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className="bg-gray-50 border mr-24 border-blue-700 focus:outline-none text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-62 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="mm/dd/yyyy"
                required
              />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8 pl-36 2xl:pl-44 xl:pl-32 lg:pl-11 md:pl-2 sm:pl-">
              <div className="flex justify-center mr-48 h-10 mt-10">
                <label
                  htmlFor="slotduration"
                  className="block mb-2 text-md font-medium text-gray-900  dark:text-white"
                >
                  Viva Slot Duration
                </label>
                <input
                  type="text"
                  id="vivaslotduration"
                  value={viva_slot_duration}
                  onChange={(e) => {
                    setSlot(e.target.value);
                  }}
                  className="bg-gray-50 border border-blue-700  focus:outline-none ml-4 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex h-10 mt-10 mr-12">
                <label
                  htmlFor="slotgap"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white mr-14"
                >
                  Slot Gap
                </label>
                <input
                  type="text"
                  id="slotgap"
                  value={viva_slot_gap}
                  onChange={(e) => {
                    setGap(e.target.value);
                  }}
                  className="bg-gray-50 border  border-blue-700 focus:outline-none -ml-11 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex h-10 mt-8 ml-1">
                <label
                  htmlFor="rbreak"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Regular Break From
                </label>
                <input
                  type="time"
                  id="rbreak"
                  value={regular_break_from}
                  onChange={(e) => {
                    setRegbreak(e.target.value);
                  }}
                  className="bg-gray-50 border border-blue-700 focus:outline-none ml-4 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="00:00:00"
                  required
                />
              </div>
              <div className="flex h-10 mt-8 ml-4">
                <label
                  htmlFor="tbreak"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  To
                </label>
                <input
                  type="time"
                  id="tbreak"
                  value={regular_break_to}
                  onChange={(e) => {
                    setBreakto(e.target.value);
                  }}
                  className="bg-gray-50 border border-blue-700 focus:outline-none ml-4 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="00:00:00"
                  required
                />
              </div>

              <div className="flex h-10 mt-8 ml-1">
                <label
                  htmlFor="fbreak"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Friday Break From
                </label>
                <input
                  type="time"
                  id="fbreak"
                  value={friday_break_from}
                  onChange={(e) => {
                    setFridaybreak(e.target.value);
                  }}
                  className="bg-gray-50 border border-blue-700 focus:outline-none ml-7 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="00:00:00"
                  required
                />
              </div>

              <div className="flex h-10 mt-8 ml-4">
                <label
                  htmlFor="fridaye"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  To
                </label>
                <input
                  type="time"
                  id="fridaye"
                  value={friday_break_to}
                  onChange={(e) => {
                    setFridaybreakto(e.target.value);
                  }}
                  className="bg-gray-50 border border-blue-700 focus:outline-none ml-4 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="00:00:00"
                  required
                />
              </div>

              <div className="flex h-10 mt-8 ">
                <label
                  htmlFor="includes"
                  className="block mb-2 text-md font-medium  mr-8"
                >
                  Includes
                </label>
                <ul class="items-center w-full text-sm font-medium rounded-lg sm:flex">
                  <li class="w-full border-b sm:border-b-0 sm:border-r">
                    <div class="flex items-center ps-3 outline outline-1 outline-blue-700">
                      <input
                        id="vue-checkbox-list"
                        type="checkbox"
                        checked={is_saturday}
                        onChange={(e) => {
                          setSaturday(e.target.checked);
                        }}
                        className="w-4 h-4 text-blue-600  focus:ring-blue-500 dark:focus:ring-blue-600"
                      />
                      <label
                        for="vue-checkbox-list"
                        class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Saturday
                      </label>
                    </div>
                  </li>
                  <li class="w-full border-b border-gray-00 outine outine-2 outline-gray-100 sm:border-b-0 sm:border-r dark:border-gray-200">
                    <div class="flex items-center ps-3 outline outline-1 outline-blue-700">
                      <input
                        id="react-checkbox-list"
                        type="checkbox"
                        checked={is_sunday}
                        onChange={(e) => {
                          setSunday(e.target.checked);
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="react-checkbox-list"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Sunday
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <button
              type="submit"
              className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-40 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                2xl:w-32 2xl:text-xl xl:w-28 xl:mr-40 lg:w-24 lg:mr-12 md:mr-16 md:w-20 mt-14"
            >
              Add
            </button>
            <button
              type="button"
              className="text-white mb-16 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                2xl:w-32 2xl:text-xl xl:w-28 lg:w-24 md:w-20 mt-14"
              onClick={mainList}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default addcampus;
