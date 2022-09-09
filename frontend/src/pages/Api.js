import Apinavbar from "./components/Apinavbar";
import {useState, useEffect} from 'react';
import React from 'react';
import { useLocation } from "react-router-dom";

const Api = () => {
    const location = useLocation()
    const [isActive, setisactive] = useState(false)
    const [edit, setedit] = useState(false)
    const [shouldrefetch, setrefetch] = useState(false)
    const [tasks, settasks] = useState([])
    const [task, settask] = useState({})


    useEffect(
        () => {    
                   
                let tempid = location.state.id
                fetch(`/api/${tempid}`).then(
                    res => {
                        if(res.ok){
                            return res.json()
                        }
                        return
                    }
                ).then(data => settasks(data))
        }
        , [shouldrefetch])
        
    function handleclick(_id, taskname, description, priority) {
        setisactive(!isActive)
        let temp = {_id: _id, description: description, taskname: taskname, priority: priority}
        settask(temp)
    }    

    function handleEdit(){
        setisactive(!isActive)
        setedit(!edit)
    }

    function handleCancel(){
        setedit(!edit)
        setisactive(!isActive)
    }
    async function handleSaveEdit(id){
        const newtname = document.querySelector('input[name="newtaskname"]')
        const newdesc = document.querySelector('textarea[name="newdesc"]')
        const token = localStorage.getItem('token')
        const userid = location.state.id
        const taskid = id

        let data = {
            taskname : newtname.value,
            description: newdesc.value
        }

        const requestOptions = {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                    'Accept': 'application/json'
             },
            credentials: "same-origin",
            body: JSON.stringify({newtask: data, token: token})
        }
        
        let response = await fetch(`/api/edit/${userid}/${taskid}`, requestOptions)
        let result = await response.json()
           
        if(result.refetch === true){
            setrefetch(!shouldrefetch)
        } 
        setedit(!edit) 
    }     
            
    const taskdetailsedit = (data) => {
        return(
            <div className={edit ? "taskdetailed d" : "taskdetailed nd"} key={data._id}>
                <div className="taskdetails">    
                    <p id="close" onClick={() => setedit(!edit)}> &#10006;</p>
                    <label >task :</label>
                    <input type="text" name="newtaskname"  defaultValue={data.taskname}/>
                    <label >more details: </label>
                    <textarea name="newdesc" defaultValue={data.description}></textarea>
                    <label >priority: </label>
                    
                    <button type="" id="save" onClick={()=> handleSaveEdit(data._id)}>Save</button>
                    <button type="" id="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>   
        )
    }
    const taskdetailsclick = (data) => {
                return(
                    <div className={isActive ? "taskdetailed d" : "taskdetailed nd"} key={data._id}>
                        <div className="taskdetails">
                            <p id="close" onClick={() => setisactive(!isActive)}> &#10006;</p>
                            <h3>{data.taskname}</h3>
                            <p id="description">{data.description}</p>
                            <p id="priority">importance : {data.priority}</p>
                            <button type="" id="edit" onClick={handleEdit}>Edit</button>
                            <button type="" id="Close" onClick={()=> setisactive(!isActive)}>Close</button>
                        </div>
                    </div>
                    
                )
    }

    function emptyfunc(){
        return
    }

    function deletetask(e){
        let taskid = e.target.value
        let temptaskslist = tasks.filter(item => item._id !== taskid)
        settasks(temptaskslist)
        fetch(`/api/delete/${location.state.id}/${taskid}`)
        .then(res => res.json())
        .then(data => {
            return
        })
    }

    const handlerendringtasks =({_id,taskname, description, priority}) => {
        return (<>   
            <div className="taskcard" key={_id} >
                <div className="data" onClick={() => handleclick(_id,taskname, description, priority)}>
                    <h4>{taskname}</h4>
                    <p>priority: <span>{priority}</span></p>    
                </div>
                    <input type="checkbox" value={_id} onChange={deletetask}/>
            </div>
            
        </>)
   }
   
   async function createnewtask(){
        const taskfield = document.querySelector('input[name="taskname"]')
        const descfield = document.querySelector('textarea')
        const token = localStorage.getItem('token')

        const newtask = {
            taskname: taskfield.value,
            description: descfield.value
        }

        taskfield.value = ""
        descfield.value = ""

        const requestOptions = {
            method: 'post',
            headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
             },
            credentials: "same-origin",
            body: JSON.stringify({newtask: newtask, token: token})
        }
        
        let response = await fetch('/api/create', requestOptions)
        let result = await response.json()
        if(result.refetch === true){
            setrefetch(!shouldrefetch)
        }
        // settasks(tasks.concat(result))
        
        // console.log(tasks)
        
   }

    return(
        <>
            <div className="container">
                <div className='navcontainer'>
                    <Apinavbar />    
                </div>
                <div className="menu">
                    <div className="tasks">
                            {tasks.map(handlerendringtasks)}
                    </div>
                    {isActive ? taskdetailsclick(task): emptyfunc()}
                    {edit ? taskdetailsedit(task) : emptyfunc()}
                    <div className={(isActive || edit) ? "taskform hide" : "taskform"}>
                        <h3>Add new task</h3>
                        <label >enter you task :</label>
                        <input type="text" name="taskname" />
                        <label >more details: </label>
                        <textarea></textarea>
                        <label >priority: </label>
                        
                        <button type="submit" onClick={createnewtask}>Save</button>
                    </div>
                </div>
            </div>
            
        </>
    )
}


export default Api;