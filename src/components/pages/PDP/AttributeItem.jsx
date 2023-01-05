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
	}

	componentDidMount() {
		//Get the attributes
		const { attributes } = this.props;

		//map the attributes
		const mappedAttributes = Object.entries(attributes).map((item, i) => ({
			title: item[0],
			items: item[1],
		}));

		// console.log(mappedAttributes);

		//set the attributes to state
		this.setState({
			items: mappedAttributes,
		});
		// console.log('Mounted');
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

	itemIsChecked(e) {
		console.log(e);
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

		const itemsMapped = items
			.map((item) => item.items)
			.map((item) => item.map((item) => item.values));

		const test = items.map((item) => item.items.map((item) => item.values));

		console.log(test[propsKey]);
		// console.log(attributesItem[propsKey].map((item) => item));
		console.log(attributesItem[propsKey]);

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
						{/* {console.log(
							Object.entries(attributes)[propsKey][1].map((item, i) => {
								return item.values;
							})
						)} */}

						{itemsMapped.map((item, i) => {
							return (
								<AttributionBtn
									key={i}
									item={item}
									attributeTitle={attHeader}
									className={className}
									index={i}
									itemValuesHandler={this.itemValuesHandler}
									removeValuesHandler={this.removeValuesHandler}
									defaultValue={attributesItem}
								/>
							);
						})}

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
