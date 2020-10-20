import React from 'react';
import './App.css';
// https://reactjs.org/docs/faq-ajax.html
class Generate extends React.Component {
  constructor(data) {
      super();
      this.state = {
        error: null,
        isLoaded: false,
        items: "",
        data: data
      };

      this.handleClick = this.handleClick.bind(this)
  }

//   componentDidMount() {
//       fetch("/api/v1/generate")
//         .then(res => res.text())
//         // .then(text => console.log(text))
//         // .then(res => {
//         //     this.setState({
//         //         items: res
//         //     })
//         // })
//         // .then(res => res.json())
//         .then(
//           (result) => {
//             this.setState({
//               isLoaded: true,
//               items: result
//             });
//           },
//           (error) => {
//             this.setState({
//               isLoaded: true,
//               error
//             });
//           }
//         )
//   }

readInput(input) {
    this.setState({data: input});
}

//   https://reactjs.org/docs/handling-events.html
  handleClick() {
    const { error, isLoaded, items, data } = this.state;
    var params = "";
    console.log(data);
    // for (let i = 0; i < data.length; i += 1) {
    //     params = params.concat("data=", String(data[i]), "&");
    // }
    // console.log(params);
    // params = params.substr(0, params.length - 1);
    // console.log("/api/v1/generate?" + params);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch("/api/v1/generate", requestOptions)
        .then(res => res.text())
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
        )
  }

  render() {
    const { error, isLoaded, items, data } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        // return <div>Loading...</div>
        return (
            <button onClick={this.handleClick}>
                Generate
            </button>
        )
    } else {
        return <div>Result: {items}</div>
        // return (
        //   <ul>
        //     {items}
        //   </ul>
    }
  }
}

export default Generate;

