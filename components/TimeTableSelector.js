import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function timetableselector(props)  {

    const[buttonstatus,SetButtonStatus] = useState([0,0,0,0,0,0,0,0,0,0,0]);

    function handleClick(n)
	{
        //flip status
        buttonstatus[n-2] = !buttonstatus[n-2];

        //  update status
        SetButtonStatus(buttonstatus);
       
        // pass latest status to parent via callback
        props.onClick(buttonstatus);
    }
    
    var btns = buttonstatus.map((value,index) => {
        
        return (
        <button key={index} type="button" className={value ? "btn btn-danger" : "btn btn-secondary"} onClick={()=> handleClick(index+2)}>{index+2} </button>
        )
    });

    return (

        <div className="btn-group" role="group" aria-label="Time Table Chooser" disabled={true}>
            {btns}
        </div>

        
    );
    
}

export default timetableselector;