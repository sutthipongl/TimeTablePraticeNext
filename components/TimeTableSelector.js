import 'bootstrap/dist/css/bootstrap.min.css';

class timetableselector extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {

            buttonstatus : [0,0,0,0,0,0,0,0,0,0,0]
        }
    }

    onClick(n)
	{
        
        var mystatus = this.state.buttonstatus;

        //flip status
        mystatus[n-2] = !mystatus[n-2];

        //  update status
        this.setState({buttonstatus : mystatus});
        
        // pass latest status to parent via callback
        this.props.onClick(mystatus);
    }
    
    render()
    {
        var status = this.state.buttonstatus;

        var btns = status.map((value,index) => {
         
            return (
            <button key={index} type="button" className={value ? "btn btn-danger" : "btn btn-secondary"} onClick={()=>this.onClick(index+2)}>{index+2} </button>
            )
        });

        return (

            <div className="btn-group" role="group" aria-label="Time Table Chooser" disabled={true}>
               {btns}
            </div>

           
        );
    }
}

export default timetableselector;