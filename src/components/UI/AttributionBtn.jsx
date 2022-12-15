import React, { Component } from 'react';

export default class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			itemIsClicked: false,
		};
		this.toggleItemState = this.toggleItemState.bind(this);
	}

	toggleItemState(e, stateItem) {
		// e.target.dataset.clicked = this.state.itemIsClicked;

		this.setState((prev) => ({
			itemIsClicked: !prev.itemIsClicked,
		}));
		console.log(e.target.checked);
		// e.target.dataset.clicked = stateItem;
	}

	render() {
		const { itemMatched, onClick, item, propsKey } = this.props;
		// console.log(`STATE: ${this.state.itemIsClicked}`);
		return (
			<li
				className={`pd__attribution__item ${itemMatched ? 'itemActive' : ''}`}
				// className={`pd__attribution__item`}
				role={'button'}
				key={item}
				data-clicked={false}
				onClick={(e) => this.toggleItemState(e)}
				style={{ position: 'relative', textAlign: 'center' }}
			>
				<input
					type="checkbox"
					name="attributeItem"
					id="attributeItem"
					style={{
						position: 'absolute',
						zIndex: '2',
						backgroundColor: 'cyan',
						width: '100%',
						height: '2rem',
						left: '-0.2rem',
						top: '-0.01rem',
						border: '3px solid blue',
						cursor: 'pointer',
						opacity: '0',
					}}
				/>
				{item}
			</li>
		);
	}
}
