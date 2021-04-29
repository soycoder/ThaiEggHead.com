import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from './pages/SignUp';
import CreateForum from './pages/CreateForum';
import Navbar from './components/Navbar';
import Subject from './pages/Subject';
import Auth from './auth/Auth'

import { Container } from '@material-ui/core';


const App = () => (
  <Router>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/Auth" exact component={Auth} />
      </Switch>
    </Container>
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
