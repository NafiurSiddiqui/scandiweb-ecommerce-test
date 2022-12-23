import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const { className, children, disable } = this.props;

		const stockGuard = disable === false ? true : false;
		console.log(stockGuard);
		return (
			<button
				type={'button'}
				className={`btn ${className || ''} ${stockGuard ? 'btnDisable' : ''} `}
				disabled={stockGuard}
			>
				{children}
			</button>
		);
	}
}
