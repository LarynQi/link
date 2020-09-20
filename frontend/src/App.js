import React from 'react';
import logo from './logo.svg';
import './App.css';
import EntityForm from "./EntityForm.react";
import { useState } from "react";

function App() {

  const [groupANum, setGroupANum] = useState("");
  const [groupBNum, setGroupBNum] = useState("");
  const [groupANames, setGroupANames] = useState("");
  const [groupBNames, setGroupBNames] = useState("");
  const [formDisplay, setFormDisplay] = React.useState(false);
  const [state, setState] = React.useState({
    groupA: "",
    groupB: ""
  })
  function handleTitleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
    // setGroupANum(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormDisplay(true)
    for (let i = 0; i < groupANum; i++) {
      groupANames[i] = {index : i};
    }
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <button onclick={window.generate()}>Generate</button> */}
        {/* <button onclick="window.location.href='/generate'">Generate</button> */}
        <form action="/generate">
          <input type="submit" value="Generate" />
        </form>
        <p>Generation = {window.token}</p>
        {/* <div className="text">{window.token}</div> */}
        {/* <div>
          {window.token[0]}
        </div> */}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
            I want to pair 
            <input
              autoComplete="off"
              type="text"
              name="groupA"
              value={state.groupA}
              // onChange={(e) => this.handleTitleChange(setGroupANum, e)}
              // onChange={e => this.handleTitleChange(setGroupANum, e)}
              onChange={handleTitleChange}
            />
            things in my first group with 
            <input
              autoComplete="off"
              type="text"
              name="groupB"
              value={state.groupB}
              // onChange={(e) => this.handleTitleChange(setGroupBNum, e)}
              onChange={handleTitleChange}
            />
            things in my second group 
          </form>
          <button onClick={handleSubmit}>Begin</button>
          <EntityForm></EntityForm>
      </div>
      {/* <div className={formDisplay ? "list" : null}>
        Enter names of entities in the first group
        {Object.keys(groupANames).map((key) => {
          const name = groupANames[key];
          return (
            <NameInput
              index={groupANames.index}
            />
          );
        })}
      </div> */}


      
    </div>
  );
}

export default App;
