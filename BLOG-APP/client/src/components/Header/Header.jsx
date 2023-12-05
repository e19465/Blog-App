import "./header.css"
import BACK_1 from "../../assests/img/back2.jpg"

const Header = () => {
  return (
    <div className="header">
        <div className="header-titles">
            <span className="header-title-small">React & Node</span>
            <span className="headerr-title-large">Blog</span>
        </div>
        <div className="header-img-container">
          <img className="header-background" src={BACK_1} alt="" />
        </div>
    </div>
  )
}

export default Header