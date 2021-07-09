import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import Main from "./Main";


function App() {
  /*const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  */
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
              path="/"
              exact
              render={(props) => (
                  <Main
                      {...props}
                  />
              )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
