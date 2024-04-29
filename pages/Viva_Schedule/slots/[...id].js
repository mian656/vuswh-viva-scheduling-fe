import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const slots = () => {
  const router = useRouter();
  const [semesterviva, setSemesterviva] = useState("");
  const [error, setError] = useState("");
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`/semesterViva/semestervivadetails/${id}`)
        .then((res) => {
          setSemesterviva(res.data);
          // console.log(res.data);
          // console.log(res.data.break_duration_in_minutes);
          // console.log(res.data.includes);
          // console.log(res.data.semesterviva);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error.message);
        });
    }
  }, [id]);

  const goToList = () => {
    router.push("/semesterviva");
  };
  const mainList = () => {
    router.push("/campuses");
  };
  const updateb = () => {
    router.push(`/campuses/update/${id}`);
  };
  const date = '< hello >'
  return (
    <div>
      <div className="bg-white">
        <div className="container-fluid border-blue-800 mx-48 h-[570px] mt-9 border-8 ">
          <div className="text-[1.5rem] ml-48 mt-3">
            {date}
           </div>
          <div>
            <label
              htmlFor="Contact"
              className="text-black font-semibold ml-14 text-[1rem]"
            >
              Campus:
            </label>
          </div>
          <div>
            <label
              htmlFor="Email"
              className="text-black font-semibold ml-14 mt-3 text-[1rem]"
            >
              Semester:
            </label> 
          </div>                                 
          <div>
            <label
              htmlFor="Skype"
              className="text-black font-semibold ml-14 mt-5 text-[1rem]"
            >
              Start Date:
            </label>
          </div>
          <div>
            <label
              htmlFor="Address"
              className="text-black font-semibold ml-14 mt-10 text-[1rem]"
            >
              End Date:
            </label>
            <h3 className="text-blue-700 font-medium ml-20"></h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default slots;
