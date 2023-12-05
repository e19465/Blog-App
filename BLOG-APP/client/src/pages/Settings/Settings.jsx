import "./settings.css"
import Sidebar from "../../components/Sidebar/Sidebar"
// import PP from "../../assests/img/post1.webp"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
import axios from "axios"

const Settings = () => {
    const PF = "http://localhost:5000/images/";
    const { user, dispatch } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [done ,setDone] = useState(false);
    const [file, setFile] = useState(null);

    // console.log("user", user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        setIsError(false);
        try{
            await axios.put("/users/" + user._id, {
                userID: user._id,
                username: username,
                email: email,
                password: password,
            });
            setDone(true);
            dispatch({type: "UPDATE_SUCCESS", payload: user});
        }catch(err){
            setIsError(true);
            console.log(err.stack);
            dispatch({type: "UPDATE_FAILURE"});
        }
        setUsername("");
        setEmail("");
        setPassword("");
    }

    const handleChangePP = async (e) => {
        dispatch({type: "UPDATE_START"})
        e.preventDefault();
        setIsError(false);
        const newUser = {...user}
        console.log("new ", newUser);
        console.log("exs ", user);
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newUser.profilePic = fileName;
            console.log("new uf ", newUser);
            try {
                await axios.post("/upload", data);
            } catch (err) {
                setIsError(true);
                console.log(err.stack);
            }
        }

        try{
            console.log("object");
            // const response = await axios.put("/users/"+ user._id, newUser.data);
            // console.log("res ",response);
            await axios.put("/users/" + user._id, {
                userID: user._id,
                profilePic: newUser.profilePic
            });
            // console.log(response);
            dispatch({type: "UPDATE_SUCCESS", payload: newUser});
        }catch(err){
            dispatch({type: "UPDATE_FAILURE"})
            setIsError(true);
            console.log(err.stack);
        }
    }

  return (
    <div className="settings">
        <div className="settings-wrapper">
            <div className="sett-title">
                <span className="sett-update-title">update your account</span>
                <span className="sett-delete-title">delete account</span>
            </div>

            <form className="pro-pic-update-form" onSubmit={handleChangePP}>
                <label className="sett-pp-label">profile picture</label>
                <div className="sett-form-pic">
                    {file ? <img className="sett-pp" src={URL.createObjectURL(file)} alt="" /> : <img className="sett-pp" src={PF + user.profilePic} alt="" />}
                    
                    <input 
                        type="file" 
                        accept="image/*" 
                        name="sett-change-pp" 
                        id="sett-change-pp" 
                        style={{display:"none"}}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label htmlFor="sett-change-pp"><i title="change profile picture" className="sett-pp-icon fa-regular fa-user"></i></label>
                    <button type="submit" className="update-btn-pp">update</button>
                </div>
            </form>

            <form className="sett-form" onSubmit={handleSubmit}>
                <input 
                    className="sett-inputs" 
                    type="text" 
                    placeholder="Enter User Name..." 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="sett-inputs" 
                    placeholder="Enter Email..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="sett-inputs"
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Enter Password..." 
                    autoCorrect="off"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="sett-update-btn" type="submit">update</button>
            </form>
            {isError && (<p className="update-text-p">Something went wrong!</p>)}
            {done && (<p className="update-text-p">User updated successfully!</p>)}
        </div>
        <div className="sidebar-wrapper">
            <Sidebar/>
        </div>
    </div>
  )
}

export default Settings