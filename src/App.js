import './styles/global.css';
import {HashRouter as Router, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProviderScreen from "./screens/ProviderScreen";
import FormScreen from "./screens/FormScreen";

import {categoryList, CategoryListContext} from "./contexts/CategoryListContext";


function App() {
    return (
        <Router>
            <div className="App">
                <CategoryListContext.Provider value={categoryList}>
                    <Route path="/" component={HomeScreen} exact/>
                    <Route path="/category/:id" component={ProviderScreen}/>
                    <Route path="/form/:categoryId/:providerId" component={FormScreen}/>
                </CategoryListContext.Provider>
            </div>
        </Router>
    )
        ;
}

export default App;
