import { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb';
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const AddCategory = () => {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let navigate = useNavigate();

  let { id } = useParams();

  let [editData, setEditData] = useState(null);


  // Add mode
 useEffect(() => {
   if (!id) {
     let dropify = $(".dropify").data("dropify");

     if (dropify) {
       dropify.resetPreview();
       dropify.clearElement();
     }

     $(".dropify").dropify({
       messages: {
         default: "Drag and drop",
         replace: "Drag and drop",
         remove: "Remove",
         error: "Oops, something went wrong",
       },
     });
   }
 }, [id]);

  // Edit mode
  useEffect(() => {
    if (!editData?.categoryImage) return;

    let imageUrl = `http://localhost:8000/uploads/category/${editData.categoryImage}`;

    console.log("IMAGE URL:", imageUrl);

    $(".dropify").dropify({
      defaultFile: imageUrl,
      messages: {
        default: "Drag and drop",
        replace: "Drag and drop",
        remove: "Remove",
        error: "Oops, something went wrong",
      },
    });
  }, [editData]);




  let addCategory = (e) => {

    e.preventDefault();

    let formDataObj = new FormData(e.target);

    //  console.log(formDataObj)

    if (id) {
      axios
        .put(`${apiBaseUrl}/category/update/${id}`, formDataObj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            // alert(finalRes._message);
            toast.success(finalRes._message);

            // e.target.reset();

            setTimeout(() => {
              navigate("/category/view");
            }, 6000);

            // navigate("/category/view");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    
    else {
      axios
        .post(`${apiBaseUrl}/category/create`, formDataObj)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);

            setTimeout(() => {
              navigate("/category/view");
            }, 6000);
          } else {
            toast.error(finalRes._message);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}/category/getDetails/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setEditData(finalRes.details);
        });
    } else {
      setEditData(null);
    }
  }, [id]);

  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb path="Category" link="/category/add" path2="Add" />
        </div>

        <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
          <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
            Add Parent Category
          </div>

          <hr className="border-1 text-[#ccc]" />

          <div className="p-3">
            <form action="" className=" w-full" onSubmit={addCategory}>
              <div className="flex gap-[3%]">
                <div className="basis-[35%]">
                  <div>
                    <label className="w-full mt-[10px]">
                      Parent Category Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="categoryImage"
                      className="dropify"
                      data-height="236"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col ">
                    <label htmlFor="">Parent Category Name</label>
                    <input
                      placeholder="Category Name"
                      type="text"
                      name="categoryName"
                      defaultValue={editData?.categoryName}
                      className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <label htmlFor="">Order</label>
                    <input
                      placeholder="Order"
                      name="categoryOrder"
                      defaultValue={editData?.categoryOrder}
                      type="number"
                      className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="border-1 border-[#ccc] p-3 rounded-lg bg-[#6B21A8] text-white text-[16px] cursor-pointer"
                >
                  {id ? " Update Parent Category" : " Add Parent Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCategory



