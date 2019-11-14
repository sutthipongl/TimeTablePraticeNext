import React,{userState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function ResultModal(props){

  function dismissModal(){
    props.hideResult()
  }
  

      return (
      
          <div 
          onClick={()=>dismissModal()}
          className={`modal fade exampleModalCenter ${props.showResult ? 'show' : ''}`} 
          style={{
                display: `${props.showResult ? 'block' : 'none'}`,
              }}
          id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Result</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {props.data}
                </div>
              </div>
            </div>
          </div>
    

      );
    
  }
  
  
export default ResultModal;