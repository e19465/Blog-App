import { Link } from "react-router-dom"
import "./topbar.css"
import NODP from "../../assests/img/nodp.png"
import { useContext } from "react";
import { Context } from "../../context/Context";

const Topbar = () => {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/";
    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
    }


  return (
    <div className='top'>
        <div className="topLeft">
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-twitter"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            <i className="topIcon fa-brands fa-square-instagram"></i> 
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="top-ul-li">
                    <Link className="Link" to="/">home</Link>
                </li>
                <li className="top-ul-li">
                    <Link className="Link" to="/write">write</Link>
                </li>
                <li className="top-ul-li" onClick={handleLogout}>
                    <Link className="Link" >{user && "logout"}</Link>
                </li>
            </ul>
        </div>
        <div className="topRight">
            {user.profilePic ? (
                <Link className="Link" to="/settings">
                    <img src={PF + user.profilePic} alt="" className="top-img" width={50} height={50}/> 
                </Link>
            ) : (
                <Link className="Link" to="/settings">
                    <img src={NODP} alt="" className="top-img" width={50} height={50}/> 
                </Link>
            )}
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}

export default Topbar