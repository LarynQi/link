import React from "react";
import "./App.css";
import { useState } from "react";

class EntityForm extends React.Component {
  constructor() {
    super();
    this.state = {
      names: [{name: ""}]
    }
  }


handleNameChange = index => evt => {
  const newEntities = this.state.entities.map((entity, sindex) => {
    if (index != sindex) return entity;
    return {... entity}
  });

  this.setState({entities: newEntities})
}

handleSubmit = evt => {
  const { entities } = this.state;
};

handleAddEntity = () => {
  this.setState({
    entities: this.state.entities.concat([{name: ""}])
  });
};

handleRemoveEntity = index => () => {
  this.setState({
    entities: this.state.entities.filter((s, sindex) => index !== sindex)
  });
};

render() {
  return (
    <form onSubmit={this.handleSubmit}>
      {this.state.entities.map((entity, index) => (
        <div>
          <input
            type="text"
            placeholder={'Entity #${index + 1}'}
            value = {entity.name}
            onChange = {this.handleNameChange(index)}
            />
            <button 
              type="button"
              onClick={this.handleRemoveEntity(index)}
              className="small"
              >
            -
            </button>
        </div>
      ))}
      <button 
        type="button"
        onClick={this.handleAddEntity}
        className="small"
        >
          Add Entity
        </button>
        <button>Continue</button>
    </form>
  );
      }
}

  

export default EntityForm;
