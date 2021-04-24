import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from './pages/Login';
import CreateForum from './pages/CreateForum';
import Navbar from './component/Navbar';
import Subject from './pages/Subject';

function App() {
  return (
    <>
      {/* <Header/> */}
      <Navbar/>

      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create">
            <CreateForum />
          </Route>
          <Route path="/subject">
            <Subject />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
