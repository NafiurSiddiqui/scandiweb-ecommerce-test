import React, { Component } from 'react';

export default class ContentWrapper extends Component {
	render() {
		return <section className="content-wrapper">{this.props.children}</section>;
	}
}
