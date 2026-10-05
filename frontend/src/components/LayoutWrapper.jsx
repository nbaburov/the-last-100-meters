import PropTypes from "prop-types";
import PublicNavBar from "@components/PublicNavBar";

function LayoutWrapper({ children }) {
	return (
		<div>
			<PublicNavBar />
			<main>{children}</main>
		</div>
	);
}

LayoutWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default LayoutWrapper;
