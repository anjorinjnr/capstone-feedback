import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./Home";
import Signup from "./Signup"
import Login from "./Login"
import CreateProject from "./CreateProject"
import Project from "./Project"

function App() {
  return (
    <Router>
      <switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route> 

        <Route path="/login">
          <Login />
        </Route>

        <Route exact path="/projects/submit">
          <CreateProject />
        </Route>

        <Route exact path="/projects/:id">
          <Project/>
        </Route>      

      </switch>
    </Router>    
  )
}

export default App;