import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {TextField} from '@material-ui/core';

import StarsInput from "./StarsInput";
import FormikStepper from "./FormikStepper";


import "./index.css";

function App() {

  const [isShowed, setShowed] = useState(false);
  const [isValid, setValid] = useState(true);

 
  const initialValues: userDetails = {
    fullName: '',
    city: '',
    birthDate: '',
    email: '',
    rating: 0
  };

  function newStep(event) {
    if (event.key === 'Enter')
    setShowed(true);
  }

  function handleChange(event) {
    if (event.target.value === '')
    setValid(false);
  }


	

	return (

	<div  className="container">
    
    

      <Formik
   

      validationSchema={
        yup.object({
          fullName: yup.string().required('O nome não é válido!').max(100),
          city: yup.string().required(),
          birthDate: yup.date().required(),
          email: yup.string().email('Este e-mail não é válido!'),
          rating: yup.number().required().min(1).max(5)
        })
      }

      initialValues={initialValues} onSubmit={(values, formikHelpers) => {
        axios({
           method: 'post',
           url: 'https://606b10eaf8678400172e5836.mockapi.io/chatUsers',
           data: values
         })

          .then((response) => {
               console.log(response);
          }, (error) => {
              console.log(error);
          })
      }} >

      {({
          handleSubmit,
          values,
          setFieldValue,
          setFieldTouched,
          isValid
        }) => (

       <Form>
     
        
          
           <div>
              Oi, qual seu nome?
            </div>
         
            <div>
              <Field onKeyPress={newStep}  name="fullName" as={TextField} placeholder="Nome e Sobrenome" />
              <ErrorMessage name="fullName" />
            </div>
              
        

            {isShowed &&
                <FormikStepper>
                    <div>
                      Qual cidade?
                     </div> 

                      <div className="inputCity">
                      <Field  name="city" as={TextField} placeholder="Cidade"/> 
                      {isValid? null: 
                      <ErrorMessage name="city" /> 
                      }
                      </div> 
                 </FormikStepper>
            }
     
        
      <div>

        <div>
          Quando nasceu?
        </div>

        <div>
          <Field name="birthDate" type="date" />
        </div>

      </div>


      <div>
        <div>
          Qual email?
        </div>

        <div>
          <Field name="email" type="email" as={TextField} label=""/>
          <ErrorMessage name="email" />
        </div>

      </div>


      <div>
        <div>
          Qual sua avaliação?
        </div>
        
        
        <div>

           <StarsInput />
                
        </div>

        <div>
        <button type="submit"> Enviar </button>
        </div>

        </div>
         
        
    
        </Form>
      )}
      </Formik>
      
 

  </div>


 
  );
}

export default App;