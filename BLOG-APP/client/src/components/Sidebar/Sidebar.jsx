import "./sidebar.css"
import ME from "../../assests/img/me1.png"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const Sidebar = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const fetchCategories = async () => {
            try{
                const response = await axios.get("/categories");
                setCategories(response.data);
            }catch (err) {
                console.log(`Error: ${err.stack}`);
            }
        }
        fetchCategories();
    },[])

  return (
    <div className="sidebar">
        <div className="sidebar-item">
            <span className="sidebar-title">about me</span>
            <div className="sidebar-imag-container">
                <img src={ME} alt="" />
            </div>
            <p className="about-me-text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum modi voluptatibus quis ab esse ullam ipsa quae autem vero velit.
            </p>
        </div>

        <div className="sidebar-item">
            <span className="sidebar-title">categories</span>
            <ul className="sidebar-ul">
                {categories.map((category) => (
                    <li className="sidebar-li" key={category._id}>   
                        <Link className="Link" to={`/?category=${category.name}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        <div className="sidebar-item">
            <span className="sidebar-title">follow us</span>
            <div className="sidebar-social">
                <i className="sidebarSocialIcon fa-brands fa-square-facebook"></i>
                <i className="sidebarSocialIcon fa-brands fa-square-twitter"></i>
                <i className="sidebarSocialIcon fa-brands fa-square-pinterest"></i>
                <i className="sidebarSocialIcon fa-brands fa-square-instagram"></i> 
            </div>
        </div>
    </div>
  )
}

export default Sidebar