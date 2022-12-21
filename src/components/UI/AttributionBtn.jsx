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
		const { item, className } = this.props;
		const { colorSwatch, itemIsClicked } = this.state;

		let itemBackground =
			colorSwatch === true
				? {
						backgroundColor:
							item === 'Green'
								? '#0F6450'
								: item === 'White'
								? '#D3D2D5'
								: item === 'Black'
								? '#2B2B2B'
								: item,
						minWidth: '2.5rem',
						border: 'none',
				  }
				: !colorSwatch && itemIsClicked
				? { backgroundColor: '#1D1F22', color: 'white' }
				: { backgroundColor: 'white' };

		const colorItemIsSelected =
			colorSwatch && itemIsClicked
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: { outline: 'none' };

		return (
			<li
				className={`${className}__attribution__item`}
				key={item}
				data-clicked={false}
				onClick={(e) => this.toggleItemState(e)}
				style={{ ...itemBackground, ...colorItemIsSelected }}
			>
				<input type="checkbox" name="attributeItem" id="attributeItem" />
				{colorSwatch ? '' : item}
			</li>
		);
	}
}
