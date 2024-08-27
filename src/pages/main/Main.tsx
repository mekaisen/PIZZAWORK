import { useEffect } from "react"

const Main = ()=>{
  useEffect(()=>{
    console.log('@@@ join')
    fetch('https://shift-backend.onrender.com/pizza/catalog')
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch(error=>{
      if(error instanceof Error){
        console.log(error.message)
      }
    })
  },[])


  return(
    <div>
      <button></button>
    </div>
  )
}
export {Main}