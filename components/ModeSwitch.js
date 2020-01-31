import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),

    },

  }));

function ModeSwitch(props)
{
    const [Mode , setMode] = useState("Multiplication");

    function handleChange(e)
    {
        console.log(e.target.value);
        setMode(e.target.value);
        props.onClick(e.target.value === "Division");
    }

    const classes = useStyles();
    return(
        <div className="custom-control custom-switch">
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Mode</FormLabel>
                    <RadioGroup row aria-label="pratice mode" name="mode" value={Mode} onChange={handleChange}>
                        <FormControlLabel value="Multiplication" control={<Radio />} label="Multiplication" />
                        <FormControlLabel value="Division" control={<Radio />} label="Division" />
                    </RadioGroup>
            </FormControl>
      </div>

    );
}

export default ModeSwitch;