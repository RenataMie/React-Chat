import React, {useState} from 'react';
import axios from 'axios';


function ConfirmationMessage (props) {


    
   return (
       <div className="card">
           {props.apiData.status === 201 ?
               <div className="card-body">
                   <h3> Salvo com sucesso! </h3>
                     
               </div>
           : null


           }
       </div>
   )
}
export default ConfirmationMessage;