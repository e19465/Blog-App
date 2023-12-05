import "./singlePost.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";

const SinglePost = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const location = useLocation();
  const postID = location.pathname.split("/")[2];
  const [myPost, setMyPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [iseditMode, setIEditMode] = useState(false);
  const PF = "http://localhost:5000/images/";
  const [isError, setIsError] = useState(false);


  useEffect(()=>{
    setIsError(false);
    const fetchPost = async () => {
      try{
        const response = await axios.get("/posts/" + postID);
        setMyPost(response.data);
        setTitle(response.data.title);
        setDesc(response.data.desc);
      }catch(err){
        setIsError(true);
        console.log(`Error: ${err.stack}`);
      }
    }
    fetchPost();
  },[postID])

  const handleDelete = async () => {
    setIsError(false);
    try{
      await axios.delete("/posts/" + postID, {data: {username: user.username}});
      navigate("/");
    }catch(err) {
      setIsError(true);
      console.log(err.stack);
    }
  }

  const handleEdit = async () => {
    try{
      await axios.put("/posts/" + postID, {
        username: user.username,
        title: title,
        desc: desc,
      });
    }catch (err) {
      setIsError(true);
      console.log(err.stack);
    }

    setIEditMode(false);

  }
  
  return (
    <>
      {isError && (<p className="err-p">Something went wrong!</p>)}
      {!isError && (
        <div className='single-post'>
          <div className="single-post-img-container">
            <div className="img">
              {myPost.photo && (
              <img className="single-post-img" src={PF + myPost.photo} alt="" />
              )}
            </div>
            <div className="title-container">
              {iseditMode
              ? 
                (<input 
                  type="text"
                  placeholder="Write your title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="edit-mode-title"
                />) 
              : 
                (<h2>{title}</h2>)}
              {myPost.username === user?.username && (
                <div className="btn-container">
                  <i onClick={() => setIEditMode(true)} className="edit fa-regular fa-pen-to-square"></i>
                  <i onClick={handleDelete} className="delete fa-regular fa-trash-can"></i>
                  {isError && (<p className="err-p">Something went wrong!</p>)}
                </div>
              )}
            </div>
          </div>
          <div className="single-post-info-container">
            <span className="single-post-author1">
                Author: <Link className="Link" to={`/?user=${myPost.username}`}><b className="single-post-author2">{myPost.username}</b></Link>
            </span>
            <span className="single-post-time">{new Date(myPost.createdAt).toDateString()}</span>
          </div>
          <div className="single-post-desc-container">
            {iseditMode ? 
              <textarea 
                name="edit-desc-text-area" 
                id="edit-desc-text-area" 
                className="edit-text-area"
                placeholder="Write your story..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                ></textarea> 
                : (
                  <p className="single-post-desc">
                    {desc}
                  </p>
                )}
          </div>
          {iseditMode ? (<button onClick={handleEdit} className="update-btn">update</button>) : null}
        </div>
      )}
    </>
  )
}

export default SinglePost