import React, { Component } from 'react';
import { render } from 'react-dom';

export default class ContentWrapper extends Component {
	render() {
		return <section className="content-wrapper">{this.props.children}</section>;
	}
}
