import React, {useState} from 'react';
import {ErrorMessage, Field, FieldArray,Form, Formik, FormikHelpers as FormikActions} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import Conditional from "./Conditional";
import DataArray from "./DataArray";

import "./index.css";

function App() {

  const [isCityShowed,setCityShowed] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  function showCity(event) {
     if (event.key === 'Enter' && event.target.value !== "")
      setCityShowed(true)
  }
 
  const initialValues: userDetails = {
    fullName:'',
    userData: [],
    rating:0
  };

	return (

	<div  className="container">
    
      <Formik
   
        validationSchema={
          yup.object({
            fullName: yup.string().required('O nome não é válido!').max(100),
            rating: yup.number().required('Este campo é obrigatório').min(1,'Este campo é obrigatório'),
            userData: yup.array().of(
              yup.object({
                city: yup.string().required("Selecione uma cidade"),
                birthDate: yup.date().required("Selecione uma data."),
                email: yup.string().required('Este e-mail não é válido!').email('Este e-mail não é válido!')
            }))
          })
        }
      

      initialValues={initialValues} 

      onSubmit={(values, {setStatus}:FormikActions<values> ) => {
        axios({
           method: 'post',
           url: 'https://606b10eaf8678400172e5836.mockapi.io/chatUsers',
           data: {values}
         })
        

           .then(res => {
              setStatus(res.status)
              if (res.status === 201) {
        // 200 means POST method response with success 
        // Pass your server response to Formik
              setStatus({
                  sent: true,
                  msg: "Cadastro salvo com sucesso! Obrigada!"
          // Pass more if you need
        })
      }
    })
           .catch(err => {
      // Something went wrong
            setStatus({
              sent: false,
              msg: `Erro! ${err}. Atualize a página e tente preencher novamente.`
             })
          })
         }} >

      {({
          handleSubmit,
          values,
          setFieldValue,
          setFieldTouched,
          status,
          errors,
          isValid
        }) => (

       <Form onSubmit={handleSubmit}>
     
        <div>

        <div >
        <img className="img1" src={'/images/woman.png'} alt="Logo" width="45" height="45" />
        </div>
          
          
           <div className="questions">

              Olá! Sou a Chatty! Tudo bem? Para começarmos, primeiro preciso saber seu <span>nome</span>. 
              <p>(Pressione a tecla 'Enter' assim que preencher os campos)</p>
            </div>
       
         
            <div className="answers">
              <Field className="input" onKeyPress={showCity} name="fullName"   placeholder="Nome e Sobrenome" autoComplete="off" />
              
              <div style={{color:"red"}}>
              <ErrorMessage  name="fullName" />
              </div>
              
            </div>

        </div>

        <div>

          <Conditional
            collapsed= {isCityShowed === false}
                onCollapse={() => {
                  setFieldValue("userData", []);
                  setFieldTouched("userData", false);
                }}
                onShow={() => {
                  setFieldValue("userData", [{}]);
                }}
              >
                <FieldArray name={"userData"} component={DataArray} />
          </Conditional>

        </div>

        
            
        


          

        </Form>
      )}
      </Formik>
      
  </div>

  );
}

export default App;