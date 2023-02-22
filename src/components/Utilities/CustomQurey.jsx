import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import DisplayMessage from './DisplayMessage';
import Skeleton from '../Layout/skeleton';

export default function customQuery(WrappedComponent, query, ...props) {
	return class extends Component {
		render() {
			return (
				<Query query={query}>
					{({ error, loading, data }) => {
						if (error) return <DisplayMessage error={error} />;
						if (loading || !data) return <Skeleton />;
						return <WrappedComponent data={data} {...props} />;
					}}
				</Query>
			);
		}
	};
}
