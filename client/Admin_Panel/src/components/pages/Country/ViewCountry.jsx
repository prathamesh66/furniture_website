import { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { CiSearch } from "react-icons/ci";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router';


const ViewCountry = () => {
  // let pageTitle= "user / view"

  let [showdiv, setShowDiv] = useState(false);

  let [showCountryData, setShowCountryData] = useState([])

    let [selectedRecord, setSelectedRecord] = useState([]);


    let apiBaseUrl = import.meta.env.VITE_APIBASEURL;



  let viewCountry = () => {
    axios.get(`${apiBaseUrl}country/view`)
    .then((res)=>res.data)
    .then((finalRes)=> {
      setShowCountryData(finalRes.countryData);
    })
  }

  useEffect(()=> {
    viewCountry()
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


    let deleteRecords = () => {
      axios
        .post(`${apiBaseUrl}country/multiDelete`, { ids: selectedRecord })
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);
            setSelectedRecord([]);
            viewCountry();
          }
        });
    }

    
    let changeStatus = () => {

      axios.post(`${apiBaseUrl}country/changeStatus`, {ids: selectedRecord})
      .then((res)=>res.data)
      .then((finalRes)=> {
        if (finalRes._status) {
          toast.success(finalRes._message);
          setSelectedRecord([]);
          viewCountry();
        } 
        else {
          toast.error("Country Status Not Changed");
        }
      })
    }



  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb path="Country" link="/country/view" path2="View" />
        </div>

        <div className="m-5">
          <div className={`${showdiv ? "block" : "hidden"}`}>
            <div className="w-full border-1 border-[#ccc] p-3 rounded-lg">
              <div className="m-3 flex gap-2 items-center">
                <div className="">
                  <input
                    type="text"
                    placeholder="Search Name"
                    className=" border-1 w-[300px] bg-[#374151] text-white border-[#ccc] p-2 rounded-lg"
                  />
                </div>

                <div className="p-2 border-1 border-[#ccc] rounded-lg bg-[#1D4ED8] text-white">
                  <button className="" type="submit">
                    <CiSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[30px] border-1 overflow-hidden rounded-lg ">
            <div className="flex justify-between p-3 ">
              <div className="text-[25px] font-semibold">View Country</div>

              <div className="flex items-center gap-3">
                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#2563EB]">
                  <button
                    className="p-3 cursor-pointer"
                    onClick={() => setShowDiv(!showdiv)}
                  >
                    {showdiv ? <BiHide /> : <BiShow />}
                  </button>
                </div>

                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#15803D]">
                  <button onClick={changeStatus} className="p-2 cursor-pointer">
                    Change Status
                  </button>
                </div>

                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#B91C1C]">
                  <button
                    onClick={deleteRecords}
                    className="p-2 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-1 text-[#ccc]" />

            <div className="mt-3 border-0 border-[#ccc] rounded-lg overflow-hidden">
              {showCountryData === 0 ? (
                "No Data Found..."
              ) : (
                <table className="w-full">
                  <thead className="w-full bg-gray-600 ">
                    <tr className="w-full text-[#cccccc7d]">
                      <th className=" p-3 text-center">
                        <input type="checkbox" />
                      </th>

                      <th className="p-3 text-left">COUNTRY NAME</th>

                      <th className="p-3 text-center">ORDER</th>

                      <th className="p-3 text-center cursor-pointer">STATUS</th>

                      <th className="p-3 text-center cursor-pointer">ACTION</th>
                    </tr>
                  </thead>

                  <tbody className="bg-gray-700 text-white ">
                    {showCountryData.map((value, index) => {
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

                          <td className="p-3 py-8">{value.countryName} </td>

                          <td className="p-3 py-8 text-center">
                            {value.countryOrder}
                          </td>

                          {value.countryStatus ? (
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
                            <Link to={`/country/add/${value._id}`}>
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

export default ViewCountry;



