import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";
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
        <Route path="/Profile" exact component={Profile} />
        <Route path="/Subject/:subject" exact component={Subject} />
      </Switch>
    </div>
  </Router>
);

// function App() {
//   return (
//     <>
//       {/* <Header/> */}
//       <Navbar/>

//       <Router>
//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route path="/profile">
//             <Profile />
//           </Route>
//           <Route path="/SignUp">
//             <SignUp />
//           </Route>
//           <Route path="/create">
//             <CreateForum />
//           </Route>
//           <Route path="/subject">
//             <Subject />
//           </Route>
//           {/* <Route path="/dashboard">
//             <Dashboard />
//           </Route> */}
//         </Switch>
//       </Router>
//     </>
//   );
// }

export default App;