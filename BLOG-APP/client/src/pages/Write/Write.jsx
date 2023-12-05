import "./write.css"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Write = () => {

    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [isError, setIsError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        const newPost = {
            username: user.username,
            title,
            desc,
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.photo = fileName;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                setIsError(true);
                console.log(err.stack);
            }
        }

        try{
            const response = await axios.post("/posts/", newPost);
            console.log(response);
            navigate("/post/"+response.data.post._id);
        }catch(err){
            setIsError(true);
            console.log(err.stack);
        }
    }



  return (
    <div className='write-form-container'>
        <form className='write-form' onSubmit={handleSubmit}>
            {isError && (<p className="p-err">Something went wrong!</p>)}
            {file && (
                <div className="upload-img-container">
                    <img 
                        className="upload-img" 
                        src={URL.createObjectURL(file)} 
                        alt=""
                    />
                </div>
            )}
            <input 
                className="write-img-input" 
                type="file" 
                accept='image/*' 
                name="write-img-upload" 
                id="write-img-upload" 
                style={{display: "none"}}
                onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="write-img-input-label" htmlFor="write-img-upload">
                <div className="write-text-upload-container">
                    <span className="write-img-upload">upload image</span>
                    <i className="write-img-upload-icon fa-solid fa-plus"></i>
                </div>
            </label>
            <input 
                className="write-title-input" 
                type="text" placeholder="Title..." 
                required 
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
                className="write-text-area" 
                name="text-area" 
                id="text-area" 
                placeholder="Write your story..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <button className="write-btn" type="submit">publish</button>
        </form>
    </div>
  )
}

export default Write