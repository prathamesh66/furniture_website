import { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { CiSearch } from "react-icons/ci";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router';


const ViewMaterials = () => {

    // let pageTitle= "user / view"

    let [showdiv, setShowDiv] = useState(false);

    let [showMatarialData, setShowMaterialData] = useState([])

    let [selectedRecord, setSelectedRecord] = useState([]);


    let apiBaseUrl = import.meta.env.VITE_APIBASEURL;


    let viewMaterial = () => {
      axios.get(`${apiBaseUrl}material/view`)
      .then((res)=>res.data)
      .then((finalRes)=> {
       setShowMaterialData(finalRes.materialData);
      })

    }

    useEffect(()=> {
      viewMaterial()
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
        // perform delete logic

        axios
          .post(`${apiBaseUrl}material/multiDelete`, { ids: selectedRecord })
          .then((res) => res.data)
          .then((finalRes) => {
            // console.log(finalRes.multiDeleteData);
            if (finalRes._status) {
              // alert(finalRes._message)
              viewMaterial();
              toast.success(finalRes._message);
              setSelectedRecord([]);
              
            }
          });
      };


    let changeStatus = () => {
      axios
        .post(`${apiBaseUrl}material/changeStatus`, { ids: selectedRecord })
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes.deleteData);
          if (finalRes._status) {
            // alert(finalRes._message)
            toast.success(finalRes._message);
            setSelectedRecord([]);
            viewMaterial();
          } else {
            toast.error("Material Status Not Changed");
          }
        });
    };

    


  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb path="Material" link="/material/view" path2="View" />
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
              <div className="text-[25px] font-semibold">View Material</div>

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
              {showMatarialData == 0 ? (
                <div className="h-40 flex items-center justify-center bg-gray-700 text-gray-400 text-lg font-semibold">
                  No Data Found...
                </div>
              ) : (
                <table className="w-full">
                  <thead className="w-full bg-gray-600 ">
                    <tr className="w-full text-[#cccccc7d]">
                      <th className=" p-3 text-center">
                        <input type="checkbox" />
                      </th>

                      <th className="p-3 text-left">MATERIAL NAME</th>

                      <th className="p-3 text-center">ORDER</th>

                      <th className="p-3 text-center cursor-pointer">STATUS</th>

                      <th className="p-3 text-center cursor-pointer">ACTION</th>
                    </tr>
                  </thead>

                  <tbody className="bg-gray-700 text-white ">
                    {showMatarialData.map((value, index) => {
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

                          <td className="p-3 py-8">{value.materialName} </td>

                          <td className="p-3 py-8 text-center">
                            {value.materialOrder}
                          </td>

                          {value.materialStatus ? (
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
                            <Link to={`/material/add/${value._id}`}>
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
}

export default ViewMaterials;



