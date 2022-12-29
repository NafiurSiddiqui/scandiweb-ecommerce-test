import React, { Component } from 'react';
import { connect } from 'react-redux';

class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			itemIsClicked: false,
			colorSwatch: false,
			btnDisable: false,
			defaultChecked: true,
			itemIsChecked: false,
		};
		// this.toggleItemState = this.toggleItemState.bind(this);
		this.itemCheckHandler = this.itemCheckHandler.bind(this);
		// this.setDefaultCheck = this.setDefaultCheck.bind(this);
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

	// toggleItemState(e) {
	// 	const attValue = e.target.name;
	// 	const attCheck = e.target.checked;
	// 	if (this.state.btnDisable === true) {
	// 		return;
	// 	}

	// 	e.target.checked
	// 		? this.setState({
	// 				itemIsClicked: true,
	// 		  })
	// 		: this.setState({
	// 				itemIsClicked: false,
	// 		  });

	// 	if (attCheck) {
	// 		this.setState((prevState) => {
	// 			let newSelectedValues = [...prevState.attItems];

	// 			newSelectedValues.push(attValue);

	// 			return { attItems: newSelectedValues };
	// 		});
	// 	} else {
	// 		return;
	// 	}
	// }

	itemCheckHandler(index, e) {
		const attCheck = e.target.checked;
		if (this.state.btnDisable === true) {
			return;
		}
		console.log(attCheck);

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

		const {
			colorSwatch,
			itemIsClicked,
			btnDisable,
			defaultChecked,
			attItems,
			itemIsChecked,
		} = this.state;

		// console.log(itemIsChecked);

		// let itemBackground =
		// 	colorSwatch === true
		// 		? {
		// 				backgroundColor:
		// 					item === 'Green'
		// 						? '#0F6450'
		// 						: item === 'White'
		// 						? '#D3D2D5'
		// 						: item === 'Black'
		// 						? '#2B2B2B'
		// 						: item,
		// 				minWidth: btnDisable ? '1.1rem' : '2.5rem',
		// 				border: 'none',
		// 		  }
		// 		: !colorSwatch && defaultChecked && index === 0
		// 		? { backgroundColor: '#1D1F22', color: 'white' }
		// 		: !colorSwatch && itemIsClicked && index
		// 		? {
		// 				backgroundColor: '#1D1F22',
		// 				color: 'white',
		// 		  }
		// 		: { backgroundColor: 'white' };

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
				: colorSwatch && itemIsClicked && index
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: { outline: 'none' };

		return (
			<li
				className={`${className}__attribution__item`}
				key={item}
				data-clicked={false}
				// onClick={(e) => this.toggleItemState(e)}
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
					// defaultChecked={index === 0 ? this.setDefaultCheck : false}
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
