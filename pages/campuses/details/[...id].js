// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Layout from "@/Components/layouts/Layout";
// import { useRouter } from "next/router";
// const details = () => {
//   const router = useRouter();
//   const [campusi, setCampusi] = useState("");
//   const [error, setError] = useState("");
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`/campuses/CampusDetail/${id}`)
//         .then((res) => {
//           setCampusi(res.data);
//           console.log(res.data);
//         })
//         .catch((error) => {
//           setError(error.message);
//           console.log(error.message);
//         });
//     }
//   }, [id]);

//   const mainList = () => {
//     router.push("/campuses");
//   };
//   const updateb = () => {
//     router.push(`/campuses/update/${id}`);
//   };

//     return (
//         <div>
//           <Layout>
//             <div className='bg-white bg-cover'>
//                 <h5 className='text-center font-bold text-slate-800 text-4xl pt-10'>Campus Details</h5>
//                 <div className='container-fluid border-slate-800 mx-72 h-[460px] mt-9 border-8 '>
//                     <div className='text-slate-500 text-center text-xl mt-5 font-bold'>
//                         {campusi && campusi.code}
//                         <span> {campusi && campusi.name}</span>
//                     </div>

//           {/* <div>
//             <label
//               htmlFor="Contact"
//               className="text-black font-semibold ml-6 mb-10"
//             >
//               Contact:
//             </label>
//             <h3 className="text-blue-700 font-medium ml-16">
//               <ul className="flex">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   class="w-6 h-6"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
//                   />
//                 </svg>
//                 <li>{campusi && campusi.phone}</li>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   class="w-6 h-6"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
//                   />
//                 </svg>
//                 <li>{campusi && campusi.mobile}</li>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   class="w-6 h-6"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
//                   />
//                 </svg>
//                 <li>{campusi && campusi.fax}</li>
//               </ul>
//             </h3>
//           </div> */}

// <div>
//           <label htmlFor="Contact" className="text-black font-semibold ml-6 mb-10">
//             Contact:
//           </label>
//           <ul className="ml-16 flex flex-col">
//             <li className="flex items-center text-slate-600 mb-2">
//             <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   class="w-6 h-6"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
//                   />
//                 </svg>
//               {campusi.phone}
//             </li>
//             <li className="flex items-center text-slate-600 mb-2">
//             <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   class="w-6 h-6"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
//                   />
//                 </svg>
//               {campusi.mobile}
//             </li>
//             <li className="flex items-center text-slate-600 mb-2">
//             <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke-width="1.5"
//                   stroke="currentColor"
//                   class="w-6 h-6"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
//                   />
//                 </svg>
//               {campusi.fax}
//             </li>
//           </ul>
//         </div>
//           <div>
//             <label
//               htmlFor="Email"
//               className="text-black font-semibold ml-6 mt-3"
//             >
//               Email:
//             </label>
//             <h3 className="text-slate-600 font-medium text-base ml-14">
//               {campusi.email}
//             </h3>
//           </div>

//           <div>
//             <label
//               htmlFor="Skype"
//               className="text-black font-semibold ml-6 mt-5"
//             >
//               Skype:
//             </label>
//             <h3 className="text-slate-600 font-medium ml-14">
//               {campusi && campusi.skype_id}
//             </h3>
//           </div>

//           <div>
//             <label
//               htmlFor="Address"
//               className="text-black font-semibold ml-6 mt-10"
//             >
//               Address:
//             </label>
//             <h3 className="text-slate-600 font-medium ml-20">
//               {campusi && campusi.address}
//             </h3>
//           </div>

//           <div>
//             <label
//               htmlFor="Campus Purpose"
//               className="text-black font-semibold ml-6"
//             >
//               Campus Purpose:
//             </label>
//             <h3 className="text-slate-600 font-medium ml-36">
//               {campusi && campusi.campus_purpose}
//             </h3>
//           </div>

//           <div>
//             <label
//               htmlFor="Tentative Viva Campus"
//               className="text-black font-semibold ml-6"
//             >
//               Tentative Viva Campus:
//             </label>
//             {campusi && campusi.tentative_viva_campus && (
//               <h3 className="text-slate-600 font-medium ml-44">
//                 {campusi.tentative_viva_campus.name}
//               </h3>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-40 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
//                 2xl:w-32 2xl:text-xl xl:w-28 xl:mr-16 lg:w-24 lg:mr-12 md:mr-16 md:w-20"
//             onClick={updateb}
//           >
//             Update
//           </button>
//           <button
//             type="button"
//             className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
//                 2xl:w-32 2xl:text-xl xl:w-28 lg:w-24 md:w-20"
//             onClick={mainList}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//       </Layout>
//     </div>
//   );
// };

// export default details;

//my original code


import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/Components/layouts/Layout";
import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  const [campusi, setCampusi] = useState("");
  const [error, setError] = useState("");
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`/campuses/CampusDetail/${id}`)
        .then((res) => {
          setCampusi(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error.message);
        });
    }
  }, [id]);

  const mainList = () => {
    router.push("/campuses");
  };
  const updateb = () => {
    router.push(`/campuses/update/${id}`);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-between">
        <div className="bg-white bg-cover flex-grow">
          <h5 className="m-5 font-bold text-slate-800 text-4xl pt-4">
          Campuses
          </h5>
          <h3 className="text-slate-800 text-xl ml-10">Campus Details</h3>
          {/* <hr></hr> */}
          <div className="container border-8 border-slate-600 mx-auto px-4 py-8 mt-5 mb-5">
            {campusi && (
              <div>
                <div className="text-slate-500 text-center text-xl mt-0 mb-10 font-bold">
                  {campusi.code} {campusi.name}
                </div>
                <div className="flex ml-12">
                <label className="text-black font-bold">Contact:</label>
                <ul className="mt-4">
                  <li className="flex items-center text-slate-600 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                    {campusi.phone}
                  </li>
                  <li className="flex items-center text-slate-600 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                    {campusi.mobile}
                  </li>
                  <li className="flex items-center text-slate-600 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                      />
                    </svg>
                    {campusi.fax}
                  </li>
                </ul>
                </div>
                <div className="mt-4 flex items-center ml-12">
  <label className="text-black font-bold ">Email:</label>
  <h3 className="text-slate-600 font-medium ml-2">{campusi.email}</h3>
</div>

                <div className="mt-4 flex items-center ml-12">
                  <label className="text-black font-bold">Skype:</label>
                  <h3 className="text-slate-600 font-medium ml-2">
                    {campusi.skype_id}
                  </h3>
                </div>
                <div className="mt-4 flex items-center ml-12">
                  <label className="text-black font-bold">Address:</label>
                  <h3 className="text-slate-600 font-medium ml-2">
                    {campusi.address}
                  </h3>
                </div>
                <div className="mt-4 flex items-center ml-12">
                  <label className="text-black font-bold">
                    Campus Purpose:
                  </label>
                  <h3 className="text-slate-600 font-medium ml-2">
                    {campusi.campus_purpose}
                  </h3>
                </div>
                <div className="mt-4 flex items-center ml-12">
                  <label className="text-black font-bold">
                    Tentative Viva Campus:
                  </label>
                  {campusi.tentative_viva_campus && (
                    <h3 className="text-slate-600 font-medium ml-4">
                      { campusi.tentative_viva_campus.name?campusi.tentative_viva_campus.name : "None"}
                    </h3>
                  )}
                </div>
                <div className="container mx-auto flex justify-end px-4">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 w-36 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-md px-5 py-2.5"
              onClick={updateb}
            >
              Update
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 w-36 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-md px-5 py-2.5 ml-4"
              onClick={mainList}
            >
              Cancel
            </button>
          </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-200 py-4">
          <div className="container mx-auto flex justify-end px-4">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5"
              onClick={updateb}
            >
              Update
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 ml-4"
              onClick={mainList}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Details;




