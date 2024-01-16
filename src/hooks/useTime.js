const useTime = () => {
  const getDate = (time) => {
    const date = new Date(parseInt(time));
    const current = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate()-1)
    
    const i_date = date.toLocaleDateString() //input date string 
    const t_date = current.toLocaleDateString() //today date string 
    const y_date = yesterday.toLocaleDateString() //yesterday date string 
    
    if(i_date == t_date) return "Today"
    if(i_date == y_date) return "Yesterday"
    
    return i_date
  }
  
  const getTime = (time) => {
    const date = new Date(parseInt(time))
    return date.toLocaleTimeString([],{hour12:true,hour:'2-digit', minute:'2-digit'})
  }
  
  return { getDate,getTime }
};

export default useTime