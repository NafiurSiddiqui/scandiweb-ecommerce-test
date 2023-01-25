import React, { Component } from 'react';

export default class DisplayMessage extends Component {
	render() {
		const { children, error } = this.props;
		return (
			<p
				className="displayMessage"
				style={{
					borderTop: `4px solid ${error ? '#ff9191' : '#ffd891'} `,
					margin: error ? '4rem' : '3rem 0',
				}}
			>
				{children}
			</p>
		);
	}
}
