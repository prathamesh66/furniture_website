// import { useState } from 'react'
import axios from 'axios';
import Breadcrumb from '../../common/Breadcrumb'
// import { CiSearch } from "react-icons/ci";
// import { BiShow } from "react-icons/bi";
// import { BiHide } from "react-icons/bi";
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';


const ViewFaq = () => {
  // let pageTitle= "user / view"

  // let [showdiv, setShowDiv] = useState(false);

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let [showFaqData, setShowFaqData] = useState([])

    let [selectedRecord, setSelectedRecord] = useState([]);



  let viewFaq = () => {
    axios.get(`${apiBaseUrl}faq/view`)
    .then((res)=>res.data)
    .then((finalRes)=> {
      setShowFaqData(finalRes.faqData)
    })
  }

  useEffect(()=> {
    viewFaq()
  },[])


  let getCheckedValue = (e) => {
    let checkedBoxValue = e.target.value;

    if (e.target.checked) {
      setSelectedRecord([...selectedRecord, checkedBoxValue]);
    } else {
      setSelectedRecord(
        selectedRecord.filter((value) => value != checkedBoxValue),
      );
    }
  };


  let multiDeleteFaq = () => {
    axios.post(`${apiBaseUrl}faq/multiDelete`, {ids: selectedRecord})
    .then((res)=>res.data)
    .then((finalRes)=>{
      if(finalRes._status) {
        toast.success(finalRes._message)
        setSelectedRecord([])
        viewFaq()
      }
    })
  }

let changeStatus = () => {
  axios
    .post(`${apiBaseUrl}faq/changeStatus`, { ids: selectedRecord })
    .then((res) => res.data)
    .then((finalRes) => {
      if (finalRes._status) {
        toast.success(finalRes._message);
        setSelectedRecord([]);
        viewFaq();
      } else {
        toast.error("Faq Status Not Changed");
      }
    });
};

  return (
    <>
      <section className="w-full">
      <ToastContainer/>
        <div>
          <Breadcrumb path="Faq" link="/faq/view" path2="View" />
        </div>

        <div className="m-5">
          <div className="mt-[30px] border-1 overflow-hidden rounded-lg ">
            <div className="flex justify-between p-3 ">
              <div className="text-[25px] font-semibold">View Faq</div>

              <div className="flex items-center gap-3">
                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#15803D]">
                  <button
                    onClick={changeStatus}
                    className="p-2 cursor-pointer"
                  >
                    Change Status
                  </button>
                </div>

                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#B91C1C]">
                  <button
                    onClick={multiDeleteFaq}
                    className="p-2 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-1 text-[#ccc]" />

            <div className="mt-3 border-0 border-[#ccc] rounded-lg overflow-hidden">
              {showFaqData == 0 ? (
                "No Data Found..."
              ) : (
                <table className="w-full">
                  <thead className="w-full bg-gray-600 ">
                    <tr className="w-full text-[#cccccc7d]">
                      <th className=" p-3 text-center">
                        <input type="checkbox" />
                      </th>

                      <th className="p-3 text-left">QUESTION</th>

                      <th className="p-3 text-left">ANSWER</th>

                      <th className="p-3 text-center">ORDER</th>

                      <th className="p-3 text-center cursor-pointer">STATUS</th>

                      <th className="p-3 text-center cursor-pointer">ACTION</th>
                    </tr>
                  </thead>

                  <tbody className="bg-gray-700 text-white ">
                    {showFaqData.map((value, index) => {
                      return (
                        <tr className="" key={index}>
                          <td className="p-3  py-8  text-center">
                            <input
                              type="checkbox"
                              onChange={getCheckedValue}
                              value={value._id}
                              checked={selectedRecord.includes(value._id)}
                            />
                          </td>

                          <td className="p-3 py-8">{value.faqQuestion}</td>

                          <td className="p-3 py-8">{value.faqAnswer}</td>

                          <td className="p-3 py-8 text-center">
                            {value.faqOrder}
                          </td>

                          {value.faqStatus ? (
                            <td className="p-3 py-8  text-center">
                              <span className="p-2  bg-[#1DB655] rounded-lg cursor-pointer px-3">
                                Active
                              </span>
                            </td>
                          ) : (
                            <td className="p-3 py-8  text-center">
                              <span className="p-2  bg-[#DE2929] rounded-lg cursor-pointer px-3">
                                Deactive
                              </span>
                            </td>
                          )}

                          <td className="p-3 py-8 text-center">
                            <Link to={`/faq/add/${value._id}`}>
                              <span className="p-2 bg-[#1D4ED8] rounded-lg cursor-pointer px-3">
                                Edit
                              </span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewFaq;



