import React from "react";
import { Field,ErrorMessage } from "formik";
import Stars from "./Stars";


const fieldName = "rating";

const StarsInput = () => (
  <Field name={fieldName} id={fieldName} type="number">
    {({ field: { value }, form: { setFieldValue } }) => (
      
        <div>
          <Stars
            count={value}
            handleClick={number => setFieldValue(fieldName, number)}
          />
          
        </div>
    
    )}
  </Field>
);

export default StarsInput;
