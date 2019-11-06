import 'bootstrap/dist/css/bootstrap.min.css';
import Question from '../components/Question';
import TimeTableSelector from '../components/TimeTableSelector'

// //code from hthis.state.ttps://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php

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



class Game extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
				timetable : [],
				questions : [],
				currentQuestion : 1,
				scorePerQuestion : 4,
				totalscore : 0,
				totalquestions : 0,
				qKey : Math.random(),
			}
		
	  }

	processCorrect()
	{
		var next = this.state.currentQuestion + 1;
		var max = this.state.totalquestions;
		this.setState({
			currentQuestion : next > max ? max : next,
			totalscore : Math.min(this.state.totalscore+this.state.scorePerQuestion,60),
		});

		
	}

	onTimeTableChange(n)
	{
		var newtable = [];
		for (var t = 0 ; t < 12 ; ++t)
		{
			if(n[t])
			{
				newtable = newtable.concat(t+2);
			}
		}

		this.refreshQuestions(newtable);
	}

	refreshQuestions(ttbb)
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
		
		this.setState( {
				timetable : ttbb,
				currentQuestion  : 1,
				questions : initQ,
				totalscore : 0,
				totalquestions : ttbb.length * alloperands.length,
				qKey : Math.random()
			});
	}
  
	render() {

		var data = this.state.questions ;
		var display = [];

		var myRandomKey = this.state.qKey;

		for (var q = 0 ; q < Math.min(this.state.currentQuestion,this.state.totalquestions) ;)
		{	
			
			display = display.concat (
									<Question  key={myRandomKey} qno={q+1} timetable={data[q].timetable} operand={data[q].operand} ans={data[q].answer} NotifyCorrect={()=> this.processCorrect()} />
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
							<TimeTableSelector onClick={(timetablearray) => this.onTimeTableChange(timetablearray)}/>
							<div className="card">
								<h6 className="card-header">Total Questions : {this.state.totalquestions}</h6>
				
							</div>
							<div className="card">
								<h6 className="card-header">Points : {this.state.totalscore}</h6>
						
							</div>
						</div>	
					</div>
				</div>
	  );
	}
  }

  export default Game;