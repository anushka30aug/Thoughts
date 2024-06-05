import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import authContext from '../Context/authcontext';

export default function Navbar() {
  const navigate=useNavigate();
  const {userState,setUserState}=useContext(authContext);
  const handleLogout = (e) => {
     if(!userState)
     {
      navigate('/login');
      return;
     }
    localStorage.removeItem('token');
    setUserState(false);
    navigate('/signup');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto "  >

            <li className="nav-item active">
              <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/about">About <span className="sr-only">(current)</span></Link>
            </li>

          

          </ul>
          <ul className="navbar-nav  ">  <li className="nav-item active">
              <button type="button" className="btn btn-primary" onClick={handleLogout}>{userState ? 'Logout' :'Login'}</button>
            </li></ul>
        </div>
      </nav>
    </div>
  )
}
