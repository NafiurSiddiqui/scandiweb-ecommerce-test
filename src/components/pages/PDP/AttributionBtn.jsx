import React, { Component } from 'react';
import { connect } from 'react-redux';

class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			itemIsClicked: false,
			colorSwatch: false,
			defaultChecked: true,
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
		const { item, className, index } = this.props;
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
				: !colorSwatch && !itemIsClicked && index === 0
				? { backgroundColor: '#1D1F22', color: 'white' }
				: !colorSwatch && itemIsClicked && index
				? { backgroundColor: '#1D1F22', color: 'white' }
				: { backgroundColor: 'white' };

		const defaultColor =
			colorSwatch && !itemIsClicked && index === 0
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: colorSwatch && itemIsClicked && index
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: { outline: 'none' };

		return (
			<li
				className={`${className}__attribution__item`}
				key={item}
				data-clicked={false}
				onClick={(e) => this.toggleItemState(e)}
				style={{ ...itemBackground, ...defaultColor }}
			>
				<input type="checkbox" name="attributeItem" id="attributeItem" />
				{colorSwatch ? '' : item}
			</li>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.category.productID,
		products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AttributionBtn);
