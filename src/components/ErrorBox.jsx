import React from 'react'

const ErrorBox = ({error}) => {
  return (
    <div className="w-full bg-red-500 bg-opacity-25 border border-red-600 text-white p-2 text-center text-sm">{error}</div>
  )
}

export default ErrorBox