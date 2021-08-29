import React, { Component } from 'react';
import './style.css';
import Score from './Score.js';
import Board from './Board';
import Restart from './Restart'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: []
		};
	}
	render() {
		return (
			<div>
				<div>
					<Score />
					<Restart />
				</div>
				<div>
					<Board />
				</div>
			</div>
		);
	}
}

export default App;