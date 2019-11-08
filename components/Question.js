import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Question(props){

	const[num,setNum] = useState(props.qno);
	const[time,setTimetable] = useState(props.timetable);
	const[oper,setOperand] = useState(props.operand);
	const[ans,setAns] = useState(props.ans);
	const[isDisabled,setIsDisabled] = useState(props.ans == props.timetable*props);
	const[cResultBadges,setResultBadges] = useState();

	function onEnter(event)
	{
		if(event.key =='Enter')
		{
			if(ans  == oper * time)
			{	
				setResultBadges(<span className="badge badge-success ml-2">Correct !</span>);
				setIsDisabled(true);

				props.NotifyCorrect();
				
			}else
			{
				setResultBadges(<span className="badge badge-danger ml-2">Opps !</span>);
			}
		}
	}

	function onAnswerChange(v)
	{
			setAns(!isNaN(v) ? v : null);	
	}
	
	return (

		<div className="card">
			<h6 className="card-header">Question {num}. What is {time} x {oper} ?</h6>
			<div className="card-body">
			<p className="card-text"><input autoFocus onChange={ e => onAnswerChange(e.target.value)} onKeyPress={e => onEnter(e)} disabled={isDisabled}/>
			{cResultBadges}</p>
			
			</div>
		</div>
	
	)
	
};

export default Question;

