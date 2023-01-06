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
			defaultState: true,
		};
		this.itemValuesHandler = this.itemValuesHandler.bind(this);
		this.itemHeaderHandler = this.itemHeaderHandler.bind(this);
		this.removeValuesHandler = this.removeValuesHandler.bind(this);
		this.itemCheckHandler = this.itemCheckHandler.bind(this);
		this.defaultCheckHandler = this.defaultCheckHandler.bind(this);
	}

	componentDidMount() {
		//Get the attributes
		const { attributes, propsKey, attHeader, attributesItem } = this.props;

		//map the attributes
		// const mappedAttributes = Object.entries(attributes[attHeader]).map(
		// 	(item, i) => ({
		// 		title: attHeader,
		// 		items: item[1],
		// 	})
		// );

		// const defaultMapped = attributesItem.map((item, i) =>
		// 	i === 0 ? { ...item.values , item.isChecked true } : attributesItem
		// );
		// console.log();
		// console.log(attributes);
		// console.log(mappedAttributes);

		//set the attributes to state
		this.setState({
			items: attributesItem,
			// items: defaultMapped,
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

	defaultCheckHandler(defaultIsChecked) {
		//get the value
		console.log(defaultIsChecked);

		//set the value to state
		this.setState({
			defaultState: defaultIsChecked,
		});
	}

	itemCheckHandler(value) {
		// console.log();
	}

	render() {
		const {
			propsKey,
			attHeader,
			attributesItem,
			attributes,
			className,
			getSelectedValues,
			defaultSelection,
			selectedProduct,
		} = this.props;

		const { id, itemValues, items } = this.state;

		// const itemsMapped = items
		// 	.map((item) => item.items)
		// 	.map((item) => item.map((item) => item.values));

		// const test = items.map((item) => item.items.map((item) => item.values));

		console.log(items);
		// console.log(attributesItem[propsKey].map((item) => item));
		// console.log(attributes);

		const mappedItems = attributesItem.map((item) => item.values);
		const mappedItemCheck = attributesItem.map((item) => item.isChecked);
		// console.log(mappedItems);
		// console.log(mappedItemCheck);

		// console.log(items);

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
									item={item.values}
									attributeTitle={attHeader}
									className={className}
									index={i}
									itemValuesHandler={this.itemValuesHandler}
									removeValuesHandler={this.removeValuesHandler}
									itemCheckHandler={this.itemCheckHandler}
									defaultCheckHandler={this.defaultCheckHandler}
									itemIsChecked={item.isChecked}
									defaultValue={attributesItem}
								/>
							);
						})}

						{/* {mappedItems.map((item, i) => {
							return (
								<AttributionBtn
									key={i}
									item={item}
									attributeTitle={attHeader}
									className={className}
									index={i}
									itemValuesHandler={this.itemValuesHandler}
									removeValuesHandler={this.removeValuesHandler}
									itemIsChecked={mappedItemCheck[i]}
									defaultValue={attributesItem}
								/>
							);
						})} */}

						{/* {attributesItem[propsKey].map((item, i) => {
							return (
								<AttributionBtn
									key={item}
									item={item}
									attributeTitle={attHeader}
									className={className}
									index={i}
									itemValuesHandler={this.itemValuesHandler}
									removeValuesHandler={this.removeValuesHandler}
									defaultValue={attributesItem}
								/>
							);
						})} */}
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
