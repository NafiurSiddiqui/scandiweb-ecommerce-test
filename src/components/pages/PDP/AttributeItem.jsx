import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../store/productsSlice';
import AttributionBtn from './AttributionBtn';

class AttributeItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// selectedProduct: {
			// 	id: this.props.productID,
			// 	itemValues: [],
			// },

			id: [],
			itemValues: [],
		};
		this.itemValuesHandler = this.itemValuesHandler.bind(this);
		this.itemHeaderHandler = this.itemHeaderHandler.bind(this);
	}

	// componentWillUpdate(nextProps, nextState) {
	// 	if (
	// 		this.state.id === nextState.id &&
	// 		this.state.itemValues.includes(...nextState.itemValues)
	// 	) {
	// 		return;
	// 	}
	// }

	componentDidMount(prevProps) {
		// const { id, attCheck } = this.state.selectedProduct;
		// const { defaultSelection } = this.props;
		//capture the selected product here for global use.
		// selectedProduct.itemValues.length === 0?
		//itemValues.length === 0?capture the default item[0]: itemValues
		// if (attCheck === false) {
		// 	this.setState({
		// 		selectedProduct: {
		// 			id: id,
		// 			itemValues: defaultSelection,
		// 		},
		// 	});
		// }
	}

	componentDidUpdate(prevProps, prevState) {
		const { setSelectedProduct } = this.props;
		const { id, itemValues } = this.state;

		// console.log(prevState.id !== );

		console.log(id, itemValues);
		console.log(prevState.id, prevState);

		// setSelectedProduct(id, itemValues);
		// console.log(prevState);
		// console.log(selectedGlobalItems);
	}

	itemValuesHandler = (itemValue) => {
		this.setState((prev) => ({
			itemValues: [...prev.itemValues, itemValue],
		}));
	};

	itemHeaderHandler = (e, header) => {
		//dodge if item not checked
		if (!e.target.checked) return;
		//refrain from duplication
		if (this.state.id.includes(header)) return;

		this.setState((prev) => ({
			id: [...prev.id, header],
		}));
	};

	render() {
		const {
			propsKey,
			element,
			attributesItem,
			className,
			getSelectedValues,
			defaultSelection,
		} = this.props;

		// console.log(defaultSelection);
		const { id, itemValues } = this.state;

		// console.log(id, itemValues);

		return (
			<ul key={propsKey} className={`${className}__attributions`}>
				<li
					key={element}
					className={`${className}__attribution`}
					onClick={(e) => this.itemHeaderHandler(e, element)}
				>
					<h4 className={`${className}__attribution-header`}>
						{element.toUpperCase()}:
					</h4>
					<ul className={`pd__attribution__items`}>
						{attributesItem[propsKey].map((item, i) => {
							return (
								<AttributionBtn
									key={item}
									item={item}
									attributeTitle={element}
									className={className}
									index={i}
									itemValuesHandler={this.itemValuesHandler}
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

const mapDispatchToProps = { setSelectedProduct };

export default connect(null, mapDispatchToProps)(AttributeItem);
