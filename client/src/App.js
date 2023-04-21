import Axios from 'axios';
import React, { useEffect, useState } from "react";
import './App.css';

const App = () =>{
    const [name,setName]=useState("");
    const[callby,setCallBy]=useState(0);
    const[livein,setLiveIn]=useState("");
    const [dataList,setDataList]=useState([]);

    const addContact=()=>{
        Axios.post('http://localhost:28345/insert',{name:name,callby:callby,livein:livein})
        .catch((err)=>console.log(err));
        location.reload();
    }
    const updateData=(id)=>{ 
        const newCallBy=Number(prompt("Enter:"));
        console.log(id);
        Axios.put(`http://localhost:28345/update/${id}`,{callby:newCallBy})
        .catch((err)=>console.log(err));
        location.reload();  
    }
    const deleteData=(id)=>{
        // console.log(id);
        // console.log(id);
        Axios.delete(`http://localhost:28345/delete/${id}`);    
        location.reload();    
    } 
    
    useEffect(()=>{
        Axios.get('http://localhost:28345/readData')
        .then((res)=>setDataList(res.data)).catch((err)=>console.log(err));
    },[]);

    return (
        <div className="App">
            <h1 id='heading'>Contacts</h1>
            <div className='form'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name"  onChange={(e)=>setName(e.target.value)} required/>
        
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" onChange={(e)=>setCallBy(e.target.value)} required/>
        
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" onChange={(e)=>setLiveIn(e.target.value)} required/>
        
        <input type="submit" value="Add Contact"  required onClick={addContact}/>
        </div>
        <div className='disp'>
        <table>
                    <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Address</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
        {dataList.map((data)=>{
            return(
                
                    <tr>
                        <th>{data.name}</th>
                        <th>{data.callby}</th>
                        <th>{data.livein}</th>
                        <th><button className='edit' onClick={()=>updateData(data._id)}>+</button></th>
                        <th><button className='edit' onClick={()=>deleteData(data._id)}>-</button></th>
                    </tr>
            )
        })}
        </table>
        </div>
        </div>
    )
}

export default App;