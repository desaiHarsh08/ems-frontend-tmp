import React, { useEffect, useRef, useState } from 'react'

const AnswerScriptCountingRow = ({ indexFloor, floorNumber, room, handleChangeExam, handleSaveExam }) => {
    // // console.log(floorNumber, room)
    const [actual, setActual] = useState(room.answerScript?.actual || room.seatsArr[0]);
    const [remark, setRemark] = useState(room.answerScript.remark);



    
    const handleChange = (e) => {
        room.answerScript.expected = room.seatsArr[0];
        const {name, value} = e.target;
        if(name === 'actual') {
            room.answerScript.actual = Number(value);
            setActual(value);
        }
        else {
            room.answerScript.remark = value;
            setRemark(value);
        }

        // console.log("in ascr change", floorNumber, room)
        handleChangeExam(indexFloor, floorNumber, room);
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
                        room.answerScript.expected !== actual &&
                        <>
                        <label htmlFor="remarks"></label>
                    <input type="text" name='remark' id='remark' value={remark} onChange={handleChange} className='px-4 py-1 border rounded-md text-center' />
                        </>
                    }
                </li>
                <li className='py-2 w-[16.66%]  text-center flex justify-center items-center'>
                    <button onClick={handleSaveExam} className='bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium px-4 py-2'>Save</button>
                </li>
            </ul>
        </div>
    )
}

export default AnswerScriptCountingRow