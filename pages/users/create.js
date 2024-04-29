import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Layout from "@/Components/layouts/Layout";
import Multiselect from 'multiselect-react-dropdown';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("")
  const [phoneno, setPhoneno] = useState("");
  const [Error, setIsError] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectRoles, setSelectRoles] = useState([]);
  const [FormValid, setFormValid] = useState(false);

  useEffect(() => {
    axios
      .get("users/create")
      .then((res) => {
        setRoles(res.data.roles);
      })
      .catch((error) => {
        setIsError(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
      });
  }, []);

  const post = async () => {
    axios
      .post(
        "/users/create",
        {
          "email": email,
          "fullname": fullname,
          "username": username, 
          "phoneno": phoneno,
          "rolesIds": selectRoles,
        }
      )
      .then((res) => {
        console.log(res);
        NotificationManager.success('Success message', 'Created!', 3000); // 3000 milliseconds = 30 seconds
        router.push('/users')
      })
      .catch((err) => {
        console.log(err);
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

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Email is invalid.';
    } else if (!/^[a-zA-Z]{2}/.test(email)) {
      errors.email = 'Email must start with 2 alphabetic characters.';
    } else if (!/^\S+@\S+\.\S+$/.test(email) || !/^\S+@(vu\.edu\.pk|VU\.EDU\.PK)$/.test(email)) {
      errors.email = 'Email must end with "@vu.edu.pk".';
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

    if (!selectRoles || selectRoles.length === 0) {
      errors.roles = 'You must select at least one role';
    }

    setIsError(errors);
    if (Object.keys(errors).length === 0) { return true; }
    else { return false; }
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectRoles(prevRoles => [...prevRoles, selectedItem.id]);
  }

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    const usernameFromEmail = enteredEmail.split('@')[0];
    setUsername(usernameFromEmail);
  }

  const submit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    console.log(validateForm());

    if (validateForm()) {
      post();
    }
  };
  const goToUsers = () => {
    router.push("/users")
  }
  return (
    <>
      <Layout>
        <NotificationContainer />
        <section className="flex flex-col min-h-screen mt-12 box-border mb-32  justify-between items-center bg-gray-50 dark:bg-gray-900">
          <div className="w-full bg-white rounded-lg  shadow dark:border border border-solid border-slate-700 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Registration
              </h1>
              <form onSubmit={(e) => submit(e)} class="space-y-4 md:space-y-6" action="#">
                              <div>
                       <label for="fullname" class="block mb-0 text-sm font-medium text-gray-900 dark:text-white">Full Name:</label>
                      <input type="text"
                       value={fullname}
                       onChange={(e) => {
                      setFullname(e.target.value);
                  }}   name="fullname"
                       id="fullname"
                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Full Name" required="" />
                  </div>
                  {Error.fullname && <span className="text-red-600  text-sm">{Error.fullname}</span>}

                  <div>
                      <label for="email" class="block text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                      <input type="email"
                     value={email}
                     onChange={handleEmailChange}
                     name="email"
                     id="email" 
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="User@vu.edu.pk" required="" />
                  </div>
                  {Error.email && <p className="text-red-600  text-sm">{Error.email}</p>}
                  <div>
                      <label for="username" class="block text-sm font-medium text-gray-900 dark:text-white">User Name:</label>
                      <input type="text" value={username}
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }} name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="User Name"readOnly/>
                  </div>
                  <div>
                      <label for="phone" class="block text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
                      <input type="tel" value={phoneno}
                  onChange={(e) => {
                    setPhoneno(e.target.value);
                  }} name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+92xxxxxxxxxx"/>
                  </div>
                   {Error.phoneno && <p className="text-red-600 text-sm">{Error.phoneno}</p>}

                   <label for="roles" class="block text-sm font-medium text-gray-900 dark:text-white">Roles:</label>

                   <Multiselect className="bg-white text-black mt-0 "
                 options={roles} // Options to display in the dropdown
                 // selectedValues={state.selectedValue} // Preselected value to persist in dropdown
                 onSelect={onSelect} // Function will trigger on select event
                 // onRemove={onRemove} // Function will trigger on remove event
                 displayValue="name" // Property name to display in the dropdown options
               />
               {Error.roles && <span className="text-red-600 text-sm">{Error.roles}</span>}
          
                 <div>
               <button type="button"  onClick={goToUsers} className="px-10 text-white mb-5 rounded-xl ml-5 float-right w-32 text-center hover:bg-[#282929] font-medium  py-2.5  bg-gray-600 hover:bg-primary-700  focus:outline-none text-sm dark:focus:ring-primary-800">Cancel</button>
                 <button type="submit" className="px-10 text-white mb-5 rounded-xl ml-5 w-32 text-center  float-right hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium bg-blue-600 hover:bg-primary-700  focus:outline-none   text-sm  py-2.5 dark:focus:ring-primary-800 ">Submit</button>
                 </div>
               </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Signup;
