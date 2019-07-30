import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const CustomTag = ({ closable, checkedColor, defaultColor, checked, onChecked, children }) => {

    return (
        <Tag
            style={{ marginBottom: 3 }}
            closable={closable}
            color={checked ? checkedColor : defaultColor}
            onClick={onChecked}
        >
            {children}
        </Tag>
    );
}

CustomTag.defaultProps = {
    closable: false,
    checkedColor: "#87d068",
    defaultColor: ""
}

CustomTag.propTypes = {
    closable: PropTypes.bool,
    checkedColor: PropTypes.string,
    defaultColor: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onChecked: PropTypes.func.isRequired
}


export default CustomTag;