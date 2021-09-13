import React, { Component } from "react";
import CircularLazyLoad from "../CircularLazyLoad";

export default class LazyLoadModal extends Component {
    render() {
        return (
            <div className="lazy-load-modal">
                <div className="lazy-load-modal-text">
                    <CircularLazyLoad />
                </div>
            </div>
        );
    }
}
