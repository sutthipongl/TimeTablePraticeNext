import React , {useState} from 'react';
import TimeTableSelector from '../components/TimeTableSelector'
import ModeSwitch from '../components/ModeSwitch';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
	root: {
	  flexGrow: 1,
		padding: theme.spacing(3, 2),
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



function GameChallenge() {

	const [activetimetable,setActiveTimeTable] = useState([]);
	const [questions,setQuestions] = useState([]);
	const [totalscore,setTotalScore]  = useState(0);
	const [totalquestions,setTotalQst] = useState(0);
	const [isDone,setIsDone] = useState(false);
	const [IsDevide , setIsDevide] = useState(false);
	const [answer,setAnswer] = useState([]);


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
		refreshQuestions(newtable,setIsDevide);
	};

	function onModeChange(newmode)
	{	
		setIsDevide(newmode);
		refreshQuestions(activetimetable,newmode);
	};



	function refreshQuestions(ttbb,isDevideMode)
	{
		// Generate question object and assign to state.questions
		var alloperands = [1,2,3,4,5,6,7,8,9,10,11,12];
		var initQ = [];

		for (var n of ttbb)
		{
			var shuffled_alloperands =  shuffle(alloperands);

			for (let m of shuffled_alloperands)
			{
				initQ = initQ.concat(
					//question object
					{
						timetable : isDevideMode ? n*m : n,
						operand : isDevideMode ? n : m,
						answer : isDevideMode ? m : m*n,
						
					}
				);
			}
		}
		

		setQuestions(initQ);
		setTotalScore(0);
		setTotalQst(ttbb.length * alloperands.length);
		setAnswer([]);
		setIsDone(false);

	};

	function onAnswerChange(index, ans)
	{
		if(!isNaN(ans) ) {
			let temp = answer.slice();
			temp[index] = ans.trim();
			setAnswer(temp);
		}

	};

	function checkAnswer()
	{
		let score = 0;
		for(let n=0;n<questions.length ; ++n)
		{
			if( answer[n]  ==  questions[n].answer )
				++score;
		};

		setTotalScore(score);
		setIsDone(true);

	};


	const classes = useStyles();

	return (
		
	  
		<div className={classes.root}>
			<Grid container direction="column" spacing={3}>
				<Grid item xs={6}>
					<Grid><ModeSwitch onClick={ (s) => onModeChange(s)}/></Grid>
					<Grid><TimeTableSelector onClick={(t) => onTimeTableChange(t)}/></Grid>
					<Grid>
						<Typography variant="h6" gutterBottom>
							Total Questions : {totalquestions}
      					</Typography>
					</Grid>
					<Grid>
						<Typography variant="h6" gutterBottom>
							Points : {totalscore}
						</Typography>
					</Grid>
					<Grid>
						<Button variant="contained" color="primary" onClick={() => checkAnswer() }> Submit </Button>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					{
						questions.map( (qst,index) => (

							<Paper className={classes.root}>
								<Typography variant="h5" component="h5">
									Question {index+1}. What is {qst.timetable} {IsDevide ? '/' : 'x'} {qst.operand} ?
								</Typography>
								<Typography component="p" className={classes.row}>
									<Badge color={questions[index].answer == answer[index] ? "primary" : "secondary"} badgeContent={questions[index].answer == answer[index] ? "Correct" : "Opps !"}  invisible={!isDone} >
										<TextField key={Math.random()} value={answer[index]}  onChange={
											e => onAnswerChange(
												index,
												e.target.value)}/>
									</Badge>
								</Typography>
							</Paper>
							))

					}
				</Grid>
			</Grid>
	  </div>
	  );
	
  }

  export default GameChallenge;


