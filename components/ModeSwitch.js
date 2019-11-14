import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function ModeSwitch(props)
{
    const [IsDevide , setIsDevide] = useState(false);



    function handleClick()
    {
        setIsDevide(!IsDevide);
        props.onClick(IsDevide);
    }


    return(
        <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={() => handleClick()}/>
        <label className="custom-control-label" htmlFor="customSwitch1">{IsDevide ? 'Divide' : 'Times'}</label>
      </div>

    );
}

export default ModeSwitch;