import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-900 h-full p-5">
      <div className="topbar w-full">
        <div className="container-md flex justify-between p-1">
          <h3 className="logo self-center">Chelakkedo</h3>
          <a href="https://github.com/RameesJahan/chelakkedo">
            <div className="btn-abt border border-fuchsia-400 px-4 py-2 font-bold text-xl rounded-full rounded-bl-none text-fuchsia-400 hover:bg-fuchsia-400 hover:text-white">About</div>
          </a>
        </div>
      </div>
      <div className="container-sm w-full h-full flex flex-col justify-center items-center">
        <p className="text-white font-mono max-w-xs whitespace-break-spaces text-2xl"><span className="text-3xl text-fuchsia-500 font-bold">Dive Deep, Not Wide:</span><br />Textual Connections in a Noisy World</p>
        <Link to="/login">
          <div className="px-4 py-2 mt-5 font-bold text-xl rounded-full rounded-bl-none bg-fuchsia-400 hover:bg-fuchsia-800 text-black">Start Chat</div>
        </Link>
        <div className="rounded-3xl border border-fuchsia-700 p-8 mt-8 text-center text-white">
          Report Bug 🐞: <a className="text-fuchsia-600 underline" href="https://github.com/RameesJahan/chelakkedo">GitHub</a>
        </div>
        <div className="rounded-3xl border border-fuchsia-700 p-8 mt-8">
          <p className="text-white">
            * This is a demonstration application created for educational purposes. It does not have the security features of a production-ready chat application. <br />
            * Do not send sensitive information through this app, as it is not encrypted. <br />
            * Use responsibly: Be respectful of other users and avoid sending offensive content.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home;