import "./post.css"
import {Link} from "react-router-dom"

const Post = ({post}) => {
    const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
        <div className="post-img-container">
            {post.photo && (
                <img className="post-img" src={PF + post.photo} alt="" title={post.title} />
            )}
        </div>
        <div className="post-info">
            <div className="post-categories-container">
                {post.categories.map((category,index) => (
                    <span className="post-categories" key={index}>{category}</span>
                ))}
            </div>
            <Link className="Link" to={`/post/${post._id}`}>
                <div className="post-title">
                    {post.title}
                </div>
            </Link>
            <div className="post-desc-container">
                <p className="post-desc">
                    {post.desc}
                </p>
            </div>
            <div className="post-date">{new Date(post.createdAt).toDateString()}</div>
        </div>
    </div>
  )
}

export default Post