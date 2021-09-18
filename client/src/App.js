import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/dashboard"
import Written from "./pages/written"
import Quiz from "./pages/quiz"
import Answers from "./pages/answers";


function App() {
  return <BrowserRouter>
    <Switch>
      <Route path="/" component={IndexPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="/written" component={Written} exact />
      <Route path="/quiz" component={Quiz} exact />
      <Route path="/answer" component={Answers} exact />
    </Switch>
  </BrowserRouter>;
}

export default App;
