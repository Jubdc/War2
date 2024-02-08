import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className=" font-avant-garde text-white font-light bg-[url('./assets/homelight.png')] bg-fixed bg-center min-h-screen w-full h-full bg-no-repeat bg-cover top-28 flex flex-col justify-center items-start ">
      <div className=" flex flex-col justify-center items-start pl-24 pb-48">
        <div className=" text-custom-xl">
          <h1 className="pr-8 mt-5 translate-y-5 ">
            Cine<span className="text-cyan-400 ">m</span>a Qui
            <span className="text-cyan-400 ">z</span>
          </h1>
        </div>
        <div className="text-xl pl-2 color-grey ">
          <h1>Show us what the seventh art means to you.</h1>
        </div>
        <div className="border-[0.3px] border-white w-2/3 mt-1 ml-2 translate-y-2"></div>

        <NavLink
          to="/Choose"
          className=" border-[3.5px] border-cyan-400 pt-4 pb-4  ml-24 rounded-2xl mt-10 py-3 px-12 max-w-80 w-2/5 ml-22 flex justify-center align-center  hover:border-blue-800 transform hover:scale-110 transition-all duration-300"
        >
          <h1 className="text-4xl ">World</h1>
        </NavLink>

        <div className=" w-2/3 ml-22 flex justify-center align-center gap-3 mt-6 ">
          <h1 className="rounded-full text-xl py-3 px-12 max-w-56  border-[3.5px] border-cyan-400 w-48 flex justify-center  hover:border-blue-800 transform hover:scale-110 transition-all duration-300">
            America
          </h1>
          <h1 className="rounded-full text-xl py-3 px-12 max-w-56  border-[3.5px] border-cyan-400 w-48 flex justify-center  hover:border-blue-800 transform hover:scale-110 transition-all duration-300">
            Europe
          </h1>
        </div>

        <h1 className="rounded-full text-xl ml-32 mt-6 py-3 px-12 max-w-56   border-[3.5px]  border-cyan-400 w-2/3 ml-22 flex justify-center align-center hover:border-blue-800 transform hover:scale-110  transition-all duration-300 ">
          H-K/Korea
        </h1>
      </div>
    </div>
  );
}
