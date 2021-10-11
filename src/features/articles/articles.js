import React, { Component } from "react";
import data from "./sampleJSON";
import { getArticleById } from "../../api/articles";
import CircularLazyLoad from "../../common/components/CircularLazyLoad";

export default class articles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentArticle: null,
        };
    }
    _renderHeader = (el) => {
        if (el?.data?.level === 1) {
            return (
                <h1 dangerouslySetInnerHTML={{ __html: el?.data?.text }}></h1>
            );
        } else if (el?.data?.level === 2) {
            return (
                <h2 dangerouslySetInnerHTML={{ __html: el?.data?.text }}></h2>
            );
        } else if (el?.data?.level === 3) {
            return (
                <h3 dangerouslySetInnerHTML={{ __html: el?.data?.text }}></h3>
            );
        } else if (el?.data?.level === 4) {
            return (
                <h4 dangerouslySetInnerHTML={{ __html: el?.data?.text }}></h4>
            );
        } else if (el?.data?.level === 5) {
            return (
                <h5 dangerouslySetInnerHTML={{ __html: el?.data?.text }}></h5>
            );
        } else if (el?.data?.level === 6) {
            return (
                <h6 dangerouslySetInnerHTML={{ __html: el?.data?.text }}></h6>
            );
        }
    };

    _renderParagraph = (el) => {
        return <p dangerouslySetInnerHTML={{ __html: el?.data?.text }}></p>;
    };

    _renderList = (el) => {
        return (
            <>
                {el?.data?.style === "unordered" && (
                    <ul className="unordered">
                        {el?.data?.items.map((item) => {
                            return <li>{item}</li>;
                        })}
                    </ul>
                )}

                {el?.data?.style === "ordered" && (
                    <ul className="ordered">
                        {el?.data?.items.map((item) => {
                            return <li>{item}</li>;
                        })}
                    </ul>
                )}
            </>
        );
    };

    _renderDelimiter = () => {
        return <div className="delimiter ce-delimiter cdx-block" />;
    };

    _renderImage = (el) => {
        return (
            <div className="image-tool__image">
                <img
                    className="image-tool__image-picture"
                    src={el?.data?.file?.url}
                    alt={el?.data?.caption}
                />
                <div
                    className="cdx-input image-tool__caption"
                    style={{ textAlign: "center" }}
                >
                    {el?.data?.caption}
                </div>
            </div>
        );
    };

    _renderUI = () => {
        const currentArticle = this.state.currentArticle;

        if (currentArticle !== null) {
            const editorObject = JSON.parse(currentArticle.editorObject);
            console.log("# ", typeof editorObject);

            if (typeof editorObject === "object") {
                return editorObject?.blocks?.map((el) => {
                    if (el?.type === "header") {
                        return this._renderHeader(el);
                    }

                    if (el?.type === "paragraph") {
                        return this._renderParagraph(el);
                    }

                    if (el?.type === "list") {
                        return this._renderList(el);
                    }

                    if (el?.type === "delimiter") {
                        return this._renderDelimiter();
                    }

                    if (el?.type === "image") {
                        return this._renderImage(el);
                    }
                });
            } else {
                return <div>Unable to load this article</div>;
            }
        } else {
            return (
                <div className="article-loader">
                    <CircularLazyLoad color="#1c8a61" />
                </div>
            );
        }
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await getArticleById(parseInt(id));
        this.setState({
            currentArticle: res?.data?.data,
        });
    }

    render() {
        return <div className="app">{this._renderUI()}</div>;
    }
}
