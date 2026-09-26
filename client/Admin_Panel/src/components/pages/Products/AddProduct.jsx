// import { useEffect, useState } from "react";
// import Breadcrumb from "../../common/Breadcrumb";
// import $ from "jquery";
// import "dropify/dist/css/dropify.min.css";
// import "dropify/dist/js/dropify.min.js";

// // import { CKEditor } from "@ckeditor/ckeditor5-react";

// // import {
// //   ClassicEditor,
// //   Essentials,
// //   Paragraph,
// //   Heading,
// //   Bold,
// //   Italic,
// //   Underline,
// //   Link,
// //   List,
// //   RemoveFormat,
// // } from "ckeditor5";

// // import "ckeditor5/ckeditor5.css";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate, useParams } from "react-router";


// const AddProduct = () => {
//   // const [description, setDescription] = useState("");

//   let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

//   let navigate = useNavigate();

//   let { id } = useParams();

//   let [colors, setColors] = useState([]);
//   let [materials, setMaterials] = useState([]);
//   let [categorys, setCategorys] = useState([]);
//   let [subCategorys, setSubCategorys] = useState([]);
//   let [subSubCategorys, setSubSubCategorys] = useState([]);

//   let [parentCategory, setParentCategory] = useState("");
//   let [subCategory, setSubCategory] = useState("");
//   let [subSubCategory, setSubSubCategory] = useState("");

//   let [material, setMaterial] = useState("");
//   let [color, setColor] = useState("");

//   let [productType, setProductType] = useState("");
//   let [isBestSelling, setIsBestSelling] = useState("");
//   let [isTopRated, setIsTopRated] = useState("");
//   let [isUpSell, setIsUpSell] = useState("");

//   let [editData, setEditData] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${apiBaseUrl}/product/material`)
//       .then((res) => res.data)
//       .then((finalRes) => {
//         setMaterials(finalRes.data);
//       });

//     // axios
//     //   .get(`${apiBaseUrl}/product/color`)
//     //   .then((res) => res.data)
//     //   .then((finalRes) => {
//     //     setColors(finalRes.data);
//     //   })
//     //   .catch((error)=> {
//     //     toast.error("The Product Color Error is",error.message)
//     //   })

//     axios
//       .get(`${apiBaseUrl}/product/color`)
//       .then((res) => {
//         // console.log("API Response:", res.data);
//         setColors(res.data.data);
//       })
//       .catch((error) => {
//         console.log("FULL ERROR:", error);

//         toast.error(
//           error.response?.data?.message ||
//             error.message ||
//             "Something went wrong while fetching colors",
//         );
//       });

//     axios
//       .get(`${apiBaseUrl}/product/parent`)
//       .then((res) => res.data)
//       .then((finalRes) => {
//         setCategorys(finalRes.data);
//       });
//   }, []);

//   let getSubCategory = (id) => {
//     if (id) {
//       axios
//         .get(`${apiBaseUrl}/product/subCategory/${id}`)
//         .then((res) => res.data)
//         .then((finalRes) => {
//           setSubCategorys(finalRes.data);
//         });
//     } else {
//       setSubCategorys([]);
//     }
//   };

//   // useEffect(() => {
//   //   if (parentCategory) {
//   //     getSubCategory(parentCategory);
//   //   }
//   // }, [parentCategory]);

//   // useEffect(() => {
//   //   getSubCategory();
//   // }, [categorys]);

//   let getSubSubCategory = (id) => {
//     if (id) {
//       axios
//         .get(`${apiBaseUrl}/product/subSubCategory/${id}`)
//         .then((res) => res.data)
//         .then((finalRes) => {
//           setSubSubCategorys(finalRes.data);
//         });
//     } else {
//       setSubSubCategorys([]);
//     }
//   };

//   // useEffect(() => {
//   //   getSubSubCategory();
//   // }, [subCategorys]);

//   // Add mode
//   useEffect(() => {
//     if (!id) {
//       $(".dropify").dropify({
//         messages: {
//           default: "Drag and drop",
//           replace: "Drag and drop",
//           remove: "Remove",
//           error: "Oops, something went wrong",
//         },
//       });
//     }
//   }, [id]);

