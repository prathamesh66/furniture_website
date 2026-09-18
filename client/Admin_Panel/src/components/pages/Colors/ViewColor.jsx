import { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { CiSearch } from "react-icons/ci";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router';
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";


const ViewColor = () => {

    // let pageTitle= "user / view"

    let limit = 5

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

    let [currentPage, setCurrentPage] = useState(1);

    let [totalPage, setTotalPages] = useState(0)

    let [showdiv, setShowDiv] = useState(false);

    let [showDataview, setShowDataView] = useState([])

    let [selectedRecord, setSelectedRecord] = useState([])

    let [colorName, setColorName] = useState("");


    let applyFilter = (e) => {

        e.preventDefault();

        viewColor();
    };


  let viewColor = () => {
    axios.post(`${apiBaseUrl}/color/view`, {
      colorName: colorName,
      page: currentPage
    })
    .then((res)=>res.data)
    .then((finalRes)=> {
      setShowDataView(finalRes.colorData);
      setTotalPages(finalRes.paginate.total_pages);
    })
  }

  useEffect(()=> {
    viewColor()
  },[colorName,currentPage])


  let getCheckedValue = (e) => {

    let checkedBoxValue = e.target.value

    if(e.target.checked) {
      setSelectedRecord([...selectedRecord, checkedBoxValue])
    }
    else {
      setSelectedRecord(
        selectedRecord.filter((value) => value != checkedBoxValue)
      );

    }
  }

  // console.log(selectedRecord)

  let deleteRecords = () => {
    // perform delete logic

    axios
      .post(`${apiBaseUrl}/color/multiDelete`, { ids:selectedRecord })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.deleteData);
        if(finalRes._status) {
          // alert(finalRes._message)
          toast.success(finalRes._message);
          setSelectedRecord([]);
          viewColor();

        }
      });
  }

  let changeStatus = ()=> {
        axios
          .post(`${apiBaseUrl}/color/changeStatus`, { ids: selectedRecord })
          .then((res) => res.data)
          .then((finalRes) => {
            // console.log(finalRes.deleteData);
            if (finalRes._status) {
              // alert(finalRes._message)
              toast.success(finalRes._message);
              setSelectedRecord([]);
              viewColor();
            }
            else {
              toast.error("Color Status Not Changed");
            }
          });
  }

  


  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb path="Color" link="/color/view" path2="View" />
        </div>

        <div className="m-5">
          <div className={`${showdiv ? "block" : "hidden"}`}>
            <div className="w-full border-1 border-[#ccc] p-3 rounded-lg">
              <form
                onSubmit={applyFilter}
                className="m-3 flex gap-2 items-center"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Search Name"
                    className="border-1 w-[300px] bg-[#374151] text-white border-[#ccc] p-2 rounded-lg"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                  />
                </div>

                <div className="p-2 border-1 border-[#ccc] rounded-lg bg-[#1D4ED8] text-white">
                  <button className="" type="submit">
                    <CiSearch />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-[30px] border-1 overflow-hidden rounded-lg ">
            <div className="flex justify-between p-3 ">
              <div className="text-[25px] font-semibold">View Color</div>

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
                  <button className="p-2 cursor-pointer" onClick={changeStatus}>
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
              <table className="w-full">
                <thead className="w-full bg-gray-600 ">
                  <tr className="w-full text-[#cccccc7d]">
                    <th className="p-3 text-center">SR.NO</th>

                    <th className=" p-3 text-center">
                      {/* <input type="checkbox" /> */}
                      SELECT
                    </th>

                    <th className="p-3 text-left">COLOR NAME</th>

                    <th className="p-3 text-left">CODE</th>

                    <th className="p-3 text-center">ORDER</th>

                    <th className="p-3 text-center cursor-pointer">STATUS</th>

                    <th className="p-3 text-center cursor-pointer">ACTION</th>
                  </tr>
                </thead>

                <tbody className="bg-gray-700 text-white ">
                  {showDataview.length >= 1 ? (
                    showDataview.map((value, index) => {
                      return (
                        <tr className="" key={index}>
                          <th className="p-3 text-center">
                            {(currentPage - 1) * limit + index + 1}
                          </th>

                          <td className="p-3  py-8  text-center">
                            <input
                              type="checkbox"
                              value={value._id}
                              onChange={getCheckedValue}
                              checked={selectedRecord.includes(value._id)} // cheked only this selectedRecord
                            />
                          </td>

                          <td className="p-3 py-8">{value.colorName} </td>

                          <td className="p-3 py-8">{value.colorCode}</td>

                          <td className="p-3 py-8 text-center">
                            {value.colorOrder}
                          </td>

                          {value.colorStatus ? (
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
                            <Link to={`/color/add/${value._id}`}>
                              <span className="p-2 bg-[#1D4ED8] rounded-lg cursor-pointer px-3">
                                Edit
                              </span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="">
                      <td className="p-3  py-8  text-center" colSpan={7}>
                        "No Data Will be Found"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className='mt-[50px]'>
            <ResponsivePagination
            
            current={currentPage}
            total={totalPage}
            onPageChange={setCurrentPage}
          />
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewColor;



