import { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import { CiSearch } from "react-icons/ci";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from "axios";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const ViewSubSubCategory = () => {
  // let pageTitle= "user / view"

  let [showdiv, setShowDiv] = useState(false);

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let [viewSubSubCategoryData, setViewSubSubCategoryData] = useState([]);

  let [path, setPath] = useState("");

  let [selectedRecord, setSelectedRecord] = useState([]);




  let getSubSubCategoryData = () => {
    axios
      .get(`${apiBaseUrl}subSubCategory/view`)
      .then((res) => res.data)
      .then((finalRes) => {
        setViewSubSubCategoryData(finalRes.subSubCategoryData);
        setPath(finalRes.path);
      });
  };

  useEffect(() => {
    getSubSubCategoryData();
  }, []);


  
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

  // console.log(selectedRecord)

  let deleteRecords = () => {
    // perform delete logic

    axios
      .post(`${apiBaseUrl}subSubCategory/multiDelete`, { ids: selectedRecord })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.deleteData);
        if (finalRes._status) {
          // alert(finalRes._message)
          toast.success(finalRes._message);
          setSelectedRecord([]);
          getSubSubCategoryData();
        }
      });
  };

  let changeStatus = () => {
    axios
      .post(`${apiBaseUrl}subSubCategory/changeStatus`, {
        ids: selectedRecord,
      })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.deleteData);
        if (finalRes._status) {
          // alert(finalRes._message)
          toast.success(finalRes._message);
          setSelectedRecord([]);
          getSubSubCategoryData();
        } else {
          toast.error("Sub Sub Category Status Not Changed");
        }
      });
  };

  return (
    <>
      <section className="w-full">
      <ToastContainer/>
        <div>
          <Breadcrumb
            path="Sub Sub Category"
            link="/sub-Sub-category/view"
            path2="View"
          />
        </div>

        <div className="m-5">
          <div className={`${showdiv ? "block" : "hidden"}`}>
            <div className="w-full border-1 border-[#ccc] p-3 rounded-lg flex">
              <div className="m-3 flex gap-2 items-center">
                <div className="">
                  <select
                    name=""
                    id=""
                    className="border-1 w-[200px] bg-white  border-[#ccc] p-2 rounded-lg"
                  >
                    <option value="">Select Parent Category</option>
                    <option value="">Men's</option>
                    <option value="">Women's</option>
                    <option value="">Sale</option>
                  </select>
                </div>
              </div>

              <div className="m-3 flex gap-2 items-center">
                <div className="">
                  <select
                    name=""
                    id=""
                    className="border-1 w-[200px] bg-white  border-[#ccc] p-2 rounded-lg"
                  >
                    <option value="">Select Sub Category</option>
                    <option value="">Men's</option>
                    <option value="">Women's</option>
                    <option value="">Sale</option>
                  </select>
                </div>
              </div>

              <div className="m-3 flex gap-2 items-center">
                <div className="">
                  <input
                    type="text"
                    placeholder="Search Name"
                    className=" border-1 w-[400px] bg-white border-[#ccc] p-2 rounded-lg"
                  />
                </div>

                <div className="p-2 px-3 border-1 border-[#ccc] rounded-lg bg-[#1D4ED8] text-white">
                  <button className="" type="submit">
                    <CiSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[30px] border-1 overflow-hidden rounded-lg ">
            <div className="flex justify-between p-3 ">
              <div className="text-[25px] font-semibold">
                View Sub Sub Category
              </div>

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
                    className="p-2 cursor-pointer"
                    onClick={deleteRecords}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-1 text-[#ccc]" />

            <div className="mt-3 border-0 border-[#ccc] rounded-lg overflow-hidden">
              {viewSubSubCategoryData === 0 ? (
                "No Data Found"
              ) : (
                <table className="w-full">
                  <thead className="w-full bg-gray-600 ">
                    <tr className="w-full text-[#cccccc7d]">
                      <th className=" p-3 text-center">
                        <input type="checkbox" />
                      </th>

                      <th className="p-3 text-left">PARENT CATEGORY NAME</th>

                      <th className="p-3 text-left">SUB CATEGORY NAME</th>

                      <th className="p-3 text-left">SUB SUB CATEGORY NAME</th>

                      <th className="p-3 text-left">IMAGE</th>

                      <th className="p-3 text-center">ORDER</th>

                      <th className="p-3 text-center cursor-pointer">STATUS</th>

                      <th className="p-3 text-center cursor-pointer">ACTION</th>
                    </tr>
                  </thead>

                  <tbody className="bg-gray-700 text-white ">
                    {viewSubSubCategoryData.map((value, index) => {
                      return (
                        <tr className="" key={index}>
                          <td className="p-3  py-8  text-center">
                            <input
                              type="checkbox"
                              value={value._id}
                              onChange={getCheckedValue}
                              checked={selectedRecord.includes(value._id)} // cheked only this selectedRecord
                            />
                          </td>

                          <td className="p-3 py-8">
                            {value.parentCategory.categoryName}
                          </td>

                          <td className="p-3 py-8">
                            {value.subCategory.subCategoryName}
                          </td>

                          <td className="p-3 py-8">
                            {value.subSubCategoryName}{" "}
                          </td>

                          <td className="p-3 py-8">
                            <img
                              src={path + value.subSubCategoryImage}
                              width={"50px"}
                              height={"50px"}
                            />
                          </td>

                          <td className="p-3 py-8 text-center">
                            {value.subSubCategoryOrder}
                          </td>

                          {value.subSubCategoryStatus ? (
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
                            <Link to={`/sub-Sub-category/add/${value._id}`}>
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

export default ViewSubSubCategory;
