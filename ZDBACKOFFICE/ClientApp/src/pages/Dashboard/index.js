import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Chart, Tooltip, Axis, Legend, Pie, Coord, Bar } from 'viser-react';
import { getLocalUserName } from '../../static/sessionKey';
const DataSet = require('@antv/data-set');

const sourceData = [
    { item: '事例一', count: 40 },
    { item: '事例二', count: 21 },
    { item: '事例三', count: 17 },
    { item: '事例四', count: 13 },
    { item: '事例五', count: 9 }
];

const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
}];

const dv = new DataSet.View().source(sourceData);
dv.transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
});
const data = dv.rows;


const data2 = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
];

const scale2 = [{
    dataKey: 'sales',
    tickInterval: 20,
}];

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div>
            <h1 style={{ fontSize: 30 }}>欢迎，{getLocalUserName()}</h1>
            {/* <Row>
                <Col span="12">
                    <Chart forceFit height={400} data={data} scale={scale}>
                        <Tooltip showTitle={false} />
                        <Coord type="theta" />
                        <Axis />
                        <Legend dataKey="item" />
                        <Pie
                            position="percent"
                            color="item"
                            style={{ stroke: '#fff', lineWidth: 1 }}
                            label={['percent', {
                                formatter: (val, item) => {
                                    return item.point.item + ': ' + val;
                                }
                            }]}
                        />
                    </Chart>
                </Col>
                <Col span="12">
                    <Chart forceFit height={400} data={data2} scale={scale2}>
                        <Tooltip />
                        <Axis />
                        <Bar position="year*sales" />
                    </Chart>
                </Col>
            </Row> */}
        </div>);
    }
}

export default Dashboard;