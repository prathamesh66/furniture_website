import axios from 'axios';
import Breadcrumb from '../../common/Breadcrumb';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from 'react';



const AddMaterials = () => {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;

  let [editData, setEditData] = useState(null)

  let {id} = useParams()


  let navigate = useNavigate();

  let saveMaterial = (e) => {
    e.preventDefault();

    let obj = {
      materialName: e.target.materialName.value,
      materialOrder: e.target.materialOrder.value,
    };


    if(id) {
      axios
      .put(`${apiBaseUrl}material/update/${id}`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          // e.target.reset();

          toast.success(finalRes._message);
          // navigate("/material/view");

          setTimeout(() => {
            navigate("/material/view");
          }, 6000);
        }
      })
  }

  else {
    axios
          .post(`${apiBaseUrl}material/create`, obj)
          .then((res) => res.data)
          .then((finalRes) => {
            if (finalRes._status) {
              toast.success(finalRes._message);
              // e.target.reset();
              // navigate("/material/view");

              setTimeout(() => {
                navigate("/material/view");
              }, 6000);
            }
          });
      };
  }
   

    

  // this is the getDetails api call

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}material/getDetails/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes)
          setEditData(finalRes.details);
        });
    } else {
      setEditData(null);
    }
  }, [id])

  

  return (
    <>
      <section className="w-full">
        <ToastContainer />
        <div>
          <Breadcrumb path="Material" link="/material/add" path2="Add" />
        </div>

        <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
          <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
            Add Material
          </div>

          <hr className="border-1 text-[#ccc]" />

          <div className="p-3">
            <form action="" onSubmit={saveMaterial}>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Material Name"
                  defaultValue={editData?.materialName}
                  name="materialName"
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                />
              </div>

              <div className="flex flex-col mt-[30px]">
                <label htmlFor="" className="font-semibold">
                  Order
                </label>
                <input
                  type="number"
                  placeholder="Enter Order"
                  defaultValue={editData?.materialOrder}
                  name="materialOrder"
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                />
              </div>

              <div className="mt-[40px]">
                <button
                  type="submit"
                  className="bg-[#9333EA] text-white py-2 px-3 cursor-pointer rounded-lg"
                >
                  {id ? "Update Material" : "Add Material"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}


export default AddMaterials
