import "./home.css"
import Header from "../../components/Header/Header"
import Posts from "../../components/Posts/Posts"
import Sidebar from "../../components/Sidebar/Sidebar"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";



const Home = () => {

  const [posts, setPosts] = useState([]);
  
  const {user} = useContext(Context);
  console.log(user);
  const {search} = useLocation();

  useEffect(()=>{
    const fetchPosts = async () => {
      try{
        const response = await axios.get("/posts"+search);
      // console.log(response);
      setPosts(response.data);
      }catch(err) {
        console.log(`Error: ${err.message}`);
      }
    }
    fetchPosts();
  },[search])


  return (
    <>
      <Header/>
      <div className="home">
        <div className="posts-container">
          <Posts posts={posts}/>
        </div>
        <div className="sidebar-container">
          <Sidebar/>
        </div>
      </div>
    </>
  )
}

export default Home