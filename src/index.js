import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./Components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { About } from "./Components/About";
import { Contact } from "./Components/Contact";
import { Page404 } from "./Components/Page404";
import { Layout } from "./Components/Layout";
import { NavBar } from "./Components/NavBar";

ReactDOM.render(
    <React.Fragment>
        <Router>
            <NavBar />
            <Layout>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route component={Page404} />
                </Switch>
            </Layout>
        </Router>
    </React.Fragment>,
    document.getElementById("root")
);
