import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateForum from "./pages/CreateForum";
import Navbar from "./components/Navbar";
import Subject from "./pages/Subject";
import Auth from "./auth/Auth";
import QuestionPage from "./pages/QuestionPage";
import SearchForum from "./pages/SearchForum"

// const App = () => (
//   <Router>
//     <div>
//       <Navbar />
//       <Switch>
//         <Route path="/" exact component={Home} />
//         <Route path="/Auth" exact component={Auth} />
//         <Route path="/CreateForum" exact component={CreateForum} />
//         <Route path="/Profile/:id" exact component={Profile} />
//         <Route path="/Subject/:subject" exact component={Subject} />
//       </Switch>
//     </div>
//   </Router>
// );

const UnauthenticatedRoutes = ({ isAuthenticated }) => (
  <>
    <Switch>
      <Route path="/" exact>
        <Home isAuthenticated={isAuthenticated}/>
      </Route> 
      <Route path="/auth">
        <Auth />
      </Route>

      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/profile/:id">
          <Profile isAuthenticated={isAuthenticated} />
        </Route>
        <Route path="/subject/:subject">
          <Subject isAuthenticated={isAuthenticated} />
        </Route>
        <Route path="/question/:question">
          <QuestionPage isAuthenticated={isAuthenticated} />
        </Route>
        <Route path="/searchforum/:keyword">
          <SearchForum isAuthenticated={isAuthenticated} />
        </Route>
      </Suspense>
    </Switch>
  </>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  console.log("rest", rest);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated(true) ? (
          <Suspense fallback={<div>Loading...</div>}> {children}</Suspense>
        ) : (
          <Redirect to="/auth" />
        )
      }
    ></Route>
  );
};

const AppRoutes = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <Navbar isAuthenticated={auth.isAuthenticated()}/>
      <Switch>
        <AuthenticatedRoute path="/create/forum">
          <CreateForum isAuthenticated={auth.isAuthenticated()} />
        </AuthenticatedRoute>

        <UnauthenticatedRoutes isAuthenticated={auth.isAuthenticated()} />
      </Switch>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FetchProvider>
          <AppRoutes />
        </FetchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
