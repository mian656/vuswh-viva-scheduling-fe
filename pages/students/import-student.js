import React from 'react'
import { useState, useEffect } from "react";
import Layouts from "@/Components/layouts/lay";
import axios from "axios"
import * as XLSX from "xlsx";
//install: npm install xlsx
import Swal from 'sweetalert2';


const importstd = () => {
    const [data, setData] = useState([]);
    const [semesters, setSemesters] = useState(data.code);
    const [excelFile, setexcelFile] = useState(null);
    const [excelData, setexcelData] = useState(null);
    const [isError, setIsError] = useState({});
    const [viva_sem, setviva_sem] = useState();
    const [end_date, setend_date] = useState('');
    const [errorData, setErrorData] = useState([])
    const [importButtonDisabled, setImportButtonDisabled] = useState(false);



    console.log(excelData)

    const postData = () => {
        const payload = {
            viva_semester_id: semesters.id,
            eligibility_end_date: end_date,
            students: excelData,
        };
        axios
            .post('/students/import/', payload)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.data.status,
                });
                setErrorData(res.data.data_error)
                console.log("testing api res1", res.data);
                console.log("testing api res2", res.data.data_error);
                setexcelData([]);
                setImportButtonDisabled(true);
                // Clear excelData after successful post
                // setexcelData(null);
            })
            .catch((error) => {
                console.log("testing error", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response,
                });
            });
    };

    const validateForm = () => {
        let isError = {};
        const currentDate = new Date();

        if (!end_date) {
            isError.end_date = 'Eligibility End Date is required.';

        } else if (new Date(end_date) <= currentDate) {
            isError.end_date = 'Eligibility End Date should be greater than the current date.';
        }

        return isError;
    }


    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument-spreadsheetml.sheet',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setIsError({});
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setexcelFile(e.target.result);
                }
            }
            else {
                setIsError({ file: "Please select only excel file type." });
                // setIsError("Please select only excel file type.");
                setexcelFile(null);
            }
        }
        else {
            console.log("please select your file");
        }
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setexcelData(data.slice());
        }
    }

    const handleimportSubmit = (e) => {
        e.preventDefault();
        const isError = validateForm();
        if (Object.keys(isError).length === 0) {
            postData();
        } else {
            setIsError(isError);
        }
    }


    const handleExportToExcel = () => {
        if (errorData.length > 0) {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(errorData.map(item => ({ ...item, message: item.message ? item.message.join(', ') : '' })));
            XLSX.utils.book_append_sheet(wb, ws, 'ErrorData');

            const blobData = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            const uint8Array = Uint8Array.from(blobData, char => char.charCodeAt(0));
            const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'errorData.xlsx';
            document.body.appendChild(a);

            a.click();
            document.body.removeChild(a);

            setexcelData([]);
            setErrorData([]);
        } else {
            console.log('No error data to export.');
        }
    };


    const handleClearData = () => {
        // Clear the uploaded file and data
        setexcelFile(null);
        setexcelData(null);
        setErrorData([]); // Clear error data
        setIsError(null);
        setImportButtonDisabled(false); // Enable the import button
    };

    const renderTable = () => {
        if (errorData.length > 0) {
            // Display error data table
            return (
                <div className='table-responsive'>
                    <table className='table justify-center items-center w-full mt-2  border-2 p-5 bg-white rounded-xl'>
                        <thead className="h-20 items-center justify-between text-blue-700">
                            <tr className='p3 gap-10 items-center justify-between bg-slate-300'>
                                <th scope="col" className="px-6 py-3">Sr.</th>
                                <th scope="col" className="px-6 py-3">Student</th>
                                {/* <th scope="col" className="px-6 py-3">Email</th> */}
                                {/* <th scope="col" className="px-6 py-3">Phone No.</th> */}
                                <th scope="col" className="px-6 py-3">Project</th>
                                <th scope="col" className="px-6 py-3">Supervisor</th>
                                <th scope="col" className="px-6 py-3">City</th>
                                <th scope="col" className="px-6 py-3">Student Title</th>
                                <th scope="col" className="px-6 py-3">Campus</th>
                                <th scope="col" className="px-6 py-3">messages</th>
                            </tr>
                        </thead>
                        <tbody className='text-red-700'>
                            {errorData.map((getdata, index) => (
                                <tr className="text-center" key={index}>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{index + 1}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.name}<br />{getdata.vuid}</td>
                                    {/* <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.email}</td> */}
                                    {/* <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.phoneno}</td> */}
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.groupid}<br />{getdata.project_title}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.supervisor_name}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.city}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.study_status}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.campusCode}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.message.map((message) => message)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (excelData) {
            // Display imported data table
            return (
                <div className='table-responsive'>
                    <table className='table justify-center items-center w-full mt-2  border-2 p-5 bg-white text-blue-700 rounded-xl'>
                        <thead className="h-20 items-center justify-between ">
                            <tr className='p3 gap-10 items-center justify-between bg-slate-300'>
                                <th scope="col" className="px-6 py-3">Sr.</th>
                                <th scope="col" className="px-6 py-3">Student</th>
                                {/* <th scope="col" className="px-6 py-3">Email</th> */}
                                {/* <th scope="col" className="px-6 py-3">Phone No.</th> */}
                                <th scope="col" className="px-6 py-3">Project</th>
                                <th scope="col" className="px-6 py-3">Supervisor</th>
                                <th scope="col" className="px-6 py-3">City</th>
                                <th scope="col" className="px-6 py-3">Student Title</th>
                                <th scope="col" className="px-6 py-3">Campus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((getdata, index) => (
                                <tr className="text-center" key={index}>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{index + 1}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.name}<br />{getdata.vuid}</td>
                                    {/* <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.email}</td> */}
                                    {/* <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.phoneno}</td> */}
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.groupid}<br />{getdata.project_title}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.supervisor_name}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.city}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.study_status}</td>
                                    <td scope="row" className="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium " >{getdata.campusCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            // Display a message when no data is available
            return <div>No File is uploaded yet</div>;
        }
    };


    useEffect(() => {
        axios.get("/students/import/")
            .then((res) => {
                setSemesters(res.data)
            })
    }, [])




    return (
        <div>
            <Layouts>

                <div className="min-h-screen  outline-opacity-80 bg-white text-blue-700 border-opacity-5 border-solid border-8 border-blue-800">
                    <h2 className="ml-4 font-bold text-3xl">Import Students</h2>
                    <hr className='w-9/12 ml-4 mt-4 border-t-2 border-gray-300' />
                    <form onSubmit={handleFileSubmit}>
                        <div className='px-14 mt-3 ml-4 shadow-sm shadow-gray-600 border-gray-200 border '>
                            <div className='flex'>
                                <div className='m-2 '>
                                    <label className="block text-md">Semesters</label>
                                    <input
                                        type="text"
                                        value={semesters?.code}
                                        className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                                        readOnly
                                        onChange={(e) => {
                                            setviva_sem(e.target.value);
                                        }} />
                                </div>
                                <div className='m-2 ml-10'>
                                    <label className="block text-md">Student Data</label>
                                    <input
                                        type="file"
                                        // id="fileInput"
                                        // accept=".xlsx, .xls"
                                        onChange={handleFile}
                                        className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-3 border-gray-50 text-sm rounded-xl block "
                                        required />
                                    {isError && isError.file && (
                                        <div className="text-red-600 text-sm">{isError.file}</div>
                                    )}

                                </div>
                            </div>
                            <div className='flex'>
                                <div className='m-2 '>
                                    <label className="block text-md">Eligibility End Date</label>
                                    <input
                                        type="date"
                                        className="bg-gray-50 border w-60 h-10 p-2  outline-2 outline outline-gray-400  mt-2 border-gray-50 text-sm rounded-xl block "
                                        placeholder="mm/dd/yyyy"
                                        required
                                        value={end_date}
                                        onChange={(e) => {
                                            setend_date(e.target.value);
                                        }} />
                                    {isError && isError.end_date && <div className="text-red-600  text-sm">{isError.end_date}</div>}
                                </div>
                                <div className='flex space-x-2 pt-3 ml-10 float-right'>
                                    <button className="bg-blue-700 w-30 text-[#eeeff1] p-2 px-7 h-10 mt-7   rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium" type="reset">Reset</button>
                                    <button className="bg-blue-700 w-32 text-[#eeeff1] p-2 px-7 h-10 mt-7   rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium" type="submit">Upload</button>
                                </div>

                            </div>
                        </div>


                    </form>
                    <div className='bg-slate-300 mt-2 h-16'>
                        <button
                            onClick={handleimportSubmit}
                            type="button"
                            method="post"
                            className={`p-2 px-7 w-30 rounded-xl hover:scale-105 float-right mr-4 bg-blue-700 mt-3 pt-2.5 text-sm font-medium text-white ${importButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a3f49]'}`}
                            disabled={importButtonDisabled}
                        >
                            Import

                        </button>
                        <button
                            // onClick={}
                            onClick={handleClearData}
                            type="button"
                            method="post"
                            className="p-2 px-7 w-30 rounded-xl  hover:scale-105 float-right mr-4  bg-blue-700 mt-3 pt-2.5 text-sm font-medium text-white hover:bg-[#1a3f49] "
                        >
                            Clear Data
                        </button>
                        <button
                            onClick={handleExportToExcel}
                            type="button"
                            method="post"
                            className="p-2 px-7 w-30 rounded-xl hover:scale-105 float-right mr-4 bg-blue-700 mt-3 pt-2.5 text-sm font-medium text-white"
                        >
                            Export

                        </button>
                    </div>
                    {renderTable()}

                </div>
            </Layouts>
        </div>
    )
}

export default importstd
