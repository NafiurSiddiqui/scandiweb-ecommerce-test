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
		};

		this.btnCheckHandler = this.btnCheckHandler.bind(this);
	}

	componentDidMount() {
		const { attributeTitle: attHeader, className } = this.props;

		const { defaultIsChecked, itemIsChecked } = this.state;

		// console.log(attHeader);

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

	componentDidUpdate(prevProps, prevState) {
		const { defaultCheckHandler } = this.props;
		const { defaultIsChecked } = this.state;

		// console.log(prevState.defaultIsChecked);

		if (prevState.defaultIsChecked !== defaultIsChecked) {
			defaultCheckHandler(defaultIsChecked);
		}
	}

	btnCheckHandler(index, e) {
		const {
			attributeTitle: attHeader,
			itemValuesHandler,
			removeValuesHandler,
			itemCheckHandler,
			productID,
			setItemCheck,
		} = this.props;

		const { selectedAttribute } = this.state;

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

		itemCheckHandler(attValue);

		if (attCheck) {
			this.setState({
				itemIsChecked: attCheck,
				selectedAttribute: attValue,
			});

			itemValuesHandler(attValue);
		} else {
			this.setState({
				itemIsChecked: attCheck,
				selectedAttribute: '',
			});

			removeValuesHandler(attValue);
		}
	}

	render() {
		const {
			item,
			className,
			index,
			attributeTitle,
			defaultValue,
			productID,
			itemIsChecked2,
		} = this.props;

		const { colorSwatch, btnDisable, defaultIsChecked, itemIsChecked } =
			this.state;

		console.log(itemIsChecked2);

		// let itemBackground = colorSwatch
		// 	? {
		// 			backgroundColor:
		// 				item === 'Green'
		// 					? '#0F6450'
		// 					: item === 'White'
		// 					? '#D3D2D5'
		// 					: item === 'Black'
		// 					? '#2B2B2B'
		// 					: item,
		// 			minWidth: btnDisable ? '1.1rem' : '2.5rem',
		// 			border: 'none',
		// 	  }
		// 	: !colorSwatch && index === 0 && defaultIsChecked
		// 	? { backgroundColor: '#1D1F22', color: 'white' }
		// 	: !colorSwatch && itemIsChecked
		// 	? { backgroundColor: '#1D1F22', color: 'white' }
		// 	: { backgroundColor: 'white' };

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
			: !colorSwatch && itemIsChecked2
			? { backgroundColor: '#1D1F22', color: 'white' }
			: { backgroundColor: 'white' };

		const defaultColorChecked =
			colorSwatch && itemIsChecked2
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
					onChange={(e) => this.btnCheckHandler(index, e)}
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
