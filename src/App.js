import React, { Component } from 'react';
import './style.css';
import Score from './Score.js';
import Board from './Board';
import Restart from './Restart'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
		};
		this.calcScore = this.calcScore.bind(this);
		this.updateBest = this.updateBest.bind(this);
	}

	calcScore(point) {
		const score = this.state.score;
		this.setState({
			score: score + point
		});
	}

	updateBest() {
		if (localStorage.getItem('best') === null) localStorage.setItem('best', 0);
		if (Number(localStorage.getItem('best')) < this.state.score) {
			localStorage.setItem('best', this.state.score);
		}
	}

	render() {
		return (
			<div>
				<div>
					<Score score={this.state.score} best={localStorage.getItem('best')} />
					<Restart />
				</div>
				<div>
					<Board calcScore={this.calcScore} updateBest={this.updateBest} />
				</div>
			</div>
		);
	}
}

export default App;