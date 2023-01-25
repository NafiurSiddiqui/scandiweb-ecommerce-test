import React, { Component } from 'react';

export default class displayHeader extends Component {
	render() {
		const { className, children } = this.props;
		return (
			<div>
				<h1 className={className}>{children}</h1>
			</div>
		);
	}
}
