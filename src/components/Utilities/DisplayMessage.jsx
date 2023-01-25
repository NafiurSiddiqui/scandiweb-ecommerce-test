import React, { Component } from 'react';

export default class DisplayMessage extends Component {
	render() {
		const { children, error } = this.props;
		return (
			<p
				className="displayMessage"
				style={{ borderTop: `4px solid ${error ? '#ff9191' : '#ffd891'} ` }}
			>
				{children}
			</p>
		);
	}
}
