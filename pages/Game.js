import React , {useState} from 'react';
import Question from '../components/Question';
import TimeTableSelector from '../components/TimeTableSelector'
import 'bootstrap/dist/css/bootstrap.min.css';

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

	const [questions,setQuestions] = useState([]);
	const [currentQuestion,setCurQst] = useState(1);
	const [scorePerQuestion] = useState(4);
	const [totalscore,setTotalScore]  = useState(0);
	const [totalquestions,setTotalQst] = useState(0);
	const [qKey,setQKey] = useState(Math.random());


	function processCorrect()
	{
		var next = currentQuestion + 1;
		var max = totalquestions;
	
		setCurQst(next > max ? max : next);
		setTotalScore(Math.min(totalscore+scorePerQuestion,60));
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

		refreshQuestions(newtable);
	}

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
  
	var data = questions ;
	var display = [];
	var myRandomKey = qKey;

	for (var q = 0 ; q < Math.min(currentQuestion,totalquestions) ;)
	{	
		
		display = display.concat (
								<Question  key={myRandomKey} qno={q+1} timetable={data[q].timetable} operand={data[q].operand} ans={data[q].answer} NotifyCorrect={()=> processCorrect()} />
				);			
		++q;
		++myRandomKey;
	
	}

	  return (
				<div className="container">
					<div className="row">			
						<div className="col-md">
							{display}
						</div>
						<div className="col-sm">
							<TimeTableSelector onClick={(t) => onTimeTableChange(t)}/>
							<div className="card">
								<h6 className="card-header">Total Questions : {totalquestions}</h6>
				
							</div>
							<div className="card">
								<h6 className="card-header">Points : {totalscore}</h6>
						
							</div>
						</div>	
					</div>
				</div>
	  );
	
  }

  export default Game;