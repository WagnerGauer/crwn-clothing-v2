import { Fragment, useContext } from "react"; // react forces me to use a top level element, if I don't want to have a div in my html, I have to use this
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
   const { currentUser, setCurrentUser } = useContext(UserContext);

   const signOutHandler = async () => {
      await signOutUser();
      setCurrentUser(null);
   };

   return (
      <Fragment>
         <div className="navigation">
            <Link className="logo-container" to="/">
               <CrwnLogo className="logo"></CrwnLogo>
            </Link>
            <div className="nav-links-container">
               <Link className="nav-link" to="/shop">
                  SHOP
               </Link>
               {currentUser ? (
                  <span className="nav-link" onClick={signOutHandler}>
                     SIGN OUT
                  </span>
               ) : (
                  <Link className="nav-link" to="/auth">
                     Sign In
                  </Link>
               )}
            </div>
         </div>
         <Outlet />
      </Fragment>
   );
};

export default Navigation;
