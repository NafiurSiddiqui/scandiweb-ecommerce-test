import React, { Component } from 'react';

export default class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			itemIsClicked: false,
		};
		this.toggleItemState = this.toggleItemState.bind(this);
	}

	toggleItemState(e) {
		this.setState((prev) => ({
			itemIsClicked: !prev.itemIsClicked,
		}));

		e.target.checked
			? this.setState({
					itemIsClicked: true,
			  })
			: this.setState({
					itemIsClicked: false,
			  });
	}

	render() {
		const { itemMatched, onClick, item, propsKey } = this.props;
		console.log(`STATE: ${this.state.itemIsClicked}`);
		return (
			<li
				className={`pd__attribution__item ${
					this.state.itemIsClicked === true ? 'itemActive' : ''
				}`}
				role={'button'}
				key={item}
				data-clicked={false}
				onClick={(e) => this.toggleItemState(e)}
			>
				<input type="checkbox" name="attributeItem" id="attributeItem" />
				{item}
			</li>
		);
	}
}
