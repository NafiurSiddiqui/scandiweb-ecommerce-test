import React from 'react';
import { ReactDOM } from 'react';

export default class ModalContainer extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.getElementById('div');
	}

	render() {
		return <div className="modal-container">{this.props.children}</div>;
	}
}
