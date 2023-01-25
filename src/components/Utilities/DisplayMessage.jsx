import React, { Component } from 'react';

export default class DisplayMessage extends Component {
	render() {
		return <p className="displayMessage">{this.props.children}</p>;
	}
}
