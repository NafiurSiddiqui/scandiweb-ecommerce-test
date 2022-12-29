import React, { Component } from 'react';

export default class overlay extends Component {
	render() {
		return (
			<div className={`modal-overlay ${this.props.className}`}>
				{this.props.children}
			</div>
		);
	}
}
