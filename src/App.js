// import React from 'react';

//LAYOUT
// STYLE = ROUND

// PARTS
//TITLE
// Asking for data - asks a question and moves on to the next question
// GROUP A, GROUP B on the first page
// input box for one entry
// + icon for additional box
// can we make rounded input boxes
//generate button (underneath?)

//1) print nicely - candidate/job table
// 2) print summary on the bottom
// https://www.w3schools.com/tags/tag_table.asp#:~:text=An%20HTML%20table%20consists%20of,%2C%20and%20elements.

// Colors:

import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Generate from "./Generate";
import EntityForm from "./EntityForm.react";
import Copy from "./Copy";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NameInput from "./NameInput.react";

function App() {
  // const [groupANum, setGroupANum] = useState("");
  // const [groupANumInput, setGroupANumInput] = useState("");
  // const [groupBNum, setGroupBNum] = useState("");
  const [groupANames, setGroupANames] = useState("");
  const [groupBNames, setGroupBNames] = useState("");
  const [formDisplay, setFormDisplay] = React.useState(false);
  const [state, setState] = React.useState({
    groupA: "",
    groupB: ""
  });

  function handleTitleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormDisplay(true);
    console.log(state.groupA);
    console.log(state.groupB);
    for (let i = 0; i < state.groupA; i++) {
      groupANames[i] = { index: i };
    }
  }

  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }

  function generateResult(event) {
    event.preventDefault();
    console.log(event.target.value);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch("/api/v1/generate", requestOptions)
      .then((res) => res.text())
      // .then(text => console.log(text))
      // .then(res => {
      //     this.setState({
      //         items: res
      //     })
      // })
      // .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  // return (
  //     <div>
  //         {
  //             document.queryCommandSupported('copy') &&
  //             <div>
  //                 <button onClick={copyToClipboard}>Copy</button>
  //                 {copySuccess}
  //             </div>
  //         }
  //         <form>
  //             <textarea
  //                 ref={textAreaRef}
  //                 value='Some text to copy'
  //             />
  //         </form>
  //     </div>
  // );
  // class CopyControl extends React.Component {
  //   constructor(props) {
  //     this.handleCopy = this.handleCopy.bind(this);
  //     this.handleNoCopy = this.handleNoCopy.bind(this);
  //     this.state = {showCopy: false};
  //   }

  //   handleCopy() {
  //     this.setState({showCopy: true});
  //   }

  //   handleNoCopy() {
  //     this.setState({showCopy: false});
  //   }

  //   render() {
  //     const showCopy = this.state.showCopy;
  //     let button;
  //     if (showCopy) {
  //       button = <CopyButton onClick={this.handle}
  //     }
  //   }
  // }
  // const element = <Generate />;
  // ReactDOM.render(
  //   element,
  //   document.getElementById('generate')
  // );

  const data = [
    [
      "Janani Balaji",
      "Joy Jung",
      "Tiffany Wu",
      "Niki Shakouri",
      "Kristie Diep",
      "Tasnima Naoshin"
    ],
    [
      "Alvin Xu",
      "William Arnold",
      "Grace Luo",
      "Manav Rathod",
      "Trevor Wu",
      "Ashley Chu"
    ],
    [
      "Helena Greebe",
      "Grace Luo",
      "Ashley Chu",
      "Joyce Chen",
      "Tiffany Wu",
      "Manav Rathod"
    ],
    [
      "Samantha Huang",
      "Kristie Diep",
      "Sara Susanto",
      "Wenny Miao",
      "Adarsh Anil Kumar",
      "Massimiliano de Sa"
    ]
  ];

  function Welcome() {
    return (
      <div className="App">
        {/* <header> Header </header> */}
        <body className="App-body">
          <form onSubmit={handleSubmit}>
            I want to pair
            <input
              autoComplete="off"
              type="text"
              name="groupA"
              value={state.groupA}
              onChange={handleTitleChange}
            />
            things in my first group with
            <input
              autoComplete="off"
              type="text"
              name="groupB"
              value={state.groupB}
              onChange={handleTitleChange}
            />
            things in my second group
          </form>
          <button onClick={handleSubmit}>Begin</button>

          {/* <br /> */}
          {/* <div className="centered"> */}
          {/* <br /> */}
          {/* </div> */}
          {/* <EntityForm></EntityForm> */}
        </body>
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

  function EnterName() {
    return (
      // <body className="App-body">
      // <NameInput num={this.groupANum}></NameInput>;
      // </body>
      <h>HEAD</h>
    );
  }
  var generate = React.createElement(Generate, { data: data });
  // generate.readInput(data);
  return (
    <main>
      <Switch>
        <Route path="/" component={Welcome}>
          <Welcome />
        </Route>
        <Route path="/enterName" component={EnterName}>
          <EnterName />
        </Route>
        {/* <Route path="/enterPreference" component={EnterPreference} /> */}
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
