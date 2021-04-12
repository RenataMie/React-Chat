import React, {useState, useEffect} from "react";
import { Field, FieldArray, ErrorMessage } from "formik";
import axios from 'axios';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import  Conditional  from "./Conditional";
import StarsInput from "./StarsInput";
import GetCity from "./GetCity";



function DataArray({ name, form: { values, errors, status, ...bag}, ...arrayHelpers }) {

  const addNew = () => {
    arrayHelpers.push({});
  };

  const [isBirthDateShowed,setBirthDateShowed] = useState (false);
  const [isEmailShowed, setEmailShowed] = useState(false);
  const [isRatingShowed,setRatingShowed] = useState(false);
  

  
  const [cidade, setCidade] = useState("");
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  
  const [apiData,setApiData]=useState([]);


  function showBirthDate(event) {
    if (event.key === 'Enter' && cidade !== "" && cidade === event.target.value)
      setBirthDateShowed(true)
  }

  function showEmail(event) {
    if (event.key === 'Enter')
      setEmailShowed(true)
  }

 

  

  



useEffect(() => {
   
    axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
    .then((res) => {


     setApiData(res.data);
   });
},[]);
  

  

  return (

    <div className="container">
      <div className="row">
          {values[name].map((item, index) => (

            <div>

            
                <div >
                  <img className="img2" src={'/images/woman.png'} alt="Logo" width="45" height="45" />
                </div>

                <div className="questions2">
                  Que satisfação,<span> {`${values["fullName"]}`} </span> ! Agora que sei seu nome, qual <span>cidade</span> e <span>estado</span> que você mora?
                </div>
                

                <div>

                 <GetCity
                 
                 name={`${name}[${index}].city`}
                 
                 data={apiData}  
                  onSelect= {(cidade) => {
                    setCidade(cidade);
                    bag.setFieldValue(`${name}[${index}].city`,(cidade))
                   
                  }}
                  onKeyPress={showBirthDate} 


                  />

             

                

               </div>

              
              <Conditional

                collapsed={isBirthDateShowed === false}
                onCollapse={() => {
                  bag.setFieldValue(`${name}[${index}].birthDate`, undefined, false);
                  bag.setFieldTouched(`${name}[${index}].birthDate`, false);
                }}
              >

                <div >
                  <img className="img2" src={'/images/woman.png'} alt="Logo" width="45" height="45" />
                </div>

                <div className="questions2">
                  Legal, agora que sabemos onde mora. Qual sua <span>data de nascimento</span>?
                </div>

                <div  className="answers2">


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
               
         value={selectedDate}
         variant="dialog"
          format="dd/MM/yyyy"
          margin = "normal"
          keyboardIcon=""

          
          onKeyPress={showEmail}
          onChange={(date) => {
    setSelectedDate(date);
     bag.setFieldValue(`${name}[${index}].birthDate`,(date));
     
  }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>

                
                <ErrorMessage  name={`${name}[${index}].birthDate`} />
                </div>

              </Conditional>


              <Conditional
              
                collapsed={isEmailShowed === false}
                onCollapse={() => {
                  bag.setFieldValue(`${name}[${index}].email`,"",false);
                  bag.setFieldTouched(`${name}[${index}].email`,false);
                }}
              >

                <div >
                  <img className="img2" src={'/images/woman.png'} alt="Logo" width="45" height="45" />
                </div>

                <div className="questions2">
                  Agora me fala seu <span> e-mail</span>, por gentileza.
                </div>

               
               <div className="answers2">
                <Field className="input" 
                  
                
                  onKeyPress={(event) => {
                    if(event.key === 'Enter' && event.target.value !== "" )
                      setRatingShowed(true);
                  }}
                  
                  name={`${name}[${index}].email`} type="email"  placeholder="E-mail"
                />

                
                
                <div>
                 <ErrorMessage 
                  name={`${name}[${index}].email`}  /> 
                
                 </div>
                 
               
                
                </div>
                
              </Conditional>


              <Conditional
              
                collapsed={isRatingShowed === false}
                onCollapse={() => {
                  bag.setFieldValue(`${name}[${index}].rating`, undefined, false);
                  bag.setFieldTouched(`${name}[${index}].rating`, false);
                }}
              >

               <div >
                  <img className="img2" src={'/images/woman.png'} alt="Logo" width="45" height="45" />
                </div>

                <div className="questions2">
                  Para finalizar, faça uma avaliação sobre o processo.
                </div>

               <div className="answers2">
                <StarsInput
                />
                
                </div>

                <div >

                {status && status.msg && (
               <p className={`alert ${ status.sent ? "alert-success" : "alert-error"}`}>
            {status.msg}
              </p> )}

                </div>
                

                <div>
                <button disabled={!values["rating"]} type="submit"> <span>Enviar</span> </button>
                </div>
                
              </Conditional>
              
            </div>
          ))}
        
      </div>
      
    </div>
  );
}

export default  DataArray ;
