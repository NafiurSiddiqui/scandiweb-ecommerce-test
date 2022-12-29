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
		};
		this.toggleItemState = this.toggleItemState.bind(this);
		this.defaultCheckHandler = this.defaultCheckHandler.bind(this);
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

	toggleItemState(e) {
		const { getSelectedValues } = this.props;

		// const selectedValues = {id:};
		console.log(e.target.parentNode.innerText);
		console.log(e.target.checked);
		// getSelectedValues();
		if (this.state.btnDisable === true) {
			return;
		}

		e.target.checked
			? this.setState({
					itemIsClicked: true,
			  })
			: this.setState({
					itemIsClicked: false,
			  });
	}

	defaultCheckHandler(index) {
		if (index === 0) {
			this.setState({
				defaultChecked: !this.state.defaultChecked,
			});
		}
		return;
	}

	render() {
		const { item, className, index } = this.props;

		const { colorSwatch, itemIsClicked, btnDisable, defaultChecked } =
			this.state;

		// console.log(defaultChecked);

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
						minWidth: btnDisable ? '1.1rem' : '2.5rem',
						border: 'none',
				  }
				: !colorSwatch && defaultChecked && index === 0
				? { backgroundColor: '#1D1F22', color: 'white' }
				: !colorSwatch && itemIsClicked && index
				? {
						backgroundColor: '#1D1F22',
						color: 'white',
				  }
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
				onClick={(e) => this.toggleItemState(e)}
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
					defaultChecked={index === 0 ? true : false}
					onChange={() => this.defaultCheckHandler(index)}
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
