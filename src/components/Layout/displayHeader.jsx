import React, { Component } from 'react';

export default class DisplayHeader extends Component {
	render() {
		const { children } = this.props;
		return (
			<div>
				<h1 className={'display-header'}>{children}</h1>
			</div>
		);
	}
}
