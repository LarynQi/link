<header className="App-header">
    {/* <img src={logo} className="App-logo" alt="logo" /> */}
    <p>{/* Edit <code>src/App.js</code> and save to reload. */}</p>
    <p>
        {" "}
        Please enter the number of jobs and candidates you would like to
        match. [TEST] {" "}
    </p>
    {/* <button onclick={window.generate()}>Generate</button> */}
    {/* <button onclick="window.location.href='/generate'">Generate</button> */}
    <form action="/generate">
        <input class="generate" type="submit" value="Generate" />
    </form>
    <p>Generation = {window.token}</p>
    {/* <div className="text">{window.token}</div> */}
    {/* <div>
        {window.token[0]}
    </div> */}
    <Generate data={data}/>
    {/* <form action="/api/v1/generate" method="POST"> */}
    {/* https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs */}
    <form onSubmit={generateResult}>
        Data 1: <input type="text" name="in1"></input>
        Data 2: <input type="text" name="in2"></input>
        Data 3: <input type="text" name="in3"></input>
        <input type="submit" value="Submit"></input>
    </form>
    {/* {React.render(generate)} */}
    <div class="prompt">
        <input autocomplete="off" type="text" />
    </div>
    <div>
        {document.queryCommandSupported("copy") && (
        <div>
            <button onClick={copyToClipboard}>Copy</button>
            {copySuccess}
        </div>
        )}
        <form>
        <textarea ref={textAreaRef} value={window.token} />
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