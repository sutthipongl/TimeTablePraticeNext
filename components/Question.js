import 'bootstrap/dist/css/bootstrap.min.css';


class Question extends React.Component {

	constructor(props)
	{
		
		super(props);
		
		this.onAnswerChange = this.onAnswerChange.bind(this);
		this.onEnter = this.onEnter.bind(this);

		this.state = {
			num : props.qno,
			time : props.timetable,
			oper : props.operand,
			ans : props.ans,
			isDisabled : props.ans == props.timetable*props ? true:false,
			cResultBadges : null,
		}
	}

	onEnter(event)
	{
		
		if(event.key =='Enter')
		{

			if(this.state.ans  == this.state.oper * this.state.time)
			{	

				this.setState({ cResultBadges : <span className="badge badge-success ml-2">Correct !</span>,
								isDisabled : true},() => this.props.NotifyCorrect());
				
				
				;


			}else
			{
				this.setState({ cResultBadges : <span className="badge badge-danger ml-2">Opps !</span>});
				
			}
		}
	}

	onAnswerChange(event)
	{
		
		if(!isNaN(event.target.value))
		{
			this.setState({ans : event.target.value});
		}else
		{
			this.setState({ans : 0});
		}

		
		
	}



	render() {

		const num = this.state.num;
		const time = this.state.time;
		const operand = this.state.oper;

		return (

			<div className="card">
				<h6 className="card-header">Question {num}. What is {time} x {operand} ?</h6>
				<div className="card-body">
				<p className="card-text"><input type="text" autoFocus onChange={this.onAnswerChange} onKeyPress={this.onEnter} disabled={this.state.isDisabled}/>
				{this.state.cResultBadges}</p>
				
				</div>
			</div>
		
		)
	}
};

export default Question;

