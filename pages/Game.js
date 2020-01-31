import React , {useState} from 'react';
import Question from '../components/Question';
import TimeTableSelector from '../components/TimeTableSelector'
import ModeSwitch from '../components/ModeSwitch';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
	root: {
	  flexGrow: 1,
	},
  }));

// //code from https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}



function Game() {

	const [activetimetable,setActiveTimeTable] = useState([]);
	const [questions,setQuestions] = useState([]);
	const [currentQuestion,setCurQst] = useState(1);
	const [scorePerQuestion] = useState(3);
	const [totalscore,setTotalScore]  = useState(0);
	const [totalquestions,setTotalQst] = useState(0);
	const [qKey,setQKey] = useState(Math.random());
	const [isDone,setIsDone] = useState(false);
	const [IsDevide , setIsDevide] = useState(false);


	function processCorrect()
	{
		var next = currentQuestion + 1;
		var max = totalquestions;
	
		setCurQst(next > max ? max : next);
		setTotalScore(Math.min(totalscore+scorePerQuestion,60));

		if(next>max)
		{
			setIsDone(true);
		}
	}

	function onTimeTableChange(n)
	{
		var newtable = [];
		for (var t = 0 ; t < 12 ; ++t)
		{
			if(n[t])
			{
				newtable = newtable.concat(t+2);
			}
		}

		setActiveTimeTable(newtable);
		refreshQuestions(newtable);
	}

	function onModeChange()
	{	
		setIsDevide(!IsDevide);
		refreshQuestions(activetimetable);
	}

	const handleDialogClose = () => {
		setIsDone(false);
	  };

	function refreshQuestions(ttbb)
	{
		// Generate question object and assign to state.questions
		var alloperands = [1,2,3,4,5,6,7,8,9,10,11,12];
		var initQ = [];

		for (var n of ttbb)
		{
			var opera =  shuffle(alloperands);

			for (let m of opera)
			{
				initQ = initQ.concat(
					//question object
					{
						timetable : n,
						operand : m,
						answer : null,
						
					}
				);
			}
		}
		
		setCurQst(1);
		setQuestions(initQ);
		setTotalScore(0);
		setTotalQst(ttbb.length * alloperands.length);
		setQKey(Math.random());
	}

	function toggleResult()
	{
		setIsDone(!isDone);
	}
  
	var data = questions ;
	var display = [];
	var myRandomKey = qKey;


	for (var q = 0 ; q < Math.min(currentQuestion,totalquestions) ;)
	{	
		
		display = display.concat (
								<Question  key={myRandomKey} qno={q+1} timetable={data[q].timetable} operand={data[q].operand} ans={data[q].answer} NotifyCorrect={()=> processCorrect()} modeDivide={IsDevide}/>
				);	
		
		++q;
		++myRandomKey;
		
	}

	var resultData = "I pratice timetable ";
	for(var m=0 ; m < activetimetable.length ; ++m)
	{
		resultData += activetimetable[m] ;
		if (activetimetable[m+1])
			resultData += ",";
	}

	resultData += " and get "+totalscore+" points from "+ totalquestions + " questions";

	const classes = useStyles();

	return (
		
	  
		<div className={classes.root}>
			<Grid container spacing={3}>	
				<Grid item xs={6}>
					<ModeSwitch onClick={ (s) => onModeChange(s)}/>
					<TimeTableSelector onClick={(t) => onTimeTableChange(t)}/>
						<Typography variant="h6" gutterBottom>
							Total Questions : {totalquestions}
      					</Typography>
						<Typography variant="h6" gutterBottom>
							Points : {totalscore}
						</Typography>
						<Dialog open={isDone}  aria-labelledby="form-dialog-title">
							<DialogTitle id="form-dialog-title">Result</DialogTitle>
							<DialogContent>
								<DialogContentText>
									{resultData}
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleDialogClose} color="primary" autoFocus>
									Ok
								</Button>
							</DialogActions>
						</Dialog>
				</Grid>
				<Grid item xs={6}>
					{display}
				</Grid>
			</Grid>
	  </div>

				
	  );
	
  }

  export default Game;


