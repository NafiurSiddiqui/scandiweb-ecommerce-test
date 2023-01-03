import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const { className, children, disable, onClick, cartItem } = this.props;

		const stockGuard = disable === false ? true : false;

		return (
			<button
				type={'button'}
				className={`btn ${className || ''} ${stockGuard ? 'btnDisable' : ''} `}
				style={{ display: cartItem ? 'none' : 'inline-block' }}
				disabled={stockGuard}
				onClick={onClick || null}
			>
				{children}
			</button>
		);
	}
}