//   // Edit mode
//   useEffect(() => {
//     if (!editData?.productImage) return;

//     let imageUrl = `http://localhost:8000/uploads/product/${editData.productImage}`;

//     console.log("IMAGE URL:", imageUrl);

//     $(".dropify").dropify({
//       defaultFile: imageUrl,
//       messages: {
//         default: "Drag and drop",
//         replace: "Drag and drop",
//         remove: "Remove",
//         error: "Oops, something went wrong",
//       },
//     });
//   }, [editData]);

//   let productSave = (e) => {
//     e.preventDefault();

//     let formValue = new FormData(e.target);

//     //  formValue.append("productType", productType);

//     if (id) {
//       axios
//         .put(`${apiBaseUrl}/product/update/${id}`, formValue)
//         .then((res) => res.data)
//         .then((finalRes) => {
//           if (finalRes._status) {
//             toast.success(finalRes._message);

//             setTimeout(() => {
//               navigate("/products/view");
//             }, 2000);
//           }
//         });
//     } else {
//       axios
//         .post(`${apiBaseUrl}/product/create`, formValue)
//         .then((res) => res.data)
//         .then((finalRes) => {
//           if (finalRes._status) {
//             toast.success(finalRes._message);

//             setTimeout(() => {
//               navigate("/products/view");
//             }, 2000);
//           }
//         });
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`${apiBaseUrl}/product/getDetails/${id}`)
//         .then((res) => res.data)
//         .then((finalRes) => {
//           let data = finalRes.details;

//           console.log("Product Type:", data.productType);

//           setEditData(data);

//           setParentCategory(data.parentCategory);
//           setSubCategory(data.subCategory);
//           setSubSubCategory(data.subSubCategory);

//           setMaterial(data.material);
//           setColor(data.color);

//           setProductType(data.productType);
//           setIsBestSelling(data.isBestSelling ? "true" : "false");
//           setIsTopRated(data.isTopRated ? "true" : "false");
//           setIsUpSell(data.isUpSell ? "true" : "false");

//           getSubCategory(data.parentCategory);
//           getSubSubCategory(data.subCategory);
//         });
//     }
//   }, [id]);

//   return (
//     <>
//       <section className="w-full">
//         <ToastContainer />
//         <div>
//           <Breadcrumb path="Products" link="/products/add" path2="Add" />
//         </div>

//         <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
//           <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
//             Add Products
//           </div>

//           <hr className="border-1 text-[#ccc]" />

//           <div className="p-3">
//             <form onSubmit={productSave} action="" className=" w-full ">
//               <div className="flex gap-[3%]">
//                 <div className="basis-[35%]">
//                   <div>
//                     <label className="w-full mt-[10px] font-semibold">
//                       Product Image
//                     </label>
//                     <input
//                       type="file"
//                       name="productImage"
//                       accept="image/*"
//                       className="dropify"
//                       data-height="180"
//                     />
//                   </div>

//                   {/* <div>
//                     <label className="w-full mt-[10px] font-semibold">
//                       Back Image
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="dropify"
//                       data-height="180"
//                     />
//                   </div> */}

//                   <div>
//                     <label className="w-full mt-[10px] font-semibold">
//                       Gallery Image
//                     </label>
//                     <input
//                       type="file"
//                       name="productGallery"
//                       accept="image/*"
//                       className="dropify"
//                       data-height="180"
//                       multiple
//                     />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex gap-[3%] mt-3">
//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Product Name
//                       </label>
//                       <input
//                         name="productName"
//                         type="text"
//                         placeholder="Product Name"
//                         defaultValue={editData?.productName}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       />
//                     </div>

//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Select Parent Category
//                       </label>
//                       <select
//                         name="parentCategory"
//                         value={parentCategory}
//                         onChange={(e) => {
//                           setParentCategory(e.target.value);
//                           setSubCategory("");
//                           setSubSubCategory("");
//                           getSubCategory(e.target.value);
//                         }}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>

