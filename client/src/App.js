import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
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
        <Route path="/Auth" exact component={Auth} />
        <Route path="/CreateForum" exact component={CreateForum} />
        <Route path="/Profile" exact component={Profile} />
        <Route path="/Subject" exact component={Subject} />
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