import React, { useState, useEffect } from 'react'

const _colors = [ 
    "bg-rose-600","bg-blue-600","bg-stone-600","bg-red-600","bg-orange-600","bg-amber-600",
    "bg-yellow-600","bg-lime-600","bg-green-600","bg-emerald-600","bg-teal-600","bg-cyan-600",
    "bg-sky-600","bg-blue-600","bg-indigo-600","bg-violet-600","bg-purple-600","bg-pink-600"
  ]

const useColor = (id) => {
  const [colors, setColors] = useState(JSON.parse(localStorage.getItem('COLOR')) || {});
  const [color, setColor] = useState('');
  
  console.log(colors)
  
  useEffect(() => {
    if(colors[id]){
      setColor(colors[id])
    }else{
      const _i = _colors[Math.floor(Math.random()*_colors.length)]
      setColors(() => {
        return {...colors,[id]:_i}
      })
      setColor(_i)
    }
  }, [id])
  
  useEffect(() => {
    localStorage.setItem('COLOR',JSON.stringify(colors))
  }, [colors]);
  
  return { color }
}

export default useColor;