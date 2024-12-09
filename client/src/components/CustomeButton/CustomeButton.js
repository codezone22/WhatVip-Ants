import { useState } from "react";

function CustomeButton({onClick, containStyles, icon, isLeft, type, title, bgHover, textColorHover, children}) {
  let style = {
    display:'inline-flex', 
    alignItems:'center',
    ...containStyles
  }
    const [bgc, setBgc] = useState(containStyles.backgroundColor);
    const [colorText, setColorText] = useState(containStyles.color);

    const handleHoverBg=()=>{
      setBgc(bgHover)
      setColorText(textColorHover)
    }
    const handleOutHoverBg=()=>{
      setBgc(containStyles.backgroundColor)
      setColorText(containStyles.color)
    }
    if(isLeft){
        return (
            <button
              onClick={onClick}
              type={type || "button"}
              style={{...style, backgroundColor:bgc, color:colorText, border:'none', textAlign:'center', justifyItems:'center', alignContent:'center'}}
              onMouseOver={handleHoverBg}
              onMouseOut={handleOutHoverBg}
            >
              {icon && <div style={{marginRight:'8px'}}>{icon}</div>}
              {title}
            </button>
          );
    }
    return (
        <button
          onClick={onClick}
          type={type || "button"}
          style={{...style, backgroundColor:bgc, color:colorText, border:'none', alignItems:'center', justifyItems:'center', alignContent:'center'}}
          onMouseOver={handleHoverBg}
              onMouseOut={handleOutHoverBg}
        >
          {children}
          {title}
          {icon && <div style={{marginLeft:'8px'}}>{icon}</div>}
        </button>
      );
}

export default CustomeButton;