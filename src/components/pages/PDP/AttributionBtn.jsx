import React, { Component } from 'react';
import { connect } from 'react-redux';

class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			colorSwatch: false,
			btnDisable: false,
			defaultChecked: true,
			itemIsChecked: false,
		};

		this.itemCheckHandler = this.itemCheckHandler.bind(this);
	}

	componentDidMount() {
		const { attributeTitle: title, className } = this.props;

		className === 'cart-items__pd'
			? this.setState({ btnDisable: true })
			: this.setState({ btnDisable: false });

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

	itemCheckHandler(index, e) {
		const attCheck = e.target.checked;
		if (this.state.btnDisable === true) {
			return;
		}

		if (index === 0) {
			this.setState({
				defaultChecked: !this.state.defaultChecked,
			});
		}

		attCheck
			? this.setState({ itemIsChecked: attCheck })
			: this.setState({ itemIsChecked: attCheck });
	}

	render() {
		const { item, className, index } = this.props;

		const { colorSwatch, btnDisable, defaultChecked, itemIsChecked } =
			this.state;

		// console.log(itemIsChecked);

		let itemBackground = colorSwatch
			? {
					backgroundColor:
						item === 'Green'
							? '#0F6450'
							: item === 'White'
							? '#D3D2D5'
							: item === 'Black'
							? '#2B2B2B'
							: item,
					minWidth: btnDisable ? '1.1rem' : '2.5rem',
					border: 'none',
			  }
			: !colorSwatch && index === 0 && defaultChecked
			? { backgroundColor: '#1D1F22', color: 'white' }
			: !colorSwatch && itemIsChecked
			? { backgroundColor: '#1D1F22', color: 'white' }
			: { backgroundColor: 'white' };

		const defaultColorChecked =
			colorSwatch && defaultChecked && index === 0
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: colorSwatch && itemIsChecked
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: { outline: 'none' };

		return (
			<li
				className={`${className}__attribution__item`}
				key={item}
				data-clicked={false}
				style={{
					...itemBackground,
					...defaultColorChecked,
					fontSize: btnDisable ? '0.834rem' : '',
				}}
			>
				<input
					type="checkbox"
					name={item}
					id={item}
					className={'attribution__item-checkbox'}
					checked={index === 0 ? defaultChecked : itemIsChecked}
					onChange={(e) => this.itemCheckHandler(index, e)}
				/>
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
