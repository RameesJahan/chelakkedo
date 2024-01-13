import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-900 h-full p-5">
      <div className="topbar w-full">
        <div className="container-md flex justify-between p-1">
          <h3 className="logo self-center">Chelakkedo</h3>
          <div className="btn-abt border border-fuchsia-400 px-4 py-2 font-bold text-xl rounded-full rounded-bl-none text-fuchsia-400 hover:bg-fuchsia-400 hover:text-white">About</div>
        </div>
      </div>
      <div className="container-sm w-full h-full flex flex-col justify-center items-center">
        <p className="text-white font-mono max-w-xs whitespace-break-spaces text-2xl"><span className="text-3xl text-fuchsia-500 font-bold">Dive Deep, Not Wide:</span><br />Textual Connections in a Noisy World</p>
        <Link to="/login">
          <div className="px-4 py-2 mt-5 font-bold text-xl rounded-full rounded-bl-none bg-fuchsia-400 hover:bg-fuchsia-800 text-black">Let's Chat</div>
        </Link>
      </div>
    </div>
  )
}

export default Home;