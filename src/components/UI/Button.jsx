import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		return (
			<button type={'button'} className={`btn ${this.props.className || ''}`}>
				{this.props.children}
			</button>
		);
	}
}
