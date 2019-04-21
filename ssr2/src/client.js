import React from "react";
import ReactDOM from "react-dom";

import Start from "./app/Start";

const app = document.getElementById( "app" );
ReactDOM.hydrate( <Start />, app );
