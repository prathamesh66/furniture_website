import { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb';
import { ChromePicker } from "react-color";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from "react-toastify";



const AddColor = () => {

  let navigate = useNavigate()

  let {id} = useParams()


  //this is the for the colorPicker

  const [color, setColor] = useState("");

  let [editData, setEditData] = useState(null)

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL;
  // console.log(apiBaseUrl);

  let saveColor =(e)=> {
      e.preventDefault()
      let obj = {
        colorName: e.target.colorName.value,
        colorCode: e.target.colorCode.value,
        colorOrder: e.target.colorOrder.value,
      };
      
      if(id) {
        axios
          .put(`${apiBaseUrl}/color/update/${id}`, obj)
          .then((res) => res.data)
          .then((finalRes) => {
            if (finalRes._status) {
              // alert(finalRes._message);
              toast.success(finalRes._message);

              // e.target.reset();


              // setTimeout(() => {
                // navigate("/color/view");
              // }, 6000);

              navigate("/color/view");
            }
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }

      else {
        axios
          .post(`${apiBaseUrl}/color/create`, obj)
          .then((res) => res.data)
          .then((finalRes) => {
            if (finalRes._status) {
              // alert(finalRes._message);
              toast.success(finalRes._message);

              // e.target.reset();

              // setTimeout(() => {
              //   navigate("/color/view");
              // }, 6000);

              navigate("/color/view");
            }
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }

  }



  // this is the getDetails api call 

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiBaseUrl}/color/getDetails/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          setEditData(finalRes.details)
          setColor(finalRes.details.colorCode)
        })
    } else {
      setEditData(null)
    }
  }, [id])




  return (
    <>
      <section className="w-full">
        <ToastContainer />

        <div>
          <Breadcrumb path="Color" link="/color/add" path2="Add" />
        </div>

        <div className="mt-[30px]  border-1 border-[#ccc] rounded-lg overflow-hidden m-5">
          <div className="p-3 bg-[#F1F5F9] text-[20px] font-semibold">
            Add Colors
          </div>

          <hr className="border-1 text-[#ccc]" />

          <div className="p-3">
            <form action="" onSubmit={saveColor}>
              <div className="flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Color Name
                </label>
                <input
                  type="text"
                  name="colorName"
                  defaultValue={editData?.colorName}
                  placeholder="Enter Color Name"
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                />
              </div>

              <div className="flex flex-col mt-[30px]">
                <label htmlFor="" className="font-semibold">
                  Color Picker
                </label>
                <div className="flex items-center gap-3">
                  <ChromePicker color={color} onChange={handleColorChange} />
                  <div
                    className="w-10 h-10 border border-gray-400 rounded-md"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>

                <input
                  type="hidden"
                  name="colorCode"
                  value={color}
                  // defaultValue={editData?.colorCode}
                />
              </div>

              <div className="flex flex-col mt-[30px]">
                <label htmlFor="" className="font-semibold">
                  Order
                </label>
                <input
                  type="number"
                  name="colorOrder"
                  defaultValue={editData?.colorOrder}
                  placeholder="Enter Order"
                  className="border-1 mt-2 rounded-lg border-[#ccc] p-2 px-3"
                />
              </div>

              <div className="mt-[40px]">
                <button
                  type="submit"
                  className="bg-[#9333EA] text-white py-2 px-3 cursor-pointer rounded-lg"
                >
                  {id ? "Update Color" : "Add Color"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddColor
