import React, { Component } from 'react';
import { connect } from 'react-redux';

class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			colorSwatch: false,
			btnDisable: false,
			defaultIsChecked: true,
			itemIsChecked: false,
			selectedAttribute: '',
		};

		this.itemCheckHandler = this.itemCheckHandler.bind(this);
	}

	componentDidMount() {
		const { attributeTitle: attHeader, className } = this.props;

		const { defaultIsChecked, itemIsChecked } = this.state;

		// console.log(attHeader);

		//run a check if the itemIsChecked or not
		// console.log(this.state.itemIsChecked);
		//which index of the item isChecked?

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

		/**
		 * @settingSelectedValues : default and clickedState
		 * 	defaultISChecked && itemIsNotchecked
		 * set default values for items
		 * else, set the checkedValue
		 */

		// if (defaultIsChecked && !itemIsChecked) {
		// 	this.setState({
		// 		selectedAttribute:
		// 	});
		// }
	}

	componentDidUpdate() {
		// console.log(this.state.itemIsChecked);
	}

	itemCheckHandler(index, e) {
		const { attributeTitle: attHeader, itemCheckHandler } = this.props;

		const attCheck = e.target.checked;
		const attValue = e.target.value;

		if (this.state.btnDisable === true) {
			return;
		}

		if (index === 0) {
			this.setState({
				defaultIsChecked: !this.state.defaultIsChecked,
			});
		}

		if (attCheck) {
			this.setState({
				itemIsChecked: attCheck,
				selectedAttribute: attValue,
			});

			itemCheckHandler(attValue);
		} else {
			this.setState({ itemIsChecked: attCheck, selectedAttribute: 'default' });
			// itemCheckHandler()
		}
	}

	render() {
		const { item, className, index, attributeTitle, defaultValue } = this.props;

		// console.log(this.state.selectedAttribute);

		const {
			colorSwatch,
			btnDisable,
			defaultIsChecked,
			itemIsChecked,
			selectedAttribute,
		} = this.state;

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
			: !colorSwatch && index === 0 && defaultIsChecked
			? { backgroundColor: '#1D1F22', color: 'white' }
			: !colorSwatch && itemIsChecked
			? { backgroundColor: '#1D1F22', color: 'white' }
			: { backgroundColor: 'white' };

		const defaultColorChecked =
			colorSwatch && defaultIsChecked && index === 0
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: colorSwatch && itemIsChecked
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
					checked={index === 0 ? defaultIsChecked : itemIsChecked}
					onChange={(e) => this.itemCheckHandler(index, e)}
				/>
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
