import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AnswerScriptCountingRow = ({ indexFloor, floorNumber, room, handleChangeExam, handleSaveExam }) => {
    // console.log(floorNumber, room, indexFloor)
    const [actual, setActual] = useState(room.answerScript?.actual);
    const [remark, setRemark] = useState(room.answerScript.remark);
    
    // const handleChange = (e) => {
    //     console.log(room)
    //     // let newRoom = room;
    //     // newRoom.answerScript["expected"] = room.seatsArr[0];


    //     room.answerScript["expected"] = room.seatsArr[0];
    //     const {name, value} = e.target;
    //     if(name === 'actual') {
    //         // newRoom.answerScript["actual"] = Number(value);
    //         room.answerScript.actual = Number(value);
    //         setActual(value);
    //     }
    //     else {
    //         // newRoom.answerScript.remark = value;
    //         room.answerScript.remark = value;
    //         setRemark(value);
    //     }
    //     room = newRoom;

    //     // console.log("in ascr change", floorNumber, room)
    //     handleChangeExam(indexFloor, floorNumber, room);




    //     // if (!room.answerScript) {
    //     //     room.answerScript = {};
    //     // }
        
    //     // const { name, value } = e.target;
    
    //     // if (name === 'actual') {
    //     //     room.answerScript.actual = Number(value);
    //     //     setActual(value);
    //     // } else if (name === 'remark') {
    //     //     room.answerScript.remark = value;
    //     //     setRemark(value);
    //     // }
    
    //     // handleChangeExam(indexFloor, floorNumber, room);
    // }

    const handleChange = (e) => {
        const newRoom = { ...room };  // Create a new object based on the existing room
    
        newRoom.answerScript = {
            expected: room.seatsArr[0],
            actual: room.answerScript?.actual || 0,  // Set a default value for actual
            remark: room.answerScript.remark || '',  // Set a default value for remark
        };
    
        const { name, value } = e.target;
        if(value === '' ) {
            Swal.fire({
                title: 'Alert',
                text: 'Please provide the remarks...!',
                icon: 'error', // Options: 'success', 'error', 'warning', 'info'
            });
            return;
        }
    
        if (name === 'actual') {
            newRoom.answerScript.actual = Number(value);
            setActual(value);
        } else if (name === 'remark') {
            newRoom.answerScript.remark = value;
            setRemark(value);
        }
    
        handleChangeExam(indexFloor, floorNumber, newRoom);
    }
    

    return (
        <div>
            <ul className='flex'>
                <li className='py-2 w-[16.66%]  text-center flex justify-center items-center border-r border-slate-400'><p>{floorNumber}</p></li>
                <li className='py-2 w-[16.66%]  text-center flex justify-center items-center border-r border-slate-400'><p>{room.roomNumber}</p></li>
                <li className='py-2 w-[16.66%]  text-center flex justify-center items-center border-r border-slate-400'><p>{room.seatsArr[0]}</p></li>
                <li className='py-2 w-[16.66%]  text-center flex justify-center items-center border-r border-slate-400'>
                    <label htmlFor="actualScripts"></label>
                    <input type="number" name='actual' id='actual' value={actual} onChange={handleChange} className='px-4 py-1 border rounded-md text-center' />
                </li>
                <li className='py-2 w-[16.66%]  text-center flex justify-center items-center border-r border-slate-400'>
                    {
                        room.answerScript.expected != actual ?
                        <>
                        <label htmlFor="remarks"></label>
                    <input type="text" name='remark' id='remark' value={remark} onChange={handleChange} className='px-4 py-1 border rounded-md text-center' />
                        </> : ''
                    }
                </li>
                <li className='py-2 w-[16.66%]  text-center flex justify-center items-center'>
                    <button 
                        onClick={(e)=>{
                            handleSaveExam(e, JSON.parse(localStorage.getItem('exam')));
                            e.target.classList.add('bg-green-500');
                            e.target.classList.add('hover:bg-green-600');
                            e.target.classList.remove('bg-blue-500');
                            e.target.classList.remove('hover:bg-blue-600');
                            Swal.fire({
                                title: 'Alert',
                                text: 'Saved successfully...!',
                                icon: 'success', // Options: 'success', 'error', 'warning', 'info'
                            });
                        }} 
                        className='bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium px-4 py-2'>
                        Save
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AnswerScriptCountingRow