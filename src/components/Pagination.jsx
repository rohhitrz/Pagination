import React, {useState,useEffect} from "react";

const PaginationComponent=()=>{
  const [employee,setEmployee]=useState([]);
  const[page,setPage]=useState(1);



useEffect(()=>{

  const fetchData= async()=>{
    try{
      const response= await fetch("");
      if(!response.ok){
        throw new Error("problem in fetching data");
      }
      const jsonResponse=await response.json('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      // console.log(jsonResponse);
      
      setEmployee(jsonResponse);
    }
    catch(e){
      console.error(e.message);
      alert(error.message);
      
    }

  }
  fetchData();

},[])


}
