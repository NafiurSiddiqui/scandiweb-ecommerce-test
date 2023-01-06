import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../store/productsSlice';
import AttributionBtn from './AttributionBtn';

class AttributeItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			itemValues: [],
			items: [],
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
			items: attributesItem,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		const { getSelectedValues } = this.props;
		const { id, itemValues } = this.state;

		if (prevState.itemValues.length !== this.state.itemValues.length) {
			getSelectedValues(id, itemValues);
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
			items: prevState.items.map((item) =>
				item.value === value ? { ...item, isChecked: !item.isChecked } : item
			),
		}));
	}

	render() {
		const { propsKey, attHeader, attributesItem, className } = this.props;

		const { items } = this.state;

		return (
			<ul key={propsKey} className={`${className}__attributions`}>
				<li
					key={attHeader}
					className={`${className}__attribution`}
					onClick={(e) => this.itemHeaderHandler(e, attHeader)}
				>
					<h4 className={`${className}__attribution-header`}>
						{attHeader.toUpperCase()}:
					</h4>
					<ul className={`pd__attribution__items`}>
						{items.map((item, i) => {
							return (
								<AttributionBtn
									key={i}
									item={item.value}
									attHeader={attHeader}
									className={className}
									index={i}
									itemValuesHandler={this.itemValuesHandler}
									removeValuesHandler={this.removeValuesHandler}
									itemCheckHandler={this.itemCheckHandler}
									itemIsChecked={item.isChecked}
									defaultValue={attributesItem}
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
