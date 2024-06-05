import { useContext } from "react";
import AddNote from "./AddNote";
import FetchNotes from "./FetchNotes";
import UpdateModal from "./UpdateModal";
import { Navigate } from 'react-router-dom';
import noteContext from "../Context/notecontext";
import authContext from "../Context/authcontext";
import Footer from "./Footer";
import style from './Home'

function Home() {
  const { modal } = useContext(noteContext);
  const {setUserState}= useContext(authContext)
  if (!localStorage.getItem('token') ) {
     setUserState(false);
    return <Navigate replace to='/signup'  />
  }
  else {
    return (
      <div className={style.home_component}>
        {modal && <UpdateModal />}
        <AddNote />
        <FetchNotes />
       
      </div>
    )
  }
}
export default Home;