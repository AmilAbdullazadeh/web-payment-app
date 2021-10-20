import './styles/global.css';
import { HashRouter as Router, Route } from "react-router-dom";


function App() {
  return (
      <Router>
        <div className="App">
          <Route path="/" component={HomeScreen} exact />
        </div>
      </Router>
  );
}

export default App;
