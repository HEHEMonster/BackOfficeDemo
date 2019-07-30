import React from 'react'; import { Upload, Icon, Modal } from 'antd';
const UploadFileAction = '/api/QiNiuYun/Posts/';

//目前的问题 上传第二张 变数组后 第二张 值是 null  respones 突然为空了‘
export default class PicturesWall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //valuefileList: null || [{ url:"http"}],
            ...props,
            previewVisible: false,
            previewImage: '',
            fileList: null || [],
        };

        //console.log('PicturesWall constructor this.state', this.state);
        this.componentWillReceiveProps(this.state);

    }

    componentDidMount() {
        //整个页面 加载完毕 加载组件时运行 只运行一次
    }
    convertFileValue(value) {
        let values = [], file = [];

        //下面这里 fileList 赋值自定义内容后 respones 失效
        try {

            values = JSON.parse(value);
        }
        catch
        {
            values = [value];//在这里处理错误
        }
        //console.log('PicturesWall componentWillReceiveProps values', values);
        if (values) {
            for (let i = 0; values.length > i; i++) {
                if (values[i] && (values[i].indexOf("http://") > -1 || values[i].indexOf("https://") > -1)) {
                    file.push(
                        {
                            uid: i,
                            url: values[i],
                        })
                }
            }
        }
        return file;
    }

    componentWillReceiveProps(props) {
        //会被调用3次  有待解决
        const { starteeditorfileList } = this.props;
        if (starteeditorfileList) {
            return;
        }
        this.state = {
            ...props,
            previewVisible: false,
            previewImage: '',
            fileList: props.value ? this.convertFileValue(props.value) : [],
        }
    }

    handleCancel = () => {

        this.setState({ previewVisible: false })
        //console.log('PicturesWall handleCancel this.state', this.state);
    }

    handlePreview = (file) => {
        //console.log('PicturesWall handlePreview', file);
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        //console.log('PicturesWall handleChange fileList', fileList);
        this.props.onChange({ fileList })

        //console.log('PicturesWall handleChange this.props', this.props);
        this.setState({ fileList })

    }

    render() {
        //{ require("./images/" + valuefileList.src + ".jpg") }
        const { previewVisible, previewImage, fileList, limit, } = this.state;
        //const { valuefileList= null || [] } = this.props
        //console.log('PicturesWall render this.state.valuefileList', this.props);
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload action={UploadFileAction}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}  >
                    {this.state.fileList.length >= limit ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
