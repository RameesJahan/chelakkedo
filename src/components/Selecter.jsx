import React,{ useState, useEffect } from 'react'

const Selecter = ({ className, data, onSelect, selected }) => {
  
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    data.sort(function(a, b){
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }, []);
  
  const onSelectHandler = ({id}) => {
    setOpen(i => !i)
    setSearch(() => '')
    onSelect(id)
  }
  
  return (
    <div className={ `${className} relative border ${ open?"border-fuchsia-400":"border-gray-400"}`}>
      <div className="flex justify-between"
          onClick={() => setOpen(i => !i)}
      >
        <span>
          {selected&&(selected?.emoji+' '+selected?.name)||"Select Country"}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-6 h-6 transition  ${open?"-rotate-180":"rotate-0"}`} >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      <div className={`absolute top-full left-0 p-2 bg-slate-900 rounded border mt-2 w-full ${open?"block":"hidden"}` }>
        <div className="flex w-full px-2 py-1 rounded border border-gray-400 flex-nowrap gap-2 has-[:focus]:outline has-[:focus]:outline-fuchsia-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="min-w-4 w-4 min-h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input 
            className="flex-1 bg-transparent" 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Country..."/>
        </div>
        {/* list of Countries*/}
        <ul className="max-h-60 overflow-y-auto *:p-2 *:border-b *:border-white hover:*:bg-fuchsia-800 ">
          { data.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
          }).map(item => (
            <li key={item.id} onClick={() => onSelectHandler(item)} >{item.emoji + ' ' + item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Selecter