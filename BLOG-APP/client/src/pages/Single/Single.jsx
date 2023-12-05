import "./single.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import SinglePost from "../../components/SinglePost/SinglePost"


const Single = () => {
  return (
    <div className="single">
      <div className="single-post-container">
        <SinglePost/>
      </div>
      <div className="sidebar-container">
        <Sidebar/>
      </div>
    </div>
  )
}

export default Single