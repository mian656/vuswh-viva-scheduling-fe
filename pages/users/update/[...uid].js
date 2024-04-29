import Layout from "@/Components/layouts/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Select from 'react-select';

export async function getServerSideProps(context) {
  const { params } = context;
  const data = await axios.get(`/users/update/${params.uid}`);
  console.log(data.data.userRecord.roles)

  //The following loop update the main roles array to replace the id with value and name with label
  const updatedRoles = data.data.roles.map((item) => {
    return {
      ...item,
      label: item.name,
      value: item.id,
    };
  });
  //The following loop update the selected roles from DB to replace the id with value and name with label
  const userRs = data.data.userRecord.roles.map((item) => {
    return {
      ...item,
      label: item.name,
      value: item.id,
    };
  });

  return {
    props: {
      userRecord: data.data.userRecord,
      userRoles: userRs,
      roles: updatedRoles,
      uid: params.uid
    }
  }
}



const Update = ({ userRecord, roles, userRoles, uid }) => {
  const router = useRouter()
  const [fullname, setFullname] = useState(userRecord.fullname);
  const [phoneno, setPhoneno] = useState(userRecord.phoneno);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [Error, setIsError] = useState("");

  const handleSelectChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions ? selectedOptions.map(item => item.id) : []);
  };


  const updateUser = () => {
    axios.patch(`/users/update/${uid}`,
      {
        "fullname": fullname,
        "phoneno": phoneno,
        "rolesIds": selectedRoles
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data,
        });
        console.log(res);
        router.push('/users')
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response.data.message,
        });
      });
  };

  const validateForm = () =>{
    let errors = {};

    if (!fullname) {
      errors.fullname = 'Full Name is required*';
    }
    else if (!/^[a-zA-Z\s]*$/.test(fullname)) {
      errors.fullname = 'Full Name must not contain numbers or special characters.';
    }
    else if (fullname.length > 50) {
      errors.fullname = 'Full Name must be less than or equal to 50 characters'
    }
    else if (fullname.length < 3) {
      errors.fullname = 'Full Name must be at least 3 characters'
    }

    if (!phoneno) {
      errors.phoneno = 'Phone No is required.';
    } else
      if (!/^\d+$/.test(phoneno)) {
        errors.phoneno = 'Phone No. must contain only numbers.';
      } else if (phoneno.length < 11) {
        errors.phoneno = 'Phone No must be at least 11 digits.';
      } else if (phoneno.length > 13) {
        errors.phoneno = 'Phone No must be less than or equal to 13 digits.';
      }

    if (!selectedRoles || selectedRoles.length === 0) {
      errors.roles = 'You must select at least one role';
    }

    setIsError(errors);

    if (Object.keys(errors).length > 0){ 
      return false; 
    }else{ 
      return true; 
    } 
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(validateForm())

    if (validateForm()) {
      updateUser();
    }
  }


  const goToUsers = () => {
    router.push("/users")
  }
  return (
    <div>
      <Layout>
        <section className="flex flex-col min-h-screen mt-8 box-border mb-32 justify-center  items-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full bg-white rounded-lg shadow dark:border  border border-solid border-slate-700  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update User
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label for="fullname" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">Full Name:</label>
                  <input type="text"
                    value={fullname}
                    onChange={
                      (e) => {
                        setFullname(e.target.value);
                      }
                    } name="fullname"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full Name" required="" />
                </div>
                {Error.fullname && <span className="text-red-600 text-sm">{Error.fullname}</span>}

                <div>
                  <label for="email" className="block text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                  <input type="email"
                    value={userRecord.email}
                    name="email"
                    id="email"
                    readOnly
                    className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {Error.email && <p className="text-red-600 text-sm">{Error.email}</p>}
                <div>
                  <label for="username" className="block text-sm font-medium text-gray-900 dark:text-white">User Name:</label>
                  <input type="text" value={userRecord.username} name="username" id="username" className="bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                </div>
                <div>
                  <label for="phone" className="block text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
                  <input type="tel" onChange={(e) => {
                    setPhoneno(e.target.value);
                  }}
                    value={phoneno} name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+92xxxxxxxxxx" />
                </div>
                {Error.phoneno && <p className="text-red-600 text-sm">{Error.phoneno}</p>}



                <div className='flex space-x-2 p-2 mt-3'>

                  <label for="roles" className="block text-sm font-medium text-gray-900 dark:text-white">Roles:</label><br />
                  <Select
                    closeMenuOnSelect={true}
                    defaultValue={userRoles}
                    isMulti
                    options={roles}
                    onChange={handleSelectChange}
                    className="p-0 m-1 border w-96  pl-2  border-gray-50 rounded-2xl"
                  />
                </div>
                {Error.roles && <span className="text-red-600 text-sm">{Error.roles}</span>}

                <div>
                  <button
                    type="button"
                    onClick={goToUsers}
                    className="px-10 text-white mb-5 rounded-xl ml-5 float-right w-32 text-center hover:bg-[#282929] font-medium  py-2.5  bg-gray-600 hover:bg-primary-700  focus:outline-none text-sm dark:focus:ring-primary-800">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-10 text-white mb-5 rounded-xl ml-5 w-32 text-center  float-right hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium bg-blue-600 hover:bg-primary-700  focus:outline-none   text-sm  py-2.5 dark:focus:ring-primary-800 ">
                    Update
                  </button>
                </div>

              </form>
            </div>
          </div>
        </section>

      </Layout>

    </div>

  )
}
export default Update






