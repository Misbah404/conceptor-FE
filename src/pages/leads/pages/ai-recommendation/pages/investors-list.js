import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Card,
  Typography,
  Space,
  Avatar,
  Badge,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import ProgressBar from "../components/progressbar";

const { Title } = Typography;

const InvestorsList = ({ data = [], state = {}, onChange, onAdd }) => {
  const [search, setSearch] = useState("");
  const [investors, setInvestors] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    position: ["bottomLeft"],
    pageSizeOptions: ["3", "10", "20", "50", "100"],
    showSizeChanger: false,
  });
  // const hasSelected = state.selectedRowKeys.length > 0
  const handleTableChange = (data) => {
    setPagination({
      ...pagination,
      ...data,
    });
  };

  useEffect(() => {
    init();
  }, [data]);

  const init = () => {
    let list = [];
    data.map((d, i) => {
      list.push({
        key: i,
        avatar: (
          <img
            style={{ width: 40, borderRadius: 8 }}
            alt=""
            src={`http://www.gravatar.com/avatar/?d=mp`}
          />
        ),
        name: d.company_name,
        lead_name: d.lead_name,
        report: d.bar_chart,
        action: "",
      });
    });
    setInvestors(list);
  };

  const onSelectChange = (rows) => {
    onChange(rows);
  };

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "",
      dataIndex: "name",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(search),
      render: (name) => (
        <div className="space-align-container">
          <div className="space-align-block">
            <Space align="center">
              <Avatar shape="square" size="large" icon={<UserOutlined />} />
              <span className="mock-block">{name}</span>
            </Space>
          </div>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "report",
      render: (report) => {
        if (!report) return null;
        return <ProgressBar data={report} />;
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => {
        return state.selectedRowKeys.includes(record.key) ? (
          <Button type="link" shape="circle" size={"small"}>
            <Badge color="#5932EA" text="on screen" />
          </Button>
        ) : (
          <Button
            type="link"
            shape="circle"
            size={"small"}
            onClick={() => onSelectChange([record.key])}
          >
            view details
          </Button>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-row justify-between items-center">
        <Title level={5}>Investors</Title>
        <div className="search-input">
          <Input
            value={search}
            size={90}
            placeholder="Search by name"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Card style={{ marginTop: 10 }}>
        <Table
          size="middle"
          className="no-thead"
          rowSelection={{
            type: "radio",
            selectedRowKeys: state.selectedRowKeys,
            onChange: onSelectChange,
          }}
          columns={columns}
          dataSource={investors.filter((i) =>
            i.name.toLowerCase().includes(search.toString().toLowerCase())
          )}
          onChange={handleTableChange}
          pagination={pagination}
          showSizeChanger={false}
        />
        {investors && investors.length > 0 && (
          <>
            <div className="spacer"></div>
            <div className="flex flex-row items-center">
              <div className="flex-1"></div>

              <Button
                variant="contained"
                size="large"
                onClick={onAdd}
                style={{
                  color: "#fff",
                  background: "#605BFF",
                  borderRadius: 8,
                }}
              >
                Add to Leads Manager
              </Button>
            </div>
          </>
        )}
      </Card>
    </React.Fragment>
  );
};

export default InvestorsList;
