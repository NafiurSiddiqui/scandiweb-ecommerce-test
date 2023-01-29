import React, { Component } from 'react';

/**
 * @miniCart [Boolean]
 */

export default class Button extends Component {
	render() {
		const { className, children, disable, onClick, miniCart } = this.props;

		const stockGuard = disable === false ? true : false;

		return (
			<button
				type={'button'}
				className={`btn ${className || ''} ${stockGuard ? 'btnDisable' : ''} `}
				style={{ display: miniCart ? 'none' : 'inline-block' }}
				disabled={stockGuard}
				onClick={onClick || null}
			>
				{children}
			</button>
		);
	}
}