//                         {categorys.map((value) => {
//                           return (
//                             <option key={value._id} value={value._id}>
//                               {value.categoryName}
//                             </option>
//                           );
//                         })}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex gap-[3%] mt-5">
//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Select Sub Category
//                       </label>
//                       <select
//                         name="subCategory"
//                         value={subCategory}
//                         onChange={(e) => {
//                           setSubCategory(e.target.value);
//                           setSubSubCategory("");
//                           getSubSubCategory(e.target.value);
//                         }}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>

//                         {subCategorys.map((value) => {
//                           return (
//                             <option key={value._id} value={value._id}>
//                               {value.subCategoryName}
//                             </option>
//                           );
//                         })}
//                       </select>
//                     </div>

//                     <div className="flex flex-col basis-[48%]">
//                       <label htmlFor="" className="font-semibold">
//                         Select Sub Sub Category
//                       </label>
//                       <select
//                         name="subSubCategory"
//                         value={subSubCategory}
//                         onChange={(e) => setSubSubCategory(e.target.value)}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>

//                         {subSubCategorys.map((value) => {
//                           return (
//                             <option key={value._id} value={value._id}>
//                               {value.subSubCategoryName}
//                             </option>
//                           );
//                         })}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex gap-[3%] mt-5">
//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Select Material
//                       </label>
//                       <select
//                         name="material"
//                         // multiple
//                         value={material}
//                         onChange={(e) => setMaterial(e.target.value)}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>

//                         {materials.map((value) => {
//                           return (
//                             <option key={value._id} value={value._id}>
//                               {value.materialName}
//                             </option>
//                           );
//                         })}
//                       </select>
//                     </div>

//                     <div className="flex flex-col basis-[48%]">
//                       <label htmlFor="" className="font-semibold">
//                         Select Color
//                       </label>
//                       <select
//                         name="color"
//                         // multiple
//                         value={color}
//                         onChange={(e) => setColor(e.target.value)}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>

//                         {colors.map((value) => {
//                           return (
//                             <option key={value._id} value={value._id}>
//                               {value.colorName}
//                             </option>
//                           );
//                         })}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex gap-[3%] mt-5">
//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Select Product Type
//                       </label>
//                       <select
//                         name="productType"
//                         value={productType}
//                         onChange={(e) => setProductType(e.target.value)}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>
//                         <option value="featured">Featured</option>
//                         <option value="newArrivals">New Arrivals</option>
//                         <option value="onSale">On Sale</option>
//                       </select>
//                     </div>

//                     <div className="flex flex-col basis-[48%]">
//                       <label htmlFor="" className="font-semibold">
//                         Is Best Selling
//                       </label>
//                       <select
//                         name="isBestSelling"
//                         value={isBestSelling}
//                         onChange={(e) => setIsBestSelling(e.target.value)}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>

//                         <option value="true">Yes</option>
//                         <option value="false">No</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex gap-[3%] mt-5">
//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Is Top Rated
//                       </label>
//                       <select
//                         name="isTopRated"
//                         value={isTopRated}
//                         onChange={(e) => setIsTopRated(e.target.value)}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>

//                         <option value="true">Yes</option>
//                         <option value="false">No</option>
//                       </select>
//                     </div>

//                     <div className="flex flex-col basis-[48%]">
//                       <label htmlFor="" className="font-semibold">
//                         Is Up Sell
//                       </label>
//                       <select
//                         name="isUpSell"
//                         value={isUpSell}
//                         onChange={(e) => setIsUpSell(e.target.value)}
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       >
//                         <option value="">Nothing Selected</option>

//                         <option value="true">Yes</option>
//                         <option value="false">No</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="flex gap-[3%] mt-5">
//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Actual Price
//                       </label>
//                       <input
//                         name="productActualPrice"
//                         type="text"
//                         defaultValue={editData?.productActualPrice}
//                         placeholder="Actual Price"
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       />
//                     </div>

