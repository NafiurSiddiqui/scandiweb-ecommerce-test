import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedProduct } from '../../store/productsSlice';
import AttributionBtn from './AttributionBtn';

class AttributeItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			itemValues: [],
			btnItems: [],
		};
		this.itemValuesHandler = this.itemValuesHandler.bind(this);
		this.itemHeaderHandler = this.itemHeaderHandler.bind(this);
		this.removeValuesHandler = this.removeValuesHandler.bind(this);
		this.itemCheckHandler = this.itemCheckHandler.bind(this);
	}

	componentDidMount() {
		//Get the attributes
		const { attributesItem } = this.props;

		//set the attributes to state
		this.setState({
			btnItems: attributesItem,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const { getSelectedValues } = this.props;
		const { id, itemValues } = this.state;

		// console.log(btnItems);

		if (prevState.itemValues.length !== this.state.itemValues.length) {
			getSelectedValues(id, itemValues);
			// console.log('it does');
		}
	}

	itemValuesHandler = (itemValue) => {
		this.setState((prev) => ({
			itemValues: [...prev.itemValues, itemValue],
		}));
	};

	removeValuesHandler = (itemValue) => {
		this.setState({
			itemValues: this.state.itemValues.filter((value) => value !== itemValue),
		});
	};

	itemHeaderHandler = (e, header) => {
		//dodge if item not checked
		if (!e.target.checked) return;
		//refrain from duplication
		if (this.state.id === header) return;

		this.setState({
			id: header,
		});
	};

	// ! DO not delete this handler ↙️

	itemCheckHandler(value) {
		this.setState((prevState) => ({
			btnItems: prevState.btnItems.map((item) =>
				item.value === value ? { ...item, isChecked: !item.isChecked } : item
			),
		}));
	}

	render() {
		const { itemIndex, attHeader, cartPage, className, updateItems, miniCart } =
			this.props;

		const { btnItems, itemValues } = this.state;
		// console.log(btnItems);
		// console.log(itemValues);

		return (
			<ul key={itemIndex} className={`${className}__attributions`}>
				<li
					key={attHeader}
					className={`${className}__attribution`}
					onClick={(e) => this.itemHeaderHandler(e, attHeader)}
				>
					<h4
						className={`${className}__attribution-header`}
						style={{ fontSize: cartPage ? '0.853rem' : '0.7rem' }}
					>
						{attHeader.toUpperCase()}:
					</h4>
					<ul className={`pd__attribution__items`}>
						{btnItems?.map((item, btnIndex) => {
							console.log(item);
							return (
								<AttributionBtn
									key={btnIndex}
									item={item.value}
									attHeader={attHeader}
									className={className}
									btnIndex={btnIndex}
									itemIndex={itemIndex}
									itemValuesHandler={this.itemValuesHandler}
									removeValuesHandler={this.removeValuesHandler}
									itemCheckHandler={this.itemCheckHandler}
									updateItems={updateItems}
									itemIsChecked={item.isChecked}
									miniCart={miniCart}
									cartPage={cartPage}
								/>
							);
						})}
					</ul>
				</li>
			</ul>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.products.productID,
		selectedProduct: state.products.selectedProduct,
	};
};

const mapDispatchToProps = { setSelectedProduct };

export default connect(mapStateToProps, mapDispatchToProps)(AttributeItem);
