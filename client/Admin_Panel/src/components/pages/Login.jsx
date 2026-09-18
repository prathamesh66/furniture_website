import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <div className="w-full h-screen bg-[#F3F4F6]">
        <div className="max-w-[800px] mx-auto py-[70px]">
          <div className="grid grid-cols-[40%_60%] shadow-lg">
            <div className="bg-[#3B82F6] py-[70px] px-[20px] rounded-lg">
              <h1 className="text-white font-medium text-3xl text-center">
                K - WD
              </h1>
              <p className="mt-[40px] text-center text-[#D1D5DB] font-medium">
                With the power of K-WD, you can now focus only on functionaries
                for your digital products, while leaving the UI design on us!
              </p>

              <div className="mt-[70px] text-center">
                <p className="text-white">Don't have an account?</p>
                <p className="underline text-white mt-[5px]">Get Started</p>
              </div>

              <div className="mt-[40px] text-[#D1D5DB] text-center">
                Read our <span className="underline">terms</span> and{" "}
                <span className="underline">conditions</span>
              </div>
            </div>

            <div className="bg-white px-[20px] py-[10px] rounded-lg">
              <h1 className="mt-[20px] text-2xl font-semibold">
                Account Login
              </h1>
              <form action="" className="mt-[25px]">
                <div className="flex flex-col">
                  <label htmlFor="" className="text-[#5d5a5a]">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="p-2 border-1 border-[#ccc] rounded-lg mt-[5px]"
                  />
                </div>

                <div className="flex flex-col mt-[20px] relative">
                  <label htmlFor="" className="text-[#5d5a5a]">
                    Password
                  </label>
                  <p className="absolute right-[5px] text-blue-600">
                    Forgot Password?
                  </p>
                  <input
                    type="text"
                    className="p-2 border-1 border-[#ccc] rounded-lg mt-[5px]"
                  />
                </div>

                <div className="flex mt-[20px]">
                  <input type="checkbox" />
                  <label htmlFor="" className="text-[#5d5a5a] ml-[5px]">
                    Remember Me
                  </label>
                </div>

                <div className="mt-[20px] w-full cursor-pointer">
                  <Link to="/dashboard">
                    <button className="table mx-auto border-1 border-black bg-[#3B82F6] text-white py-[5px] w-full text-[20px] rounded-lg border-none cursor-pointer">
                      Log in
                    </button>
                  </Link>
                </div>

                <div className="flex items-center gap-3 justify-center mt-[20px]">
                  <div className="w-[50px] h-[1px] bg-gray-300"></div>

                  <span className="text-gray-500 text-sm">or login with</span>

                  <div className="w-[50px] h-[1px] bg-gray-300"></div>
                </div>

                <div className="mt-[20px] w-full border-1 border-black rounded-lg">
                  <button className="table mx-auto border-1 border-black hover:bg-[black] hover:text-white text-black py-[5px] w-full text-[20px] rounded-lg border-none">
                    <span></span>
                    Login with Google
                  </button>
                </div>

                <div className="mt-[10px] w-full border-1 border-black rounded-lg">
                  <button className="table mx-auto hover:bg-[#3B82F6] hover:text-white text-blue-600 py-[5px] w-full text-[20px] rounded-lg border-none">
                    Login With Facebook
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
