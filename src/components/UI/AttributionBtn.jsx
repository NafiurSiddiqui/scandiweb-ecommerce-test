import React, { Component } from 'react';

export default class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			itemIsClicked: false,
			colorSwatch: false,
		};
		this.toggleItemState = this.toggleItemState.bind(this);
	}

	componentDidMount() {
		const { attributeTitle: title } = this.props;

		if (title === 'Color') {
			this.setState({
				colorSwatch: true,
			});
		} else {
			this.setState({
				colorSwatch: false,
			});
		}
	}

	toggleItemState(e) {
		e.target.checked
			? this.setState({
					itemIsClicked: true,
			  })
			: this.setState({
					itemIsClicked: false,
			  });
	}

	render() {
		const { item } = this.props;
		const { colorSwatch, itemColor, itemIsClicked } = this.state;
		// console.log(colorSwatch, itemColor);
		const colors = ['Green', 'Cyan', 'Blue', 'Black', 'White'];
		let itemBackground =
			colorSwatch === true
				? { backgroundColor: item, minWidth: '2.5rem', margin: '0 0.2rem' }
				: { backgroundColor: 'none' };

		return (
			<li
				className={`pd__attribution__item`}
				role={'button'}
				key={item}
				data-clicked={false}
				onClick={(e) => this.toggleItemState(e)}
				style={itemBackground}
			>
				<input type="checkbox" name="attributeItem" id="attributeItem" />
				{colorSwatch ? '' : item}
			</li>
		);
	}
}
