import React from "react";
import styled from "@emotion/styled";
import { Spring } from "react-spring";
import { Transition } from "react-spring";
import { Trail } from "react-spring";
import axios from 'axios'

class App extends React.Component {
  componentDidMount() {
    axios.get("/api/values/current").then(res => console.log(res))
  }

  render () {
    console.log("Render");
    
    
    return <h1>Hello</h1>
  }
}

export default App;
