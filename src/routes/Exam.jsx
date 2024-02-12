import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Exam = () => {

    const navigate = useNavigate();

    const floorNumber = (useSelector((state) => state.floorNumber)).floorNumber;
    const roomNumber = (useSelector((state) => state.roomNumber)).roomNumber;
    const exam = (useSelector((state) => state.exam)).examSelected;
    // console.log(exam)

    useEffect(() => { 
        // document.getElementById('bread-crumb').classList.add('invisible');
        // dispatch(toogleSidebar());
     }, [])

     const floorNav = () => {
        document.getElementById('bread-crumb').classList.toggle('invisible');
        navigate(`/dashboard/${exam._id}`, {replace: true});
     }

     const roomNav = () => {
        document.getElementById('roomNav').classList.toggle('hidden');
        navigate(`/dashboard/${exam._id}/floor-${roomNumber}`, {replace: true});
     }

    return (
        <div className='p-2 border h-full'>
            {/* EXAM DETAILS */}
            <div className='text-base h-40'>
                <h3 className='text-xl font-semibold my-6 uppercase'>Exam Details</h3>
                <table className='w-full text-center border my-9'>
                    <thead className='text-center'>
                        <tr>

                            <th className='border w-1/3'>Name</th>
                            <th className='border w-1/3'>Date</th>
                            <th className='border w-1/3'>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border w-1/3'>{exam.examName}</td>
                            <td className='border w-1/3'>{exam.examDate}</td>
                            <td className='border w-1/3'>{exam.examTime}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* BREAD-CRUMB */}


            <div id='bread-crumb' className='invisible flex rounded-md my-1'>
                <ul className={`${ location.pathname.includes(`/dashboard/${exam._id}/floor-${floorNumber}`) ?  'bg-slate-200' : ''} text-slate-500 text-[14px] p-1 flex gap-2`}>
                    {location.pathname.includes(`/dashboard/${exam._id}/floor-${floorNumber}`) ?
                        <>
                            <li id='floorNav'>
                                <p className='cursor-pointer' onClick={floorNav} to={`/dashboard/${exam._id}`} >Floors</p>
                            </li>
                            <li><span>/</span></li>


                        </>
                         : ''} 
                    {
                        location.pathname.endsWith(`/dashboard/${exam._id}/floor-${floorNumber}/room-${roomNumber}`) ?
                            <>
                                <li id='roomNav'>
                                    <p className='cursor-pointer' onClick={roomNav} to={`/dashboard/${exam._id}/floor-${floorNumber}`} >Rooms</p>
                                </li>
                            </> : ""
                    }
                </ul>
            </div>

            {/* EXAM LOCATIONS */}
            <div className="exam-locations-container border h-[50vh] overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Exam