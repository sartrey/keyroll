import {
  Table,
  Button,
  Input,
  Form,
  Space,
  message,
  Popconfirm,
  Select,
  Tag,
  Empty,
  Modal,
  Drawer,
  Row,
  Col,
  Card,
  Segmented,
  Radio
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  FileTextOutlined,
  LinkOutlined,
  BranchesOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  LockOutlined,
  AppstoreOutlined,
  NodeIndexOutlined,
  KeyOutlined,
  CloudDownloadOutlined
} from '@ant-design/icons';
import { useState, useEffect } from 'react';

import { listRecords, createRecord, updateRecord, deleteRecord, syncReferRecord } from '../services/records';
import type { IRecord } from '../../shared/types';

function StatCard({
  title,
  value,
  icon,
  color,
  bg
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <Card style={{ border: '1px solid #f0f0f0', borderRadius: 12, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
        <div>
          <div style={{ color: '#8c8c8c', fontSize: 13, marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 28, fontWeight: 600, color, lineHeight: 1 }}>{value}</div>
        </div>
      </div>
    </Card>
  );
}

export default function Database() {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [filterPrefix, setFilterPrefix] = useState('');
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<IRecord | null>(null);
  const [createType, setCreateType] = useState<'plain' | 'refer' | 'graph'>('plain');
  const [statsOpen, setStatsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'domain' | 'canvas'>('list');
  const [referSourceType, setReferSourceType] = useState<'url' | 'local'>('url');
  const [syncingKeys, setSyncingKeys] = useState<Set<string>>(new Set());
  const [form] = Form.useForm();

  const loadRecords = async (prefix?: string) => {
    setLoading(true);
    try {
      const data = await listRecords({ prefix: prefix || undefined });
      setRecords(data);
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error('加载记录失败');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleFilter = () => {
    loadRecords(filterPrefix || undefined);
  };

  const handleOpenCreate = (type: 'plain' | 'refer' | 'graph') => {
    setEditingRecord(null);
    setCreateType(type);
    setReferSourceType('url');
    const defaults: Record<string, Partial<{ contentType: string; secureLevel: number; }>> = {
      plain: { contentType: 'text/plain', secureLevel: 0 },
      refer: { contentType: 'application/json', secureLevel: 0 },
      graph: { contentType: 'application/json', secureLevel: 0 }
    };
    form.setFieldsValue({ recordType: type, keySuffix: '', ...defaults[type] });
    setDrawerOpen(true);
  };

  const getPrefixForType = (type: string) => {
    if (type === 'plain') { return '/plain/'; }
    if (type === 'refer') { return '/refer/'; }
    if (type === 'graph') { return '/graph/'; }
    return '';
  };

  const handleOpenEdit = (record: IRecord) => {
    if (record.recordType === 'inner') {
      return;
    }
    setEditingRecord(record);
    form.setFieldsValue({
      recordKey: record.recordKey,
      recordType: record.recordType,
      recordValue: record.recordValue,
      contentType: record.contentType,
      secureLevel: record.secureLevel
    });
    setDrawerOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      const recordKey = editingRecord
        ? (values.recordKey as string)
        : `${getPrefixForType(createType)}${(values.keySuffix as string) ?? ''}`;

      let recordValue = values.recordValue as string;
      if (!editingRecord && createType === 'refer') {
        const originSrc = (values.referOriginSrc as string) ?? '';
        const integrity = (values.referIntegrity as string) ?? '';
        recordValue = JSON.stringify({ originSrc, integrity: integrity || undefined });
      }

      if (editingRecord) {
        await updateRecord(editingRecord.recordKey, {
          recordType: values.recordType as IRecord['recordType'],
          recordValue: values.recordValue as string,
          contentType: values.contentType as string,
          secureLevel: values.secureLevel as number
        });
        message.success('记录已更新');
      } else {
        await createRecord(recordKey, {
          recordType: values.recordType as IRecord['recordType'],
          recordValue,
          contentType: values.contentType as string,
          secureLevel: (values.secureLevel as number) ?? 0
        });
        message.success('记录已创建');
      }
      setDrawerOpen(false);
      form.resetFields();
      loadRecords(filterPrefix || undefined);
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error(err instanceof Error ? err.message : '保存失败');
      }
    }
  };

  const handleDelete = async (recordKey: string) => {
    try {
      await deleteRecord(recordKey);
      message.success('记录已删除');
      loadRecords(filterPrefix || undefined);
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error(err instanceof Error ? err.message : '删除失败');
      }
    }
  };

  const handleSyncRefer = async (recordKey: string) => {
    setSyncingKeys((prev) => new Set(prev).add(recordKey));
    try {
      const newKey = await syncReferRecord(recordKey);
      message.success(`已同步到本地: ${newKey}`);
      loadRecords(filterPrefix || undefined);
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error(err instanceof Error ? err.message : '同步失败');
      }
    } finally {
      setSyncingKeys((prev) => {
        const next = new Set(prev);
        next.delete(recordKey);
        return next;
      });
    }
  };

  const plainCount = records.filter((r) => r.recordType === 'plain').length;
  const referCount = records.filter((r) => r.recordType === 'refer').length;
  const protectedCount = records.filter((r) => r.secureLevel === 1).length;

  const columns = [
    {
      title: 'Key',
      dataIndex: 'recordKey',
      key: 'recordKey',
      ellipsis: true,
      render: (text: string) =>
        <span style={{ fontFamily: 'SF Mono, Menlo, monospace', fontSize: 13, color: '#595959' }}>
          {text}
        </span>

    },
    {
      title: '类型',
      dataIndex: 'recordType',
      key: 'recordType',
      width: 90,
      render: (type: string) => {
        const colorMap: Record<string, string> = {
          plain: 'blue',
          refer: 'orange',
          inner: 'purple',
          graph: 'green'
        };
        return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
      }
    },
    {
      title: '值',
      dataIndex: 'recordValue',
      key: 'recordValue',
      ellipsis: true,
      render: (text: string) =>
        <span style={{ color: '#595959', fontSize: 13 }}>
          {text.length > 80 ? text.slice(0, 80) + '...' : text}
        </span>

    },
    {
      title: '安全',
      dataIndex: 'secureLevel',
      key: 'secureLevel',
      width: 80,
      render: (level: number) =>
        <Tag color={level === 1 ? 'gold' : 'default'}>
          {level === 0 ? '未托管' : '已保护'}
        </Tag>

    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 160,
      render: (ts: number) => {
        const d = new Date(ts * 1000);
        return <span style={{ color: '#8c8c8c', fontSize: 13 }}>{d.toLocaleDateString()}</span>;
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 130,
      render: (_: unknown, record: IRecord) => {
        if (record.recordType === 'inner') {
          return <span style={{ color: '#bfbfbf', fontSize: 12 }}>系统记录</span>;
        }

        const isRemoteRefer = record.recordType === 'refer' && (() => {
          try {
            const refValue = JSON.parse(record.recordValue);
            return refValue.originSrc && (refValue.originSrc.startsWith('http://') || refValue.originSrc.startsWith('https://'));
          } catch {
            return false;
          }
        })();

        return (
          <Space size="small">
            {isRemoteRefer &&
              <Button
                type="text"
                size="small"
                icon={<CloudDownloadOutlined style={{ fontSize: 13 }} />}
                loading={syncingKeys.has(record.recordKey)}
                onClick={() => handleSyncRefer(record.recordKey)}
                title="同步到本地"
              />
            }
            <Button
              type="text"
              size="small"
              icon={<EditOutlined style={{ fontSize: 13 }} />}
              onClick={() => handleOpenEdit(record)}
            />
            <Popconfirm
              title="确认删除"
              description="确定要删除这条记录吗？"
              onConfirm={() => handleDelete(record.recordKey)}
              okText="删除"
              cancelText="取消"
            >
              <Button type="text" size="small" danger icon={<DeleteOutlined style={{ fontSize: 13 }} />} />
            </Popconfirm>
          </Space>
        );
      }

    }
  ];

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px' }}>
            Database
          </h2>
          <p style={{ color: '#8c8c8c', margin: 0, fontSize: 14 }}>
            管理所有记录
          </p>
        </div>
      </div>

      <div className="toolbar">
        <Button
          type="primary"
          icon={<FileTextOutlined />}
          onClick={() => handleOpenCreate('plain')}
          style={{ borderRadius: 8 }}
        >
          普通记录
        </Button>
        <Button
          type="primary"
          icon={<LinkOutlined />}
          onClick={() => handleOpenCreate('refer')}
          style={{ borderRadius: 8 }}
        >
          引用记录
        </Button>
        <Button
          type="primary"
          icon={<BranchesOutlined />}
          onClick={() => handleOpenCreate('graph')}
          style={{ borderRadius: 8 }}
        >
          图记录
        </Button>
        <Button
          icon={<BarChartOutlined />}
          onClick={() => setStatsOpen(true)}
          style={{ borderRadius: 8 }}
        >
          统计
        </Button>
      </div>

      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 16,
        alignItems: 'center'
      }}>
        <Segmented
          value={viewMode}
          onChange={(value) => setViewMode(value as 'list' | 'domain' | 'canvas')}
          options={[
            { label: '列表', value: 'list', icon: <FileTextOutlined /> },
            { label: '域', value: 'domain', icon: <AppstoreOutlined /> },
            { label: '画布', value: 'canvas', icon: <NodeIndexOutlined /> }
          ]}
        />
        <Input
          placeholder="按 Key 前缀筛选，如 /plain/localhost"
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          style={{ width: 320, borderRadius: 8 }}
          value={filterPrefix}
          onChange={(e) => setFilterPrefix(e.target.value)}
          allowClear
          onPressEnter={handleFilter}
        />
        <Button onClick={handleFilter} style={{ borderRadius: 8 }}>
          搜索
        </Button>
      </div>

      {viewMode === 'list' &&
        <Table
          columns={columns}
          dataSource={records}
          rowKey="recordKey"
          pagination={{ pageSize: 20, showSizeChanger: false }}
          loading={loading}
          style={{ borderRadius: 12, overflow: 'hidden' }}
          locale={{
            emptyText:
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="暂无数据"
              />

          }}
        />
      }

      {viewMode === 'domain' &&
        <Empty description="域视图开发中" />
      }

      {viewMode === 'canvas' &&
        <Empty description="DAG 画布开发中" />
      }

      {/* Stats Drawer */}
      <Drawer
        title="数据统计"
        open={statsOpen}
        onClose={() => setStatsOpen(false)}
        width={400}
        destroyOnClose
      >
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <StatCard
              title="总记录"
              value={records.length}
              icon={<DatabaseOutlined style={{ fontSize: 20, color: '#5b8ff9' }} />}
              color="#1a1a1a"
              bg="#f0f5ff"
            />
          </Col>
          <Col span={12}>
            <StatCard
              title="已加密"
              value={protectedCount}
              icon={<LockOutlined style={{ fontSize: 20, color: '#722ed1' }} />}
              color="#1a1a1a"
              bg="#f9f0ff"
            />
          </Col>
        </Row>
        <StatCard
          title="纯文本"
          value={plainCount}
          icon={<FileTextOutlined style={{ fontSize: 20, color: '#52c41a' }} />}
          color="#1a1a1a"
          bg="#f6ffed"
        />
        <StatCard
          title="文件引用"
          value={referCount}
          icon={<LinkOutlined style={{ fontSize: 20, color: '#fa8c16' }} />}
          color="#1a1a1a"
          bg="#fff7e6"
        />
      </Drawer>

      {/* Create/Edit Modal */}
      <Modal
        title={
          editingRecord
            ? '编辑记录'
            : `新建${createType === 'plain' ? '普通' : createType === 'refer' ? '引用' : '图'}记录`
        }
        open={drawerOpen}
        onCancel={() => {
          setDrawerOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={480}
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{ paddingTop: 16 }}
        >
          {!editingRecord &&
            <Form.Item
              label="Key"
              name="keySuffix"
              rules={[{ required: true, message: '请输入记录 Key' }]}
            >
              <Input
                addonBefore={<span style={{
                  fontFamily: 'SF Mono, Menlo, monospace',
                  fontSize: 13,
                  color: '#595959',
                  padding: '0 8px'
                }}>{getPrefixForType(createType)}</span>}
                placeholder={
                  createType === 'plain'
                    ? 'localhost/user.name'
                    : createType === 'refer'
                      ? 'photos/2024-07/image/1'
                      : 'notes/my-graph'
                }
              />
            </Form.Item>
          }

          {editingRecord &&
            <Form.Item label="Key" name="recordKey">
              <Input
                disabled
                style={{ fontFamily: 'SF Mono, Menlo, monospace', fontSize: 13, color: '#595959' }}
              />
            </Form.Item>
          }

          <Form.Item
            label="类型"
            name="recordType"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select disabled>
              <Select.Option value="plain">plain</Select.Option>
              <Select.Option value="refer">refer</Select.Option>
              <Select.Option value="graph">graph</Select.Option>
            </Select>
          </Form.Item>

          {createType !== 'graph' &&
            <Form.Item label="安全等级" name="secureLevel">
              <Radio.Group style={{ display: 'flex', gap: 12 }}>
                <Radio.Button value={0} style={{
                  flex: 1,
                  height: 'auto',
                  padding: '12px 16px',
                  borderRadius: 8,
                  textAlign: 'center',
                  border: '1px solid #d9d9d9'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <KeyOutlined />
                    <span>未托管</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4, fontWeight: 'normal' }}>
                    明文存储
                  </div>
                </Radio.Button>
                <Radio.Button value={1} style={{
                  flex: 1,
                  height: 'auto',
                  padding: '12px 16px',
                  borderRadius: 8,
                  textAlign: 'center',
                  border: '1px solid #d9d9d9'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <LockOutlined />
                    <span>已保护</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4, fontWeight: 'normal' }}>
                    MasterKey 加密
                  </div>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          }

          {createType === 'refer' && !editingRecord &&
            <Form.Item label="数据源">
              <Segmented
                value={referSourceType}
                onChange={(v) => setReferSourceType(v as 'url' | 'local')}
                options={[
                  { label: '远程 URL', value: 'url' },
                  { label: '本地路径', value: 'local' }
                ]}
                style={{ marginBottom: 8 }}
              />
            </Form.Item>
          }

          {createType === 'refer' && !editingRecord && referSourceType === 'url' &&
            <Form.Item name="referOriginSrc" label="URL" rules={[{ required: true, message: '请输入数据源' }]}>
              <Input placeholder="https://example.com/file.jpg" />
            </Form.Item>
          }

          {createType === 'refer' && !editingRecord && referSourceType === 'local' &&
            <Form.Item name="referOriginSrc" label="文件路径" rules={[{ required: true, message: '请输入文件路径' }]}>
              <Input placeholder="/Users/xxx/Downloads/file.jpg" />
            </Form.Item>
          }

          {createType === 'refer' && !editingRecord && referSourceType === 'url' &&
            <Form.Item label="Integrity（可选）" name="referIntegrity">
              <Input placeholder="sha256-..." />
            </Form.Item>
          }

          {createType !== 'refer' &&
            <Form.Item
              label="值"
              name="recordValue"
              rules={[{ required: true, message: '请输入记录值' }]}
            >
              <Input.TextArea
                rows={5}
                placeholder="记录内容"
              />
            </Form.Item>
          }

          {createType === 'refer' && editingRecord &&
            <Form.Item
              label="值"
              name="recordValue"
              rules={[{ required: true, message: '请输入记录值' }]}
            >
              <Input.TextArea
                rows={5}
                placeholder='{"originSrc": "/path/to/file", "integrity": "sha256-..."}'
              />
            </Form.Item>
          }

          <Form.Item label="Content-Type" name="contentType">
            <Input placeholder="text/plain" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => {
                setDrawerOpen(false);
                form.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingRecord ? '保存' : '创建'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
