import React, { Component } from 'react';

export default class Form extends Component {

  constructor() {
    super();
    this.state = {
      result: ''
    };
  }

  convert = () => {
    return
  }

  render() {
    const { result } = this.state;
    return (
      <div>
        <form>
          <div>
            <label>3MLE file <input type="file" onChange={e => e} /></label>
          </div>
          <div>
            <button onClick={this.convert}>Generate MS2MML</button>
          </div>
          <span>{result}</span>
        </form>
      </div>
    )
  }

}