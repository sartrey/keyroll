import { Table, Button, Input, Form, Space, message, Card, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, IRecord } from '../api';
import { useState } from 'react';

export default function Records() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [filterPrefix, setFilterPrefix] = useState('');

  const { data: records = [] } = useQuery({
    queryKey: ['records', { prefix: filterPrefix }],
    queryFn: () => api.records.list({ prefix: filterPrefix || undefined }),
  });

  const putMutation = useMutation({
    mutationFn: ({ recordKey, body }: { recordKey: string; body: any }) =>
      api.records.put(recordKey, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
      message.success('Record saved successfully');
      form.resetFields();
    },
    onError: () => {
      message.error('Failed to save record');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (recordKey: string) => api.records.delete(recordKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
      message.success('Record deleted successfully');
    },
    onError: () => {
      message.error('Failed to delete record');
    },
  });

  const handleSubmit = (values: any) => {
    if (!values.recordKey) {
      message.error('Please enter record key');
      return;
    }
    putMutation.mutate({
      recordKey: values.recordKey,
      body: {
        recordType: values.recordType || 'plain',
        recordValue: values.recordValue,
        contentType: values.contentType || 'text/plain',
        secureLevel: values.secureLevel || 0,
      },
    });
  };

  const columns = [
    {
      title: 'Key',
      dataIndex: 'recordKey',
      key: 'recordKey',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'recordType',
      key: 'recordType',
      width: 80,
      render: (type: string) => (
        <span style={{ fontFamily: 'monospace', backgroundColor: type === 'plain' ? '#e6f7ff' : '#fff7e6', padding: '2px 6px', borderRadius: 4 }}>
          {type}
        </span>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'recordValue',
      key: 'recordValue',
      ellipsis: true,
    },
    {
      title: 'Content-Type',
      dataIndex: 'contentType',
      key: 'contentType',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Secure',
      dataIndex: 'secureLevel',
      key: 'secureLevel',
      width: 70,
      render: (level: number) => {
        const colors = ['#52c41a', '#faad14', '#ff4d4f'];
        return <span style={{ color: colors[level] }}>{level}</span>;
      },
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 160,
      render: (ts: number) => new Date(ts * 1000).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (_: any, record: IRecord) => (
        <Popconfirm
          title="Delete this record?"
          onConfirm={() => deleteMutation.mutate(record.recordKey)}
          okText="Delete"
          cancelText="Cancel"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
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
            <Input.Select style={{ width: 100 }} defaultValue="plain">
              <Input.Select.Option value="plain">plain</Input.Select.Option>
              <Input.Select.Option value="refer">refer</Input.Select.Option>
            </Input.Select>
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
            <Input.Select style={{ width: 80 }} defaultValue={0}>
              <Input.Select.Option value={0}>0</Input.Select.Option>
              <Input.Select.Option value={1}>1</Input.Select.Option>
              <Input.Select.Option value={2}>2</Input.Select.Option>
            </Input.Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={putMutation.isPending}>
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
          />
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={records}
        rowKey="recordKey"
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
}
