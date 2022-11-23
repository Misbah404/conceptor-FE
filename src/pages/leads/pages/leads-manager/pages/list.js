import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  Tag,
  Space,
  Avatar,
  Button,
  Popconfirm,
  Input,
  Tooltip,
} from "antd";
import { UserOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalSuccess from "../../../../../components/modal/success";
import SuccessCheckIcon from "../../../../../assets/svgs/success-check";

const { TextArea } = Input;

const LeadsList = ({ search, companies, onReload }) => {
  const { http } = global.services;

  const [visible, setVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [state, setState] = useState({
    editable: false,
    notes: null,
    record: {},
  });

  const onDelete = async (e) => {
    let { data } = await http.delete(`user-lead`, { id: e.id });
    setVisible(true);
  };

  const reload = async () => {
    setVisible(false);
    onReload();
  };

  const handleClose = () => {
    setVisible(false);
  };

  const change = (r, e) => {
    if (e.target.value) {
      setState({
        ...state,
        editable: true,
        notes: e.target.value,
        record: r,
      });
    } else {
      setState({
        ...state,
        editable: false,
        notes: e.target.value,
        record: r,
      });
    }
  };

  const onUpdate = async () => {
    let params = { ...state.record };
    params["user_notes"] = state.notes;

    let { data } = await http.put(`user-lead`, params);
    setState({
      ...state,
      editable: false,
    });
    onReload();
  };

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (id) => <span>#{id}</span>,
    },
    {
      title: "Name",
      dataIndex: "lead_name",
      key: "lead_name",
      render: (lead_name) => (
        <div className="space-align-container">
          <div className="space-align-block">
            <Space align="center">
              <Avatar shape="square" size="large" icon={<UserOutlined />} />
              <span className="mock-block">{lead_name}</span>
            </Space>
          </div>
        </div>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = null;
        if (status.toLowerCase() === "new lead") color = "#D0BBFE";
        else if (status.toLowerCase() === "communicating") color = "#5B93FF";
        else if (status.toLowerCase() === "contacted") color = "#DD97E9";
        return status ? (
          <Tag color={color} key={status}>
            {status.toUpperCase() || ``}
          </Tag>
        ) : null;
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={(e) => onDelete(record)}
            onCancel={(e) => console.log(e)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button
                type="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                size={"medium"}
              />
            </Tooltip>
          </Popconfirm>

          <Tooltip title="Edit">
            <Link to={`/leads-manager/edit/${record.id}`}>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                size={"medium"}
              />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {visible && (
        <ModalSuccess
          className="program-x-modal"
          show={visible}
          onClose={handleClose}
        >
          <div className="program-x-modal-success-content">
            <SuccessCheckIcon />
            <h1 className="title">Successfully Deleted</h1>
            <Button className="btn btn-primary" type="primary" onClick={reload}>
              Ok
            </Button>
          </div>
        </ModalSuccess>
      )}

      <Table
        size={"middle"}
        className="leads-tbl"
        columns={columns}
        dataSource={companies.filter((c) =>
          c.lead_name.toLowerCase().includes(search.toString().toLowerCase())
        )}
        pagination={{ pageSize: 5, position: ["bottomRight"] }}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex">
              <div className="flex-1"></div>
              <div className="custom-notes">
                <div className="custom-notes-content">
                  <p>Custom note from User:</p>
                  {state.record.id == record.id ? (
                    <>
                      <div className="flex">
                        <TextArea
                          style={{ margin: 0, borderWidth: 0 }}
                          value={state.notes}
                          onChange={(e) => change(record, e)}
                        ></TextArea>
                      </div>
                      {state.editable && (
                        <Button type="link" onClick={onUpdate}>
                          Save
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="flex">
                      <TextArea
                        style={{ margin: 0, borderWidth: 0 }}
                        value={record.user_notes}
                        onChange={(e) => change(record, e)}
                      ></TextArea>
                    </div>
                  )}
                </div>
                <div className="custom-notes-content">
                  <p>Custom note from Conceptor:</p>
                  {record.recommended_lead_notes ? (
                    <div>
                      <strong>
                        <span>Client’s Goals & Buyer Incentives</span>
                      </strong>
                      {/* <p style={{ fontSize: 12 }}>{record.recommended_lead_notes.misc_synergies.join(',')}</p> */}
                      {record.recommended_lead_notes.misc_synergies && (
                        <ul style={{ paddingLeft: 15 }}>
                          {record.recommended_lead_notes.misc_synergies.map(
                            (d, i) => (
                              <li key={i}>{d}</li>
                            )
                          )}
                        </ul>
                      )}
                      <strong>
                        <span>Operating Synergies</span>
                      </strong>
                      {/* <p style={{ fontSize: 12 }}>{record.recommended_lead_notes.operating_synergies.join(',')}</p> */}
                      {record.recommended_lead_notes.operating_synergies && (
                        <ul style={{ paddingLeft: 15 }}>
                          {record.recommended_lead_notes.operating_synergies.map(
                            (d, i) => (
                              <li key={i}>{d}</li>
                            )
                          )}
                        </ul>
                      )}
                      <strong>
                        <span>Financial Synergies</span>
                      </strong>
                      {/* <p style={{ fontSize: 12 }}>{record.recommended_lead_notes.financial_synergies.join(',')}</p> */}
                      {record.recommended_lead_notes.financial_synergies && (
                        <ul style={{ paddingLeft: 15 }}>
                          {record.recommended_lead_notes.financial_synergies.map(
                            (d, i) => (
                              <li key={i}>{d}</li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p>N/A</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ),
        }}
        expandIcon={({ expanded, onExpand, record }) => (
          <Button type="link" onClick={(e) => onExpand(record, e)}>
            View Notes
          </Button>
        )}
        expandedRowKeys={expandedRowKeys}
        onExpand={(expanded, record) => {
          var keys = [];
          if (expanded) {
            keys.push(record.id);
          }
          setState({
            ...state,
            editable: false,
            notes: record.user_notes,
            record,
          });
          setExpandedRowKeys(keys);
        }}
      />
    </React.Fragment>
  );
};

export default LeadsList;
