import { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddSubSubCategory = () => {


   let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

   const BACKENDURL = import.meta.env.VITE_APIBASEURL.replace("/admin/", "");

   let navigate = useNavigate();

   let [category, setCategory] = useState([]);

   let [subCategory, setSubCategory] = useState([]);

   let [parentCategory, setParentCategory] = useState("");

   let [subCategoryData, setSubCategoryData] = useState("")
   

   let { id } = useParams();

   let [editData, setEditData] = useState(null);



  
  // Add mode
  useEffect(() => {
    if (!id) {
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
    if (!editData?.subSubCategoryImage) return;

    let imageUrl = `${BACKENDURL}/uploads/subSubCategory/${editData.subSubCategoryImage}`;

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

 

  let getParentCategory = () => {
    axios
      .get(`${apiBaseUrl}subSubCategory/parent`)
      .then((res) => res.data)
      .then((finalRes) => {
        setCategory(finalRes.data);
      });
  };

  useEffect(() => {
    getParentCategory();
  }, []);

  let getSubCategory = (id) => {
    axios
      .get(`${apiBaseUrl}subSubCategory/subCategory/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setSubCategory(finalRes.data);
      });
  };

  useEffect(() => {
    if (parentCategory) {
      getSubCategory(parentCategory);
    }
  }, [parentCategory]);




  let saveSubSubCategory = (e) => {


    e.preventDefault();

    let formValue = new FormData(e.target);


     if (id) {
       axios
         .put(`${apiBaseUrl}subSubCategory/update/${id}`, formValue)
         .then((res) => res.data)
         .then((finalRes) => {
           if (finalRes._status) {
             // alert(finalRes._message);
             toast.success(finalRes._message);

             // e.target.reset();

             setTimeout(() => {
               navigate("/sub-Sub-category/view");
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
        .post(`${apiBaseUrl}subSubCategory/create`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);

            setTimeout(() => {
              navigate("/sub-Sub-category/view");
            }, 3000);
          }
        });
    }
  };


  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}subSubCategory/getDetails/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          console.log(finalRes);
          setEditData(finalRes.details);
          setParentCategory(finalRes.details.parentCategory);
          setSubCategoryData(finalRes.details.subCategory);
        });
    } 
    else {
      setEditData(null);
      setParentCategory("");
      setSubCategoryData("");
    }
  }, [id]);
      
  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb
            path="Sub Sub Category"
            link="/sub-Sub-category/add"
            path2="Add"
          />
        </div>

        <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
          <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
            Add Sub Sub Category
          </div>

          <hr className="border-1 text-[#ccc]" />

          <div className="p-3">
            <form
              onSubmit={saveSubSubCategory}
              action=""
              className=" w-full "
            >
              <div className="flex gap-[3%]">
                <div className="basis-[35%]">
                  <div>
                    <label className="w-full mt-[10px]">
                      Add Sub Sub Category Image
                    </label>
                    <input
                      type="file"
                      name="subSubCategoryImage"
                      accept="image/*"
                      className="dropify"
                      data-height="236"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col">
                    <label htmlFor="">Parent Category Name</label>
                    <select
                      name="parentCategory"
                      value={parentCategory}
                      onChange={(e) => {
                        setParentCategory(e.target.value); // for the edit
                        getSubCategory(e.target.value); // for the add
                      }}
                      id=""
                      className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                    >
                      <option value="">Select Parent Category</option>

                      {category.map((value, index) => {
                        return (
                          <option value={value._id} key={index}>
                            {value.categoryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="flex flex-col mt-3">
                    <label htmlFor="">Sub Category Name</label>
                    <select
                      name="subCategory"
                      value={subCategoryData}
                      onChange={(e) => {
                        setSubCategoryData(e.target.value);
                      }}
                      id=""
                      className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                    >
                      <option value="">Select Sub Category</option>
                      {subCategory.map((value, index) => {
                        return (
                          <option value={value._id} key={index}>
                            {value.subCategoryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="flex flex-col mt-3">
                    <label htmlFor="">Sub Sub Category Name</label>
                    <input
                      placeholder="Category Name"
                      name="subSubCategoryName"
                      defaultValue={editData?.subSubCategoryName}
                      type="text"
                      className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                    />
                  </div>

                  <div className="flex flex-col mt-3">
                    <label htmlFor="">Order</label>
                    <input
                      placeholder="Order"
                      name="subSubCategoryOrder"
                      defaultValue={editData?.subSubCategoryOrder}
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
                  {id ? "Update Sub Sub Category" : "Add Sub Sub Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};;

export default AddSubSubCategory;
