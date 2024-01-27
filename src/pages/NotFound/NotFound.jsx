import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="w-full h-full bg-slate-900 text-fuchsia-400 grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <p className="text-9xl tracking-wider font-extrabold text-white">404</p>
        <p className="text-sm font-medium">Oops,Looks like you took a wrong turn.</p>
        <Link to="/">
          <button className="px-4 py-2 border rounded border-fuchsia-400 font-medium">Go Home</button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound