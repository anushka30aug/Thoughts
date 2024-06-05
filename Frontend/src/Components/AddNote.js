import React, { useState } from 'react';
import style from './addnote.module.css'
import { useContext } from 'react';
import noteContext from '../Context/notecontext';
export default function AddNote() {
  const {addNote}=useContext(noteContext);
  const [add,setadd]=useState({title:'',tag:'',description:''});
  const onSubmit=(e)=>{
    e.preventDefault();
    addNote(add.title,add.tag,add.description);
    setadd({title:'',tag:'',description:''});
  }
  const handleChange = (e) => {
    setadd({...add , [e.target.name]:e.target.value})
  }
  return (
    <form className={style.form}>
      <div className='122215134erherger'> 
      <input type='text' placeholder='Enter Title.. ' minLength={3} value={add.title} name='title' onChange={handleChange} className={style.title}/>
      </div>
      <br/>
      <div>
      <input type='text' placeholder='Add Tag..' minLength={3} value={add.tag}  onChange={handleChange} name='tag' className={style.tag} />
      </div>
      <br/>
      <div>
      <textarea placeholder='write your note here..' minLength={3} onChange={handleChange}  value={add.description} name='description' className={style.description} />
      </div>
      <br/>
      <button className={style.submit} onClick={onSubmit} >Add Note</button>
    </form>
  )
}
