import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div>
            <h1>无权限访问</h1>
            <Button>
                <Link to='/'>返回</Link>
            </Button>
        </div>
    );
}

export default Forbidden;