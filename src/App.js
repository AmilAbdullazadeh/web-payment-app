import './styles/global.css';
import {HashRouter as Router, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProviderScreen from "./screens/ProviderScreen";
import FormScreen from "./screens/FormScreen";
import ReceiptScreen from "./screens/ReceiptScreen";

import {FormContext} from "./contexts/FormContext";


function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" component={HomeScreen} exact/>
                <Route path="/category/:id" component={ProviderScreen}/>

                {/*<FormContext.Provider value={} >*/}
                    <Route path="/form/:categoryId/:providerId" component={FormScreen}/>
                    <Route path="/receipt" component={ReceiptScreen}/>
                {/*</FormContext.Provider>*/}
            </div>
        </Router>
    );
}

export default App;
