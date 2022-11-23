import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFoundPage from "../pages/not-found";

/** guest page */
import LandingPage from "../pages/guest/pages/landing";
import LoginPage from "../pages/guest/pages/login";
import ForgotPasswordPage from "../pages/guest/pages/forgot-password";
import ResetPasswordPage from "../pages/guest/pages/forgot-password/reset";
import SetPasswordPage from "../pages/guest/pages/login/pages/set-password";
import PrivacyPolicyPage from "../pages/guest/pages/privacy-policy";
import TermsAndConditionsPage from "../pages/guest/pages/terms-and-conditions";
/** leads page */
import LeadsPage from "../pages/leads/app";
/** users page */
import UserDashboardPage from "../pages/user/pages/dashboard";
import UserCompanySubmissionPage from "../pages/user/pages/company-submission";

import PublicRoute from "./public";
import LeadsRoute from "./leads";
import UserRoute from "./user";

const AppRoute = () => {
  return (
    <Switch>
      <PublicRoute exact path="/" component={LoginPage} />
      {/* <PublicRoute exact path="/" component={LandingPage}/> */}
      {/* <PublicRoute exact path="/login" component={LoginPage}/> */}
      <PublicRoute
        exact
        path="/forgot-password"
        component={ForgotPasswordPage}
      />
      <PublicRoute
        exact
        path="/reset-password/:uidb64/:token"
        component={ResetPasswordPage}
      />
      <PublicRoute exact path="/set-password" component={SetPasswordPage} />
      <PublicRoute exact path="/privacy-policy" component={PrivacyPolicyPage} />
      <PublicRoute
        exact
        path="/terms-and-conditions"
        component={TermsAndConditionsPage}
      />

      {/* <UserRoute path="/home" component={UserDashboardPage}/>
            <UserRoute path="/company-submission" component={UserCompanySubmissionPage}/> */}

      <LeadsRoute path="/leads" component={LeadsPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default AppRoute;
