import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

import {
   createAuthUserWithEmailAndPassword,
   createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
   displayName: "",
   email: "",
   password: "",
   confirmPassword: "",
};

const SignUpForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { displayName, email, password, confirmPassword } = formFields;

   const { setCurrentUser } = useContext(UserContext);

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (password != confirmPassword) {
         alert("passwords do not match");
         return;
      }

      try {
         const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password
         );

         setCurrentUser(user);

         await createUserDocumentFromAuth(user, { displayName });
         resetFormFields();
      } catch (error) {
         if ((error.code = "auth/email-already-in-use")) {
            alert("Cannot create user, email already in use");
         } else {
            console.log("user creation encountered and arror", error);
         }
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;

      setFormFields({ ...formFields, [name]: value }); // here I update a key value pair in formfieds, the spread operator
      //allows me to do that, the key is [name](whatever name I am changing)
      // and value is whatever is the new value for that key.
   };

   return (
      <div className="sign-up-container">
         <h2>Don't have an account?</h2>
         <span> Sign up with your email and password</span>
         <form onSubmit={handleSubmit}>
            <FormInput
               label="Display Name"
               type="text"
               required
               onChange={handleChange}
               name="displayName"
               value={displayName}
            />
            <FormInput
               label="Email"
               type="email"
               required
               onChange={handleChange}
               name="email"
               value={email}
            />

            <FormInput
               label="Password"
               type="password"
               required
               onChange={handleChange}
               name="password"
               value={password}
            />

            <FormInput
               label="Confirm Password"
               type="password"
               required
               onChange={handleChange}
               name="confirmPassword"
               value={confirmPassword}
            />

            <Button type="submit">Sign Up</Button>
         </form>
      </div>
   );
};

export default SignUpForm;
