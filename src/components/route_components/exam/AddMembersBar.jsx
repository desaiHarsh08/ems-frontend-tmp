import axios from 'axios';
import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const AddMembersBar = ({ toogleAddMembersBar, setToogleAddMembersBar, labelAddMembersBar }) => {

    const auth = useSelector((state) => state.auth);
    const host = useSelector((state) => state.host.host);
    const exam = (useSelector((state) => state.exam)).examSelected;

    const [progressStatus, setProgressStatus] = useState(0);

    const extractFileData = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataFromFile = e.target.result;
                const workbook = XLSX.read(dataFromFile, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
                resolve(data);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    }

    const getInfo = () => {
        if (labelAddMembersBar.toLowerCase() === "add examiners") {
            return { columnName: 'Name of Examiner', userType: 'EXAMINER' };
        }
        else if (labelAddMembersBar.toLowerCase() === "add support staff") {
            return { columnName: 'Name of support staff', userType: 'SUPPORT_STAFF' };
        }
        else if (labelAddMembersBar.toLowerCase() === "add invigilator") {
            return { columnName: 'Name of Invigilators', userType: 'INVIGILATOR' };
        }
    }

    const handleUploadAddMembers = async (e) => {
        e.preventDefault();
        const file = document.getElementById('add-member-file').files[0];
        if (!file) {
            Swal.fire({
                title: 'Alert',
                text: 'Please provide the file...!',
                icon: 'error', // Options: 'success', 'error', 'warning', 'info'
            });
        }

        const excelData = await extractFileData(file);

        // FORMAT THE DATA IN REQUIRED OBJECT ACCEPTED BY THE BACKEND SCRIPT
        const formatedData = [];
        for (let i = 0; i < excelData.length; i++) {
            let memberObj = {
                username: excelData[i][getInfo().columnName],
                email: excelData[i]["Email"],
                userType: getInfo().userType,
                phone: excelData[i]["Mobile"],
                examName: exam.examName,
                examDate: exam.examDate,
                examTime: exam.examTime,
                examId: exam._id
            };
            if (getInfo().userType === 'INVIGILATOR') {
                memberObj["roomNumber"] = excelData[i]["Room no"];
            }
            formatedData.push(memberObj);
        }
        console.log(formatedData);

        document.getElementById('progress-container').classList.toggle('invisible');
        // UPLOAD THE MEMBERS: -
        for (let i = 0; i < formatedData.length; i++) {
            try {
                const response = await axios.post(`${host}/api/common_role_assign/create`,
                    formatedData[i],
                    {
                        headers: {
                            accessToken: auth["user-credentials"].accessToken,
                            refreshToken: auth["user-credentials"].refreshToken,
                            email: auth["user-credentials"].user.email
                        }
                    }
                );
                console.log("members uploaded", response.data.payload)
            } catch (error) {
                console.log(error);
            }
            let ps = (((i+1)*100)/formatedData.length).toFixed(1);
            setProgressStatus(ps);
        }
        document.getElementById('progress-container').classList.toggle('invisible');
        handleCloseAddMemberBar();
    }

    const handleCloseAddMemberBar = () => {
        console.log('fired');
        setToogleAddMembersBar(false);
    }

    return (
        <>
            <div className={`w-[56vh] flex gap-[2px]  z-10 absolute top-0 ${!toogleAddMembersBar ? 'translate-x-[1000px] hidden' : ''} top-0 right-0 bottom-0 transition-all duration-300`}>
                <div id="close-add-members-bar" className="close-add-members-bar w-12 flex justify-center py-1 text-4xl">
                    <div className='hover:bg-slate-50 border border-blue-400 h-12 w-12 flex justify-center bg-white cursor-pointer items-center'>
                        <button className='' onClick={handleCloseAddMemberBar}><IoCloseSharp /></button>
                    </div>
                </div>
                <div className="add-members-bar-container bg-white h-full border border-slate-400 p-3" >
                    <div className='my-7 pb-1 border-b-2 border-blue-500'>
                        <h3 className=' text-center text-xl font-medium'>{labelAddMembersBar}</h3>
                    </div>
                    <form onSubmit={handleUploadAddMembers}>
                        <input type="file" name='file' id='add-member-file' />
                        <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium'>Upload</button>
                    </form>
                    {/* <p className='my-3'>Available: 0</p> */}
                </div>
            </div>

            <div id="progress-container" className="invisible progress-container absolute bottom-7 left-0 right-0 flex justify-center items-center">
                <div className='border flex flex-col gap-2 p-5 bg-purple-500 text-white font-medium rounded-md '>
                    <div className="flex gap-2">
                        <span>Completed&nbsp;:</span>
                        <span>{progressStatus}%</span>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AddMembersBar
