import { Fragment, useContext } from "react"; // react forces me to use a top level element, if I don't want to have a div in my html, I have to use this
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
   const { currentUser } = useContext(UserContext);

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
                  <span className="nav-link" onClick={signOutUser}>
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
         {/* this enables that whatever component that is rendered will always be 
         rendered after the navigation */}
      </Fragment>
   );
};

export default Navigation;
