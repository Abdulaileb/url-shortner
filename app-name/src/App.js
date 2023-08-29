import  { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // it's responsible fr all routing 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form form "./components/Form";


function App() {
  return (
   <div className="App">
      <div className="auth-wrapper">
          <div className="auth-inner">
              <switch>
                <Route exact path='/' component={Form} /> 
                <Route path="/app" component={Form} />          
              </switch>
          </div>
      </div>
   </div>
  );
}

export default App;
