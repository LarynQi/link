import React from 'react';
import './App.css';
// https://reactjs.org/docs/faq-ajax.html
class Generate extends React.Component {
  constructor() {
      super();
      this.state = {
        error: null,
        isLoaded: false,
        items: ""
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

//   https://reactjs.org/docs/handling-events.html
  handleClick() {
    fetch("/api/v1/generate")
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
    const { error, isLoaded, items } = this.state;
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

