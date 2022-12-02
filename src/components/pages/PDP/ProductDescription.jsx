import React, { Component } from 'react';
import DescriptionCard from '../../UI/DescriptionCard';
import Button from '../../UI/Button';

/**
 * @className - 'PDP' = product description
 */

class ProductDescription extends Component {
	render() {
		return (
			<section className="pdp">
				<div className="pdp-image">
					<div className="pdp-image-gallery">image gallery</div>

					<div className="pdp-hero-image">hero image</div>
				</div>
				<DescriptionCard />
				<Button>ADD TO CART</Button>
				<p className="pd__description">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
					voluptates! Voluptas facere cupiditate reprehenderit cum quo libero,
					aliquid fuga obcaecati.
				</p>
			</section>
		);
	}
}

export default ProductDescription;
