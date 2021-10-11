// import React, { Component } from "react";
// import firebase from "firebase";

// import { Editor, createEditorState } from "medium-draft";
// import { convertToRaw } from "draft-js";
// import EditorJs from "react-editor-js";

// import { EDITOR_JS_TOOLS } from "../../../utils/constants";
// import sampleData, { stringJSON } from "./sampleJSON";

// class ArticleMediumEdit extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             editorState: null,
//         };

//         /*
//     this.state = {
//       editorState: createEditorState(data), // if you have initial data
//     };
//     */
//     }

//     componentDidMount() {
//         // this.refs.editor.focus();
//         this.setState({
//             editorState: sampleData,
//         });

//         this.saveToFirebase();
//     }

//     logData = () => {
//         const es = convertToRaw(this.state.editorState.getCurrentContent());
//         console.log("# - ", es);
//     };

//     saveToFirebase = () => {
//         const ref = firebase.database().ref("/test/1");
//         ref.once("value", (snap) => {
//             console.log("# SNAP - ", snap.val());
//         });
//     };

//     handleEditorJs = (api, output) => {
//         console.log("# object :", output);
//         const str = JSON.stringify(output);
//         console.log("# stringify: ", str);
//         console.log("# parse: ", JSON.parse(str));
//     };

//     render() {
//         return (
//             <>
//                 <EditorJs
//                     tools={EDITOR_JS_TOOLS}
//                     // data={this.state.editorState}
//                     enableReInitialize
//                     onChange={this.handleEditorJs}
//                     readOnly={true}
//                 />
//             </>
//         );
//     }
// }

// export default ArticleMediumEdit;

/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";

import EditorJs from "@natterstefan/react-editor-js";

import { EDITOR_JS_TOOLS } from "../../../utils/constants";
import { sampleData } from "./data";
import { createArticle, updateArticleById } from "../../../api/articles";

class ArticleMediumEdit extends Component {
    async onSave() {
        const outputData = await this.editorInstance.save();
        console.log("outputData", outputData);
    }

    saveArticle = async () => {
        const outputData = await this.editorInstance.save();
        const editorObject = JSON.stringify(outputData);

        const res = await createArticle({
            editorObject,
        });

        console.log("##", res?.data?.error);
    };

    updateArticle = async () => {
        const { article } = this.props;
        const outputData = await this.editorInstance.save();
        const editorObject = JSON.stringify(outputData);

        const res = await updateArticleById({
            id: article?.id,
            title: article?.title,
            bannerImage: article?.bannerImage,
            description: article?.description,
            editorObject,
            html: "-",
            timestamp: new Date().toISOString(),
        });
    };

    render() {
        const { data, mode } = this.props;

        return (
            <div className="app">
                {/* <h1>
                    <a
                        href="https://github.com/natterstefan/react-editor-js"
                        target="_blank"
                    >
                        react-editor-js{" "}
                        <span role="img" aria-label="link">
                            🔗
                        </span>{" "}
                        <span role="img" aria-label="react">
                            ⚛️
                        </span>
                    </a>
                </h1> */}

                {mode === "create" ? (
                    <div className="actions">
                        <button onClick={this.saveArticle} type="button">
                            Create article
                        </button>
                    </div>
                ) : (
                    <div className="actions">
                        <button onClick={this.updateArticle} type="button">
                            Update
                        </button>
                    </div>
                )}

                {data !== undefined && (
                    <EditorJs
                        tools={EDITOR_JS_TOOLS}
                        data={mode === "create" ? sampleData : JSON.parse(data)}
                        editorInstance={(instance) =>
                            (this.editorInstance = instance)
                        }
                    />
                )}
            </div>
        );
    }
}

export default ArticleMediumEdit;
