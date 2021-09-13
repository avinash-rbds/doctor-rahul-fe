import React, { Component } from "react";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";

class CircularLazyLoad extends Component {
    render() {
        const { width, height, color } = this.props;

        return (
            <Spinner
                style={{
                    width,
                    height,
                    color,
                }}
            />
        );
    }
}

CircularLazyLoad.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string,
};

CircularLazyLoad.defaultProps = {
    width: "2.75rem",
    height: "2.75rem",
    color: "#b61219",
};

export default CircularLazyLoad;
