import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
// import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};



// And now we can use these
const Registration = () => {
  return (
    <>
      <h1>Registration</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          handleSubmit:""
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .min(20, "Must be 20 characters or less")
            .required("Required"),
          password: Yup.string()
            // .password("Invalid password`")
            .required("Required"),
           handleSubmit(initialValues){
               console.log(initialValues)
           } 
        
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
          <MyTextInput
            label="Password"
            name="Password"
            type="Password"
            placeholder=" "
          />
         
          <br />
          <button type="submit">Sign-in</button>
          <button type="submit">Sign-up</button>
          
        </Form>
        
      </Formik>
    </>
  );
};
function App() {
  return <Registration />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
