import Breadcrumb from "../../common/Breadcrumb";


const Orders = () => {
  // let pageTitle= "user / view"

  return (
    <>
      <section className="w-full">
        <div>
          <Breadcrumb path="Orders" link="/orders" path2="View" />
        </div>

        <div className="m-5">
          <div className="mt-[30px] border-1 overflow-hidden rounded-lg ">
            <div className="flex justify-between p-3 ">
              <div className="text-[25px] font-semibold">Order's List</div>
            </div>

            <hr className="border-1 text-[#ccc]" />

            <div className=" border-0 border-[#ccc] overflow-hidden">
              <table className="w-full">
                <thead className="w-full ">
                  <tr className="w-full bg-[#cccccc59] text-black text-[#cccccc7d]">
                    <th className=" p-3 text-center">
                      <button className="cursor-pointer bg-[#625FF1] py-2 px-3 rounded-lg">
                        DELETE
                      </button>
                    </th>

                    <th className="p-3 text-left">S.NO</th>

                    <th className="p-3 text-left">Order ID</th>

                    <th className="p-3 text-left">NAME</th>

                    <th className="p-3 text-center">QUANTITY</th>

                    <th className="p-3 text-center">PRICE</th>

                    <th className="p-3 text-center cursor-pointer">DATE</th>

                    <th className="p-3 text-center cursor-pointer">STATUS</th>

                    <th className="p-3 text-center cursor-pointer">VIEW</th>
                  </tr>
                </thead>

                <tbody className="  ">
                  <tr className="">
                    <td className="p-3  py-8  text-center">
                      <input type="checkbox" />
                    </td>

                    <td className="p-3 py-8">1 </td>

                    <td className="p-3 py-8">Frank01 </td>

                    <td className="p-3 py-8 ">Roshan Chaurasia </td>

                    <td className="p-3 py-8 text-center">2</td>

                    <td className="p-3 py-8 text-center">Rs. 3500</td>

                    <td className="p-3 py-8 text-center">17/07/2026</td>

                    <td className="p-3 py-8 text-center">Processing</td>

                    <td className="p-3 py-8 text-center">
                      <span className="p-2 border border-[#ccc] rounded-lg cursor-pointer px-3">
                        View
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

export default Orders;
