import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Layout from "@/Components/layouts/Layout";
export async function getServerSideProps(context) {
  const { params } = context;
  const data = await axios.get(`/campuses/getUpdate/${params.id}`);
  console.log(data.data);

  const cityRecord = data.data.city;

  const cityObj = {
    label: cityRecord.name,
    value: cityRecord.id,
  };

  const ProvinceRecord = data.data.province;

  const provinceObj = {
    label: ProvinceRecord.name,
    value: ProvinceRecord.id,
  };

  const tentativeRecord = data.data.tentative_viva_campus;

  const tentativeObj = tentativeRecord
    ? { label: tentativeRecord.code, value: tentativeRecord.id }
    : null;
  return {
    props: {
      id: params.id,
      campusRecord: data.data,
      cityR: cityObj,
      provinceR: provinceObj,
      TentCampus: tentativeObj,
    },
  };
}

const updatecampus = ({ id, campusRecord, cityR, provinceR, TentCampus }) => {
  const router = useRouter();
  // const { id } = router.query;
  // const [campus, setCampus] = useState("");
  const [code, setCode] = useState(campusRecord.code);
  const [name, setName] = useState(campusRecord.name);
  const [address, setAddress] = useState(campusRecord.address);
  const [phone, setPhone] = useState(campusRecord.phone);
  const [mobile, setMobile] = useState(campusRecord.mobile);
  const [campus_purpose, setCampusPurpose] = useState(campusRecord.campus_purpose);
  const [email, setEmail] = useState(campusRecord.email);
  const [fax, setFax] = useState(campusRecord.fax);
  const [coordinates, setCoordinates] = useState(campusRecord.coordinates);
  const [skype_id, setSkype_id] = useState(campusRecord.skype_id);
  const [error, setError] = useState(campusRecord.error);
  const [city, setCity] = useState(cityR ? cityR.value : "");
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState(provinceR ? provinceR.value : "");
  const [provinces, setProvinces] = useState([]);
  const [tentative, setTentative] = useState("");
  const [tentCampusArray, setTentativeArray] = useState([]);

  // useEffect section
  useEffect(() => {
    axios
      .get("/provinces/lookup")
      .then((res) => {
        setProvinces(res.data);
        //   console.log(res.data)
      })
      .catch((error) => {
        setError(error.message);
        // console.log(error.data);
      });
  }, []);

  //2nd useeffect for city based on prov.
  useEffect(() => {
    if (province) {
      axios
        .get(`/cities/lookup/${province}`)
        .then((res) => {
          setCities(res.data);
          console.log(res.data);
        })

        .catch((err) => {
          setError(err.message);
        });
    }
  }, [province]);

  //3rd useeffect for tentative viva campus. get
  useEffect(() => {
    axios
      .get(`/campuses/tentativeVivaCampuses`)
      .then((res) => {
        setTentativeArray(res.data);
        console.log(res.data);
      })

      .catch((err) => {
        setError(err.message);
      });
  }, [province]); // Add 'province' to the dependency array

  //Patch Request
  const updates = () => {
    axios
      .patch(`/campuses/update/${id}`, {
        code: code,
        name: name,
        phone: phone,
        mobile: mobile,
        fax: fax,
        email: email,
        skype: skype_id,
        campus_purpose: campus_purpose,
        tentative_viva_campus: tentative,
        address: address,
        coordinates: coordinates,
        city: city,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  //

  const handleSubmit = (e) => {
    e.preventDefault();
    updates();
  };

  //router portion
  const goToList = () => {
    router.push("/campuses");
  };

  return (
    // <div>
    //     <Layout>
    //         <div className="bg-white">
    //             <div className="text-blue-800 font-bold text-4xl m-8 text-center 2xl:text-5xl 2xl:mt-12 xl:text-4xl xl:mt-0 xl:pt-5 lg:text-4xl md:text-3xl sm:text-xl">
    //                 Update Campus
    //             </div>
    //             <div className="container-fluid border-8 border-blue-800 mx-36 h-[830px] 2xl:mt-20 2xl:mx-36 xl:mx-36 xl:mt-12 lg:mx-36 lg:mt-16 md:mx-16 sm:mx-10">
    //                 <form onSubmit={handleSubmit}>
    //                     <div className="grid gap-6 mb-6 md:grid-cols-2 pt-8 pl-36 2xl:pl-44 xl:pl-32 lg:pl-11 md:pl-2 ">
    //                         <div>
    //                             <label
    //                                 htmlFor="campus_code"
    //                                 className="block mb-2 text-md font-medium  text-blue-700  dark:text-white"
    //                             >
    //                                 Campus Code
    //                             </label>
    //                             <input
    //                                 type="text"
    //                                 value={code}
    //                                 onChange={(e) => setCode(e.target.value)}
    //                                 id="campus_code"
    //                                 className="bg-gray-50 border text-blue-500 border-gray-50 outline outline-2 outline-gray-400 uppercase focus:outline-none  text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    //                         "
    //                                 required
    //                             />
    //                         </div>
    //                         <div>
    //                             <label
    //                                 htmlFor="campus_name"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Campus Name
    //                             </label>
    //                             <input
    //                                 type="text"
    //                                 value={name}
    //                                 onChange={(e) => setName(e.target.value)}
    //                                 id="last_name"
    //                                 className="bg-gray-50 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    //                         "
    //                                 required
    //                             />
    //                         </div>
    //                         <div>
    //                             <label
    //                                 htmlFor="phone"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Phone
    //                             </label>
    //                             <input
    //                                 type="tel"
    //                                 id="phone"
    //                                 value={phone}
    //                                 onChange={(e) => setPhone(e.target.value)}
    //                                 className="bg-gray-50 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    //                         "
    //                                 required
    //                             />
    //                         </div>
    //                         <div>
    //                             <label
    //                                 htmlFor="phone"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Mobile
    //                             </label>
    //                             <input
    //                                 type="tel"
    //                                 id="phone"
    //                                 value={mobile}
    //                                 onChange={(e) => setMobile(e.target.value)}
    //                                 className="bg-gray-50 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                                 required
    //                             />
    //                         </div>

    //                         <div>
    //                             <label
    //                                 htmlFor="fax"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Fax
    //                             </label>
    //                             <input
    //                                 type="tel"
    //                                 id="fax"
    //                                 value={fax}
    //                                 onChange={(e) => setFax(e.target.value)}
    //                                 className="bg-gray-50 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                                 required
    //                             />
    //                         </div>

    //                         <div className="mb-6">
    //                             <label
    //                                 htmlFor="email"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Email
    //                             </label>
    //                             <input
    //                                 type="email"
    //                                 id="email"
    //                                 value={email}
    //                                 onChange={(e) => setEmail(e.target.value)}
    //                                 className="bg-gray-50 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                                 required
    //                             />
    //                         </div>

    //                         <div>
    //                             <label
    //                                 htmlFor="skype_id"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Skype ID
    //                             </label>
    //                             <input
    //                                 type="text"
    //                                 id="skype_id"
    //                                 value={skype_id}
    //                                 onChange={(e) => setSkype_id(e.target.value)}
    //                                 className="bg-gray-50 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                                 required
    //                             />
    //                         </div>
    //                         <div>
    //                             <label
    //                                 htmlFor="campus_purpose"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Campus Purpose
    //                             </label>
    //                             <select
    //                                 id="campus_purpose"
    //                                 value={campus_purpose}
    //                                 onChange={(e) => setCampusPurpose(e.target.value)}
    //                                 className="bg-gray-50 focus:outline-none block w-72 mt-0 border border-gray-50  outline outline-2 outline-gray-400  text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                             >
    //                                 <option selected>Select</option>
    //                                 <option value="Viva Campus">Viva Campus</option>
    //                                 <option value="Student Campus">Student Campus</option>
    //                                 <option value="Both Campuses">Both</option>
    //                             </select>
    //                         </div>

    //                         <div>
    //                             <label
    //                                 htmlFor="Address"
    //                                 className="block mb-2 text-md font-medium text-blue-700  dark:text-white"
    //                             >
    //                                 Address
    //                             </label>
    //                             <input
    //                                 type="text"
    //                                 id="Address"
    //                                 value={address}
    //                                 onChange={(e) => setAddress(e.target.value)}
    //                                 className="bg-gray-50 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-500 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                                 required
    //                             />
    //                         </div>

    //                         {/* <div>
    //                     <label for="Province" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Province</label>
    //                     <select id="Province"
    //                         value={province}
    //                         onChange={(e) => setProvince(e.target.value)}
    //                         className="bg-gray-50 block w-72 mt-0 focus:outline-none border border-gray-300  text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    //                         <option selected>Select</option>
    //                         {
    //                             provinces.map((prov) => (
    //                                 <option key={prov.id} value={prov.id}>
    //                                     {prov.name}
    //                                 </option>
    //                             ))
    //                         }

    //                     </select>
    //                 </div> */}
    //                         <div>
    //                             <label
    //                                 htmlFor="Coordinates"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Coordinates
    //                             </label>
    //                             <input
    //                                 type="text"
    //                                 value={coordinates}
    //                                 id="Coordinates"
    //                                 onChange={(e) => {
    //                                     setCoordinates(e.target.value);
    //                                 }}
    //                                 className="bg-gray-50 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-600 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                                 required
    //                             />
    //                         </div>

    //                         <div>
    //                             <label
    //                                 htmlFor="Province"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Province
    //                             </label>
    //                             <select
    //                                 id="Province"
    //                                 // value={provinceR}
    //                                 defaultValue={provinceR ? provinceR.value : ""}
    //                                 onChange={(e) => {
    //                                     setProvince(e.target.value);
    //                                 }}
    //                                 className="bg-gray-50 block w-72 mt-0 focus:outline-none border border-gray-50  outline outline-2 outline-gray-400  text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                             >
    //                                 <option value="" disabled>
    //                                     Select
    //                                 </option>
    //                                 {/* {provinceR && (
    //                             <option key={provinceR.value} value={provinceR.value}>
    //                                 {provinceR.label}
    //                             </option>
    //                         )} */}
    //                                 {provinces.map((prov) => (
    //                                     <option key={prov.id} value={prov.id}>
    //                                         {prov.name}
    //                                     </option>
    //                                 ))}
    //                             </select>
    //                         </div>

    //                         <div>
    //                             <label
    //                                 htmlFor="City"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 City
    //                             </label>
    //                             <select
    //                                 id="City"
    //                                 // value={cityR}
    //                                 defaultValue={city}
    //                                 onChange={(e) => setCity(e.target.value)}
    //                                 className="bg-gray-50 block w-72 mt-0 border border-gray-50  outline outline-2 outline-gray-400 focus:outline-none text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                             >
    //                                 <option value="" disabled>
    //                                     Select
    //                                 </option>
    //                                 {/* {cityR && (
    //                             <option key={cityR.value} value={cityR.value}>
    //                                 {cityR.label}
    //                             </option>
    //                         )} */}
    //                                 {cities.map((ct) => (
    //                                     <option key={ct.id} value={ct.id}>
    //                                         {ct.name}
    //                                     </option>
    //                                 ))}
    //                             </select>
    //                         </div>

    //                         <div>
    //                             <label
    //                                 htmlFor="Tentative"
    //                                 className="block mb-2 text-md font-medium text-blue-700 dark:text-white"
    //                             >
    //                                 Tentative Viva-Campus
    //                             </label>
    //                             <select
    //                                 id="Tentative"
    //                                 defaultValue={TentCampus ? TentCampus.value : ""}
    //                                 onChange={(e) => setTentative(e.target.value)}
    //                                 className="bg-gray-50 focus:outline-none block w-72 mt-0 border border-gray-50  outline outline-2 outline-gray-400  text-blue-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 h-10.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                             >
    //                                 <option value="" disabled>
    //                                     Select
    //                                 </option>
    //                                 {/* {TentCampus && (
    //           <option key={TentCampus.id} value={TentCampus.id}>
    //             {TentCampus.value}
    //           </option>
    //         )} */}
    //                                 {tentCampusArray.map((tentative) => (
    //                                     <option key={tentative.id} value={tentative.id}>
    //                                         {tentative.name}
    //                                     </option>
    //                                 ))}
    //                             </select>
    //                         </div>
    //                         {/* <div>
    //                 <label for="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unique visitors (per month)</label>
    //                 <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
    //             </div> */}
    //                     </div>
    //                     <button
    //                         type="submit"
    //                         className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-40 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
    //         2xl:w-32 2xl:text-xl xl:w-28 xl:mr-40 lg:w-24 lg:mr-12 md:mr-16 md:w-20"
    //                     >
    //                         Update
    //                     </button>
    //                     <button
    //                         type="button"
    //                         className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
    //         2xl:w-32 2xl:text-xl xl:w-28 lg:w-24 md:w-20"
    //                         onClick={goToList}
    //                     >
    //                         Cancel
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>
    //     </Layout>
    // </div>


    <div>
      <Layout>
        <div className="bg-white flex flex-col min-h-screen">
          <div className='text-slate-700 text-3xl  font-bold m-5'>Campuses</div>
          <h3 className="text-slate-700 ml-12 text-xl">Update Campus</h3>
          <div className="flex-grow">
            <form onSubmit={handleSubmit} className="container-fluid mt-10 h-[720px] mx-52 border-8 mb-5 border-black">
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

              <button
                type="submit"
                className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-40 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-md w-full sm:w-auto  px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                  2xl:w-32 2xl:text-xl xl:w-28 xl:mr-40 lg:w-24 lg:mr-12 md:mr-16 md:w-20"
              >
                Update
              </button>
              <button
                type="button"
                className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-7 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-md w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                  2xl:w-32 2xl:text-xl xl:w-52 xl: lg:w-32 md:w-20"
                onClick={goToList}
              >
                Cancel
              </button>
            </form>
          </div>
          {/* Sticky footer */}
          <footer className="w-full bg-gray-300 py-4">
            <div className="container mx-auto flex justify-end">
              <button
                type="submit"
                className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add
              </button>
              <button
                type="button"
                className="text-white mb-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={goToList}
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

export default updatecampus;
