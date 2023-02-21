import { NavLink, useMatch } from 'react-router-dom';

export const CustomNavLink = (props) => {
	const match = useMatch(props.to);
	return (
		<NavLink to={props.to} className={match ? 'active' : ''}>
			{props.children}
		</NavLink>
	);
};
