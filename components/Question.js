import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	root: {
	  padding: theme.spacing(3, 2),
	},
	margin: {
		margin: theme.spacing(1),
	  },
	  divider: {
		margin: theme.spacing(2, 0),
		width: '100%',
	  },
	  row: {
		marginTop: theme.spacing(2),
	  },
	
  }));

function Question(props){

	const[num,setNum] = useState(props.qno);
	const[time,setTimetable] = useState(props.timetable);
	const[oper,setOperand] = useState(props.operand);
	const[ans,setAns] = useState(props.ans);
	const[isDisabled,setIsDisabled] = useState(props.ans == props.timetable*props);
	const[isEnter,setIsEnter] = useState(false);


	function onEnter(event)
	{
		if(event.key =='Enter')
		{
			setIsEnter(true);

			var correct = false;
			if(!props.modeDivide)
			{
				if(ans  == oper * time)
				{	
					correct = true;		
				}
			}else
			{
				if(ans  == oper)
				{	
					correct = true;
				}
			}

			if(correct)
			{
				setIsDisabled(true);
				props.NotifyCorrect();
			}
			
			
		}
	}

	function onAnswerChange(v)
	{
			setAns(!isNaN(v) ? v : null);	
	}

	const classes = useStyles();
	
	return (


		<Paper className={classes.root}>
			<Typography variant="h5" component="h5">
				Question {num}. What is {props.modeDivide ? time*oper : time} {props.modeDivide ? '/' : 'x'} {props.modeDivide ? time : oper} ?
			</Typography>
			<Typography component="p" className={classes.row}>
				<Badge color={isDisabled ? "primary" : "secondary"} badgeContent={isDisabled ? "Correct" : "Opps !"}  invisible={!isEnter} className={classes.margin}>
					<Input autoFocus  onChange={ e => onAnswerChange(e.target.value)} onKeyPress={e => onEnter(e)} disabled={isDisabled}/>
				</Badge>
			</Typography>
		</Paper>
	
	)
	
};

export default Question;

