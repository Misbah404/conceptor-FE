import React from 'react'
import { Table, Button } from 'antd';

const columns = [
    {
        title: 'Number',
        dataIndex: 'number',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Score',
        dataIndex: 'score',
    },
];

const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        number: 32,
        name: `Edward King ${i}`,
        score: 10,
    });
}

class InvestorsScore extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default InvestorsScore