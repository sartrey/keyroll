import { Table, Button, Input, Form, Space, message, Card, Popconfirm, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import { listRecords, putRecord, deleteRecord } from '../services/records';
import type { IRecord } from '../../shared/types';

export default function Records() {
  const [form] = Form.useForm();
  const [records, setRecords] = useState<IRecord[]>([]);
  const [filterPrefix, setFilterPrefix] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 加载记录列表
  const loadRecords = async (prefix?: string) => {
    setLoading(true);
    try {
      const data = await listRecords({ prefix: prefix || undefined });
      setRecords(data);
    } catch {
      message.error('Failed to load records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords(filterPrefix || undefined);
  }, []);

  const handleFilter = () => {
    loadRecords(filterPrefix || undefined);
  };

  const handleSubmit = async (values: any) => {
    if (!values.recordKey) {
      message.error('Please enter record key');
      return;
    }
    setSaving(true);
    try {
      await putRecord(values.recordKey, {
        recordType: values.recordType || 'plain',
        recordValue: values.recordValue,
        contentType: values.contentType || 'text/plain',
        secureLevel: values.secureLevel || 0
      });
      message.success('Record saved successfully');
      form.resetFields();
      loadRecords(filterPrefix || undefined);
    } catch {
      message.error('Failed to save record');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (recordKey: string) => {
    try {
      await deleteRecord(recordKey);
      message.success('Record deleted successfully');
      loadRecords(filterPrefix || undefined);
    } catch {
      message.error('Failed to delete record');
    }
  };

  const columns = [
    {
      title: 'Key',
      dataIndex: 'recordKey',
      key: 'recordKey',
      ellipsis: true
    },
    {
      title: 'Type',
      dataIndex: 'recordType',
      key: 'recordType',
      width: 80,
      render: (type: string) => 
        <span style={{ fontFamily: 'monospace', backgroundColor: type === 'plain' ? '#e6f7ff' : '#fff7e6', padding: '2px 6px', borderRadius: 4 }}>
          {type}
        </span>
      
    },
    {
      title: 'Value',
      dataIndex: 'recordValue',
      key: 'recordValue',
      ellipsis: true
    },
    {
      title: 'Content-Type',
      dataIndex: 'contentType',
      key: 'contentType',
      width: 150,
      ellipsis: true
    },
    {
      title: 'Secure',
      dataIndex: 'secureLevel',
      key: 'secureLevel',
      width: 70,
      render: (level: number) => {
        const colors = ['#52c41a', '#faad14', '#ff4d4f'];
        return <span style={{ color: colors[level] }}>{level}</span>;
      }
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 160,
      render: (ts: number) => new Date(ts * 1000).toLocaleString()
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (_: any, record: IRecord) => 
        <Popconfirm
          title="Delete this record?"
          onConfirm={() => handleDelete(record.recordKey)}
          okText="Delete"
          cancelText="Cancel"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      
    }
  ];

  return (
    <div>
      <h2>Records</h2>

      <Card style={{ marginBottom: 16 }} title="Create / Update Record">
        <Form form={form} onFinish={handleSubmit} layout="inline">
          <Form.Item
            name="recordKey"
            label="Key"
            rules={[{ required: true, message: 'Please enter record key' }]}
          >
            <Input placeholder="/plain/localhost/user.name" style={{ width: 220 }} />
          </Form.Item>
          <Form.Item name="recordType" label="Type">
            <Select style={{ width: 100 }} defaultValue="plain">
              <Select.Option value="plain">plain</Select.Option>
              <Select.Option value="refer">refer</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="recordValue"
            label="Value"
            rules={[{ required: true, message: 'Please enter value' }]}
          >
            <Input placeholder="Value" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item name="contentType" label="Content-Type">
            <Input placeholder="text/plain" style={{ width: 140 }} defaultValue="text/plain" />
          </Form.Item>
          <Form.Item name="secureLevel" label="Secure">
            <Select style={{ width: 80 }} defaultValue={0}>
              <Select.Option value={0}>0</Select.Option>
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={saving}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card style={{ marginBottom: 16 }} title="Filter">
        <Space>
          <Input
            placeholder="Filter by key prefix (e.g., /plain/localhost/user)"
            style={{ width: 300 }}
            value={filterPrefix}
            onChange={(e) => setFilterPrefix(e.target.value)}
            allowClear
            onPressEnter={handleFilter}
          />
          <Button type="primary" onClick={handleFilter}>
            Search
          </Button>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={records}
        rowKey="recordKey"
        pagination={{ pageSize: 20 }}
        loading={loading}
      />
    </div>
  );
}
