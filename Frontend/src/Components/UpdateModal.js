import React, { useContext } from 'react'
import style from './addnote.module.css';
import noteContext from '../Context/notecontext';
export default function UpdateModal() {
    const { edit, setEdit  , setModal , updateNote } = useContext(noteContext)

    const handleChange = (e) => {
       
        setEdit({ ...edit, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        updateNote();
        setModal(false);
    }
    return (
        <div style={{
          
            position:"fixed",
            top:"0",
            left:"0",
            width:"100%",
            height:"100%",
            zIndex:"1000",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:"rgba(0,0,0,0.7)"


        }}>
          
            <form className={style.form} style={{ 
                border: 'none',
                backgroundColor:"grey",
                width:"80%"
         }}>
               <h2>Edit Note</h2>
                <div>
                    <input type='text' placeholder='Enter Title.. ' className={style.title} value={edit.title} name='title' onChange={handleChange} />
                </div>
                <br />
                <div>
                    <input type='text' placeholder='Enter Tag..' className={style.tag} value={edit.tag} name='tag' onChange={handleChange} />
                </div>
                <br />
                <div>
                    <textarea placeholder='write your note here..' className={style.description} value={edit.description} name='description' onChange={handleChange} />
                </div>
                <br />
                <div style={{
                    display:"flex",
                    justifyContent:"space-evenly",
                    width:"50%",
                    margin:"0 auto"
                }}> 
                    <button className={style.submit} onClick={onSubmit} >Save Changes</button>
                 <button className={style.submit} onClick={(e)=>{e.preventDefault(); setModal(false)}} >Cancel</button>
                
                </div>
            </form>
        </div>
    )
}
