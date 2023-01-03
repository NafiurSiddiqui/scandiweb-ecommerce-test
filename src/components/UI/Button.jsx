import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const { className, children, disable, onClick } = this.props;

		const stockGuard = disable === false ? true : false;

		return (
			<button
				type={'button'}
				className={`btn ${className || ''} ${stockGuard ? 'btnDisable' : ''} `}
				disabled={stockGuard}
				onClick={onClick || null}
			>
				{children}
			</button>
		);
	}
}
