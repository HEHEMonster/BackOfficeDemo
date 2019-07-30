import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
//import '//node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../styles/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState, convertFromHTML, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const UploadFileAction = '/api/QiNiuYun/Posts/';

export default class EditorComponent extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            defaultEditorState: EditorState.createEmpty(),

        };
        this.componentWillReceiveProps(props);
    }
  
    converteditorState(value) {
        let editorState;
        const contentBlock = htmlToDraft(value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        }
        return editorState;
    }

    componentWillReceiveProps(props) {

        if (props.starteditorState) {

            return;
        }
        this.state = {
            ...props,
            editorState: props.value ? this. converteditorState(props.value) : EditorState.createEmpty()
        }

    }

    onEditorStateChange = (editorState) => {
        let value;
        value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.props.onChange({ value });
        this.setState({
            editorState,
        });
    };
    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', UploadFileAction);
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    try {
                        const response = JSON.parse(xhr.response);
                        const link = JSON.parse(response.text).url;
                        resolve({
                            data: {
                                link
                            }
                        });
                    }
                    catch
                    {
                        const error = JSON.parse(xhr.responseText);
                        reject(error);
                    }

                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }
    render() {
        const { defaultEditorState, editorState } = this.state;
        return (
            <div>
                <Editor
                    toolbarClassName="demo-toolbar-absolute"
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    localization={{
                        locale: 'zh',
                    }}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack },
                    }}

                    toolbarOnFocus
                />

            </div>
        )
    }
}