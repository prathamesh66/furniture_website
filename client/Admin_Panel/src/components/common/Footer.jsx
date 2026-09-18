import React from 'react'

const Footer = () => {
  return (
    <>
      <section className="w-full my-2 border-t border-[#ccc]">
        <div className="p-5 flex justify-between">
          <div>© 2026 WsCube Tech™. All Rights Reserved.</div>

          <div className="hover:underline cursor-pointer">
            Design By <span className="text-[#1b0ad2]">WsCube Tech</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer

