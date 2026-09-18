import { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import { CiSearch } from "react-icons/ci";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";

const ViewProduct = () => {
  // let pageTitle= "user / view"

  let [showdiv, setShowDiv] = useState(false);

   let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

   let [showProductData, setShowProductData] = useState([]);

   let [path, setPath] = useState('')

  let [selectedRecord, setSelectedRecord] = useState([]);



  let ViewProduct = () => {
    axios
      .get(`${apiBaseUrl}/product/view`)
      .then((res) => res.data)
      .then((finalRes) => {
        setShowProductData(finalRes.productData);
        setPath(finalRes.path);
      });
  };

  useEffect(() => {
    ViewProduct();
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
      .post(`${apiBaseUrl}/product/multiDelete`, { ids: selectedRecord })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.deleteData);
        if (finalRes._status) {
          // alert(finalRes._message)
          toast.success(finalRes._message);
          setSelectedRecord([]);
          ViewProduct();
        }
      });
  };

  let changeStatus = () => {
    axios
      .post(`${apiBaseUrl}/product/changeStatus`, { ids: selectedRecord })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.deleteData);
        if (finalRes._status) {
          // alert(finalRes._message)
          toast.success(finalRes._message);
          setSelectedRecord([]);
          ViewProduct();
        } else {
          toast.error("Product Status Not Changed");
        }
      });
  };


  return (
    <>
      <section className="w-full">
      <ToastContainer/>
        <div>
          <Breadcrumb path="Products" link="/products/view" path2="View" />
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
              <div className="text-[25px] font-semibold">Product Items</div>

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
                  <button
                    className="p-2 cursor-pointer"
                     onClick={changeStatus}
                  >
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

            <div className=" border-0 border-[#ccc] overflow-hidden">
              {showProductData == 0 ? (
                "No Data Found"
              ) : (
                <table className="w-full">
                  <thead className="w-full ">
                    <tr className="w-full bg-[#cccccc59] text-black text-[#cccccc7d]">
                      <th className=" p-3 text-center">
                        SELECT
                      </th>

                      <th className="p-3 text-center">S.NO</th>

                      <th className="p-3 text-center">PRODUCT NAME</th>

                      <th className="p-3 text-center">PRODUCT IMAGE</th>

                      <th className="p-3 text-center">PARENT CATEGORY</th>

                      <th className="p-3 text-center">SUB CATEGORY</th>

                      <th className="p-3 text-center">SUB SUB CATEGORY</th>

                      <th className="p-3 text-center">PRICE</th>

                      <th className="p-3 text-center">ACTUAL PRICE </th>

                      <th className="p-3 text-center cursor-pointer">ACTION</th>

                      <th className="p-3 text-center cursor-pointer">STATUS</th>
                    </tr>
                  </thead>

                  <tbody className="  ">
                    {showProductData.map((value, index) => {
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

                          <td className="p-3 py-8 text-center">{index + 1}</td>

                          <td className="p-3 py-8 text-center">
                            {value.productName}
                          </td>

                          <td className="p-3 py-8  text-center">
                            <img
                              src={path + value.productImage}
                              width={"50px"}
                              height={"50px"}
                              className="mx-auto"
                            />
                          </td>

                          <td className="p-3 py-8  text-center">
                            {value.parentCategory.categoryName}
                          </td>

                          <td className="p-3 py-8 text-center">
                            {value.subCategory.subCategoryName}
                          </td>

                          <td className="p-3 py-8 text-center">
                            {value.subSubCategory.subSubCategoryName}
                          </td>

                          <td className="p-3 py-8 text-center">
                            {value.productPrice}
                          </td>

                          <td className="p-3 py-8 text-center">
                            {value.productActualPrice}
                          </td>

                          <td className="p-3 py-8 text-center">
                            <span className="flex justify-center items-center">
                              <span className="mr-2 text-2xl cursor-pointer">
                                <RiDeleteBin6Line />
                              </span>{" "}
                              |
                              <span className="ml-2 text-2xl cursor-pointer">
                                <Link to={`/products/add/${value._id}`}>
                                  <TbEdit />
                                </Link>
                              </span>
                              {/* <Link to={`/products/add/${value._id}`}>
                                <span className="ml-2 text-2xl cursor-pointer">
                                  <TbEdit />
                                </span>
                              </Link> */}
                            </span>
                          </td>

                          {value.productStatus ? (
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

export default ViewProduct;




