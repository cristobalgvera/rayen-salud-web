import React from "react";
import {Route, Switch} from "react-router";
import Home from "../containers/Home";
import Tutorial from "../containers/Tutorial";

const Routes = () => {
    return (
        <Switch>
            <Route path={"/tutoriales"} component={Home} exact/>
            <Route path={"/agregar-tutorial"} component={Tutorial} exact/>
            <Route path={"/editar-tutorial"} component={Tutorial} exact/>
            <Route path={"/"} component={Home}/>
        </Switch>
    );
};

export default Routes;