//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Sale Price
//                       </label>
//                       <input
//                         name="productPrice"
//                         type="text"
//                         defaultValue={editData?.productPrice}
//                         placeholder="Sale Price"
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-[3%] mt-5">
//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Total In Stocks
//                       </label>
//                       <input
//                         name="totalStock"
//                         type="text"
//                         defaultValue={editData?.totalStock}
//                         placeholder="Total In Stocks"
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       />
//                     </div>

//                     <div className="flex flex-col basis-[48%] ">
//                       <label htmlFor="" className="font-semibold">
//                         Order
//                       </label>
//                       <input
//                         name="productOrder"
//                         type="text"
//                         defaultValue={editData?.productOrder}
//                         placeholder="Order"
//                         className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-10">
//                 <label htmlFor="shortDescription" className="font-semibold">
//                   Short Description
//                 </label>

//                 <textarea
//                   name="productShortDescription"
//                   defaultValue={editData?.productShortDescription}
//                   rows={5}
//                   className="w-full border p-2 mt-2 rounded-lg"
//                 />
//               </div>

//               {/* <div className="mt-10">
//                 <label className="font-semibold">Description</label>

//                 <div className="mt-2">
//                   <CKEditor
//                     name="productDescription"
//                     editor={ClassicEditor}
//                     data={description}
//                     config={{
//                       licenseKey: "GPL",
//                       plugins: [
//                         Essentials,
//                         Paragraph,
//                         Heading,
//                         Bold,
//                         Italic,
//                         Underline,
//                         Link,
//                         List,
//                         RemoveFormat,
//                       ],
//                       toolbar: [
//                         "heading",
//                         "|",
//                         "bold",
//                         "italic",
//                         "underline",
//                         "link",
//                         "|",
//                         "numberedList",
//                         "bulletedList",
//                         "|",
//                         "removeFormat",
//                       ],
//                     }}
//                     onChange={(event, editor) => {
//                       setDescription(editor.getData());
//                     }}
//                   />
//                 </div>
//               </div> */}

//               <div className="mt-10">
//                 <label htmlFor="shortDescription" className="font-semibold">
//                   Description
//                 </label>

//                 <textarea
//                   name="productDescription"
//                   defaultValue={editData?.productDescription}
//                   rows={5}
//                   className="w-full border p-2 mt-2 rounded-lg"
//                 />
//               </div>

//               <div className="mt-5">
//                 <button
//                   type="submit"
//                   className="border-1 border-[#ccc] p-3 rounded-lg bg-[#6B21A8] text-white text-[16px] cursor-pointer"
//                 >
//                   {id ? "Update Product" : "Add Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };;

// export default AddProduct;







import { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";

// import { CKEditor } from "@ckeditor/ckeditor5-react";

// import {
//   ClassicEditor,
//   Essentials,
//   Paragraph,
//   Heading,
//   Bold,
//   Italic,
//   Underline,
//   Link,
//   List,
//   RemoveFormat,
// } from "ckeditor5";

// import "ckeditor5/ckeditor5.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const AddProduct = () => {
  // const [description, setDescription] = useState("");

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  const BACKENDURL = import.meta.env.VITE_APIBASEURL.replace("/admin/", "");


  let navigate = useNavigate();

  let { id } = useParams();

  let [colors, setColors] = useState([]);
  let [materials, setMaterials] = useState([]);
  let [categorys, setCategorys] = useState([]);
  let [subCategorys, setSubCategorys] = useState([]);
  let [subSubCategorys, setSubSubCategorys] = useState([]);

  let [parentCategory, setParentCategory] = useState("");
  let [subCategory, setSubCategory] = useState("");
  let [subSubCategory, setSubSubCategory] = useState("");

  let [material, setMaterial] = useState("");
  let [color, setColor] = useState("");

  let [productType, setProductType] = useState("");
  let [isBestSelling, setIsBestSelling] = useState("");
  let [isTopRated, setIsTopRated] = useState("");
  let [isUpSell, setIsUpSell] = useState("");

  let [products, setProducts] = useState([]);
  let [upSellProducts, setUpSellProducts] = useState([]);

  let [editData, setEditData] = useState(null);

  let [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}product/material`)
      .then((res) => res.data)
      .then((finalRes) => {
        setMaterials(finalRes.data);
      });



      axios
        .get(`${apiBaseUrl}product/view`)
        .then((res) => res.data)
        .then((finalRes) => {
          setProducts(finalRes.productData);
        });

    // axios
    //   .get(`${apiBaseUrl}/product/color`)
    //   .then((res) => res.data)
    //   .then((finalRes) => {
    //     setColors(finalRes.data);
    //   })
    //   .catch((error)=> {
    //     toast.error("The Product Color Error is",error.message)
    //   })

    axios
      .get(`${apiBaseUrl}product/color`)
      .then((res) => {
        // console.log("API Response:", res.data);
        setColors(res.data.data);
      })
      .catch((error) => {
        console.log("FULL ERROR:", error);

        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Something went wrong while fetching colors",
        );
      });

    axios
      .get(`${apiBaseUrl}product/parent`)
      .then((res) => res.data)
      .then((finalRes) => {
        setCategorys(finalRes.data);
      });
  }, []);

  let getSubCategory = (id) => {
    if (id) {
      axios
        .get(`${apiBaseUrl}product/subCategory/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setSubCategorys(finalRes.data);
        });
    } else {
      setSubCategorys([]);
    }
  };

  // useEffect(() => {
  //   if (parentCategory) {
  //     getSubCategory(parentCategory);
  //   }
  // }, [parentCategory]);

  // useEffect(() => {
  //   getSubCategory();
  // }, [categorys]);

  let getSubSubCategory = (id) => {
    if (id) {
      axios
        .get(`${apiBaseUrl}product/subSubCategory/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setSubSubCategorys(finalRes.data);
        });
    } else {
      setSubSubCategorys([]);
    }
  };

  // useEffect(() => {
  //   getSubSubCategory();
  // }, [subCategorys]);

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
    if (!editData?.productImage) return;

      let imageUrl = `${BACKENDURL}/uploads/product/${editData.productImage}`;


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

  let productSave = (e) => {
    e.preventDefault();

    let formValue = new FormData(e.target);

    formValue.append("upSellProducts", JSON.stringify(upSellProducts));


    formValue.append("existingGallery", JSON.stringify(galleryImages));


    //  formValue.append("productType", productType);

    if (id) {
      axios
        .put(`${apiBaseUrl}product/update/${id}`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);

            setTimeout(() => {
              navigate("/products/view");
            }, 2000);
          }
        });
    } else {
      axios
        .post(`${apiBaseUrl}product/create`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes._status) {
            toast.success(finalRes._message);

            setTimeout(() => {
              navigate("/products/view");
            }, 2000);
          }
        });
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}product/getDetails/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          let data = finalRes.details;

          console.log("Product Type:", data.productType);


          setEditData(data);
          setGalleryImages(data.productGallery || []);

          setParentCategory(data.parentCategory);
          setSubCategory(data.subCategory);
          setSubSubCategory(data.subSubCategory);

          setMaterial(data.material);
          setColor(data.color);

          setProductType(data.productType);
          setIsBestSelling(data.isBestSelling ? "true" : "false");
          setIsTopRated(data.isTopRated ? "true" : "false");
          setIsUpSell(data.isUpSell ? "true" : "false");
          setUpSellProducts(data.upSellProducts || []);

          getSubCategory(data.parentCategory);
          getSubSubCategory(data.subCategory);
        });
    }
  }, [id]);

  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb path="Products" link="/products/add" path2="Add" />
        </div>

        <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
          <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
            Add Products
          </div>

          <hr className="border-1 text-[#ccc]" />

          <div className="p-3">
            <form onSubmit={productSave} action="" className=" w-full ">
              <div className="flex gap-[3%]">
                <div className="basis-[35%]">
                  <div>
                    <label className="w-full mt-[10px] font-semibold">
                      Product Image
                    </label>
                    <input
                      type="file"
                      name="productImage"
                      accept="image/*"
                      className="dropify"
                      data-height="180"
                    />
                  </div>

                  {/* <div>
                    <label className="w-full mt-[10px] font-semibold">
                      Back Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="dropify"
                      data-height="180"
                    />
                  </div> */}

                  <div>
                    <label className="w-full mt-[10px] font-semibold">
                      Gallery Image
                    </label>

                    {/* Existing Gallery Images */}
                    <div className="flex gap-3 mt-3 flex-wrap">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`${BACKENDURL}/uploads/product/${image}`}
                            className="w-[150px] h-[150px] object-cover rounded-lg border"
                            alt="Product"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              setGalleryImages(
                                galleryImages.filter((item) => item !== image),
                              );
                            }}
                            className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Upload New Gallery Images */}
                    <input
                      type="file"
                      name="productGallery"
                      accept="image/*"
                      multiple
                      className="mt-3"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex gap-[3%] mt-3">
                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Product Name
                      </label>
                      <input
                        name="productName"
                        type="text"
                        placeholder="Product Name"
                        defaultValue={editData?.productName}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      />
                    </div>

                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Select Parent Category
                      </label>
                      <select
                        name="parentCategory"
                        value={parentCategory}
                        onChange={(e) => {
                          setParentCategory(e.target.value);
                          setSubCategory("");
                          setSubSubCategory("");
                          getSubCategory(e.target.value);
                        }}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>

                        {categorys.map((value) => {
                          return (
                            <option key={value._id} value={value._id}>
                              {value.categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-[3%] mt-5">
                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Select Sub Category
                      </label>
                      <select
                        name="subCategory"
                        value={subCategory}
                        onChange={(e) => {
                          setSubCategory(e.target.value);
                          setSubSubCategory("");
                          getSubSubCategory(e.target.value);
                        }}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>

                        {subCategorys.map((value) => {
                          return (
                            <option key={value._id} value={value._id}>
                              {value.subCategoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="flex flex-col basis-[48%]">
                      <label htmlFor="" className="font-semibold">
                        Select Sub Sub Category
                      </label>
                      <select
                        name="subSubCategory"
                        value={subSubCategory}
                        onChange={(e) => setSubSubCategory(e.target.value)}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>

                        {subSubCategorys.map((value) => {
                          return (
                            <option key={value._id} value={value._id}>
                              {value.subSubCategoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-[3%] mt-5">
                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Select Material
                      </label>
                      <select
                        name="material"
                        // multiple
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>

                        {materials.map((value) => {
                          return (
                            <option key={value._id} value={value._id}>
                              {value.materialName}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="flex flex-col basis-[48%]">
                      <label htmlFor="" className="font-semibold">
                        Select Color
                      </label>
                      <select
                        name="color"
                        // multiple
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>

                        {colors.map((value) => {
                          return (
                            <option key={value._id} value={value._id}>
                              {value.colorName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-[3%] mt-5">
                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Select Product Type
                      </label>
                      <select
                        name="productType"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>
                        <option value="featured">Featured</option>
                        <option value="newArrivals">New Arrivals</option>
                        <option value="onSale">On Sale</option>
                      </select>
                    </div>

                    <div className="flex flex-col basis-[48%]">
                      <label htmlFor="" className="font-semibold">
                        Is Best Selling
                      </label>
                      <select
                        name="isBestSelling"
                        value={isBestSelling}
                        onChange={(e) => setIsBestSelling(e.target.value)}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>

                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-[3%] mt-5">
                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Is Top Rated
                      </label>
                      <select
                        name="isTopRated"
                        value={isTopRated}
                        onChange={(e) => setIsTopRated(e.target.value)}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>

                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="flex flex-col basis-[48%]">
                      <label htmlFor="" className="font-semibold">
                        Is Up Sell
                      </label>
                      <select
                        name="isUpSell"
                        value={isUpSell}
                        onChange={(e) => setIsUpSell(e.target.value)}
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      >
                        <option value="">Nothing Selected</option>

                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="font-semibold">
                      Select Related / Upsell Products
                    </label>

                    <div className="border border-[#ccc] rounded-lg mt-2 p-3 max-h-[250px] overflow-y-auto">
                      {products.filter((product) => product._id !== id).length >
                      0 ? (
                        products
                          .filter((product) => product._id !== id)
                          .map((product) => {
                            let isSelected = upSellProducts.includes(
                              product._id,
                            );

                            return (
                              <div
                                key={product._id}
                                onClick={() => {
                                  if (isSelected) {
                                    setUpSellProducts(
                                      upSellProducts.filter(
                                        (productId) =>
                                          productId !== product._id,
                                      ),
                                    );
                                  } else {
                                    setUpSellProducts([
                                      ...upSellProducts,
                                      product._id,
                                    ]);
                                  }
                                }}
                                className={`flex items-center justify-between p-3 mb-2 rounded-lg border cursor-pointer transition ${
                                  isSelected
                                    ? "border-purple-600 bg-purple-50"
                                    : "border-[#e5e7eb] hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {}}
                                    className="w-4 h-4 cursor-pointer"
                                  />

                                  <div>
                                    <p className="font-medium text-[15px]">
                                      {product.productName}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                      ₹{product.productPrice}
                                    </p>
                                  </div>
                                </div>

                                {isSelected && (
                                  <span className="text-purple-600 font-semibold text-sm">
                                    Selected
                                  </span>
                                )}
                              </div>
                            );
                          })
                      ) : (
                        <p className="text-gray-500 text-sm py-3">
                          No other products available.
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Select products that you want to show as related products.
                    </p>
                  </div>

                  <div className="flex gap-[3%] mt-5">
                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Actual Price
                      </label>
                      <input
                        name="productActualPrice"
                        type="text"
                        defaultValue={editData?.productActualPrice}
                        placeholder="Actual Price"
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      />
                    </div>

                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Sale Price
                      </label>
                      <input
                        name="productPrice"
                        type="text"
                        defaultValue={editData?.productPrice}
                        placeholder="Sale Price"
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-[3%] mt-5">
                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Total In Stocks
                      </label>
                      <input
                        name="totalStock"
                        type="text"
                        defaultValue={editData?.totalStock}
                        placeholder="Total In Stocks"
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      />
                    </div>

                    <div className="flex flex-col basis-[48%] ">
                      <label htmlFor="" className="font-semibold">
                        Order
                      </label>
                      <input
                        name="productOrder"
                        type="text"
                        defaultValue={editData?.productOrder}
                        placeholder="Order"
                        className="border-1 border-[#ccc] rounded-lg p-2 mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <label htmlFor="shortDescription" className="font-semibold">
                  Short Description
                </label>

                <textarea
                  name="productShortDescription"
                  defaultValue={editData?.productShortDescription}
                  rows={5}
                  className="w-full border p-2 mt-2 rounded-lg"
                />
              </div>

              {/* <div className="mt-10">
                <label className="font-semibold">Description</label>

                <div className="mt-2">
                  <CKEditor
                    name="productDescription"
                    editor={ClassicEditor}
                    data={description}
                    config={{
                      licenseKey: "GPL",
                      plugins: [
                        Essentials,
                        Paragraph,
                        Heading,
                        Bold,
                        Italic,
                        Underline,
                        Link,
                        List,
                        RemoveFormat,
                      ],
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "link",
                        "|",
                        "numberedList",
                        "bulletedList",
                        "|",
                        "removeFormat",
                      ],
                    }}
                    onChange={(event, editor) => {
                      setDescription(editor.getData());
                    }}
                  />
                </div>
              </div> */}

              <div className="mt-10">
                <label htmlFor="shortDescription" className="font-semibold">
                  Description
                </label>

                <textarea
                  name="productDescription"
                  defaultValue={editData?.productDescription}
                  rows={5}
                  className="w-full border p-2 mt-2 rounded-lg"
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="border-1 border-[#ccc] p-3 rounded-lg bg-[#6B21A8] text-white text-[16px] cursor-pointer"
                >
                  {id ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
