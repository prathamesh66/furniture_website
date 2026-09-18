import Breadcrumb from "../../common/Breadcrumb";


const ViewSliders = () => {
  // let pageTitle= "user / view"


  return (
    <>
      <section className="w-full">
        <div>
          <Breadcrumb path="Slider" link="/slider/view" path2="View" />
        </div>

        <div className="m-5">

          <div className="mt-[30px] border-1 overflow-hidden rounded-lg ">
            <div className="flex justify-between p-3 ">
              <div className="text-[25px] font-semibold">View Slider</div>

              <div className="flex items-center gap-3">
                

                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#15803D]">
                  <button className="p-2 cursor-pointer">Change Status</button>
                </div>

                <div className="border-1 border-[#ccc] rounded-lg text-white bg-[#B91C1C]">
                  <button className="p-2 cursor-pointer">Delete</button>
                </div>
              </div>
            </div>

            <hr className="border-1 text-[#ccc]" />

            <div className="mt-3 border-0 border-[#ccc] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="w-full bg-gray-600 ">
                  <tr className="w-full text-[#cccccc7d]">
                    <th className=" p-3 text-center">
                      <input type="checkbox" />
                    </th>

                    <th className="p-3 text-left"> NAME</th>

                    <th className="p-3 text-left">IMAGE</th>

                    <th className="p-3 text-center">ORDER</th>

                    <th className="p-3 text-center cursor-pointer">STATUS</th>

                    <th className="p-3 text-center cursor-pointer">ACTION</th>
                  </tr>
                </thead>

                <tbody className="bg-gray-700 text-white ">
                  <tr className="">
                    <td className="p-3  py-8  text-center">
                      <input type="checkbox" />
                    </td>

                    <td className="p-3 py-8">Prathamesh </td>

                    <td className="p-3 py-8">
                      <img
                        src={"/images/pexels-photo-2379005.jpg"}
                        width={"50px"}
                        height={"50px"}
                      />
                    </td>

                    <td className="p-3 py-8 text-center">1</td>

                    <td className="p-3 py-8  text-center">
                      <span className="p-2  bg-[#1DB655] rounded-lg cursor-pointer px-3">
                        Active
                      </span>
                    </td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2 bg-[#1D4ED8] rounded-lg cursor-pointer px-3">
                        Edit
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 py-8 text-center">
                      <input type="checkbox" />
                    </td>

                    <td className="p-3 py-8">Pratham</td>

                    <td className="p-3 py-8">
                      <img
                        src={"/images/pexels-photo-2379005.jpg"}
                        width={"50px"}
                        height={"50px"}
                      />
                    </td>

                    <td className="p-3 py-8 text-center">1</td>

                    <td className="p-3 py-8  text-center">
                      <span className="p-2  bg-[#DE2929] rounded-lg cursor-pointer px-3">
                        Deactive
                      </span>
                    </td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2 bg-[#1D4ED8] rounded-lg cursor-pointer px-3">
                        Edit
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewSliders;
