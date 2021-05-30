import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateForum from './components/CreateForum';
import Navbar from './components/Navbar';
import Subject from './pages/Subject';
import Auth from './auth/Auth'

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Auth" exact component={Auth} />
        <Route path="/CreateForum" exact component={CreateForum} />
        <Route path="/Profile/:id" exact component={Profile} />
        <Route path="/Subject/:subject" exact component={Subject} />
      </Switch>
    </div>
  </Router>
);

export default App;