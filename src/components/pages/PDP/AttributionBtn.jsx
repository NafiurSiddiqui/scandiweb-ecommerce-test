import React, { Component } from 'react';
import { connect } from 'react-redux';

class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			colorSwatch: false, //!KEEP
			btnDisable: false, //!KEEP
		};

		this.btnCheckHandler = this.btnCheckHandler.bind(this);
	}

	componentDidMount() {
		const { attHeader, className } = this.props;

		className === 'cart-items__pd'
			? this.setState({ btnDisable: true })
			: this.setState({ btnDisable: false });

		if (attHeader === 'Color') {
			this.setState({
				colorSwatch: true,
			});
		} else {
			this.setState({
				colorSwatch: false,
			});
		}
	}

	btnCheckHandler(e) {
		const { itemValuesHandler, removeValuesHandler, itemCheckHandler } =
			this.props;

		const attCheck = e.target.checked;
		const attValue = e.target.value;

		if (this.state.btnDisable === true) {
			return;
		}

		itemCheckHandler(attValue);

		// if (attCheck) {
		// 	itemValuesHandler(attValue);
		// } else {
		// 	removeValuesHandler(attValue);
		// }

		attCheck ? itemValuesHandler(attValue) : removeValuesHandler(attValue);
	}

	render() {
		const { item, className, index, itemIsChecked } = this.props;

		const { colorSwatch, btnDisable } = this.state;

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
			: !colorSwatch && itemIsChecked
			? { backgroundColor: '#1D1F22', color: 'white' }
			: { backgroundColor: 'white' };

		const defaultColorChecked =
			colorSwatch && itemIsChecked
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: { outline: 'none' };

		return (
			<li
				className={`${className}__attribution__item`}
				key={item}
				style={{
					...itemBackground,
					...defaultColorChecked,
					fontSize: btnDisable ? '0.834rem' : '',
				}}
			>
				<label htmlFor="item">{colorSwatch ? '' : item}</label>
				<input
					type="checkbox"
					name={item}
					id={item}
					value={item}
					className={'attribution__item-checkbox'}
					checked={itemIsChecked}
					onChange={(e) => this.btnCheckHandler(e)}
				/>
			</li>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.products.productID,
		products: state.products,
		selectedCurrency: state.currency.selectedCurrency,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AttributionBtn);
