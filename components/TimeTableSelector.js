import React , {useState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
        <Button key={index} color={value ? "primary" : "secondary"} onClick={()=> handleClick(index+2)}>{index+2} </Button>
        )
    });

    return (

            <ButtonGroup  variant="contained" aria-label="outlined primary button group">
                {btns}
            </ButtonGroup>

    );
    
}

export default timetableselector;