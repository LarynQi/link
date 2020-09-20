// import React from 'react';
import React, { useRef, useState} from 'react';

import logo from './logo.svg';
import './App.css';
import Copy from './Copy';

function App() {
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
      textAreaRef.current.select();
      document.execCommand('copy');
      e.target.focus();
      setCopySuccess('Copied!');
  };

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

        <div class="prompt"><input
            autocomplete="off"
            type="text"
          /></div>
          <div>
          {
              document.queryCommandSupported('copy') &&
              <div>
                  <button onClick={copyToClipboard}>Copy</button>
                  {copySuccess}
              </div>
          }
          <form>
              <textarea
                  ref={textAreaRef}
                  value={window.token}
              />
          </form>
      </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
