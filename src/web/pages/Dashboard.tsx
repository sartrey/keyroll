import { Card, Row, Col, Statistic } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export default function Dashboard() {
  const { data: records = [] } = useQuery({
    queryKey: ['records'],
    queryFn: () => api.records.list(),
  });

  const plainCount = records.filter(r => r.recordType === 'plain').length;
  const referCount = records.filter(r => r.recordType === 'refer').length;

  return (
    <div>
      <h2>Dashboard</h2>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Welcome to Keyroll - Local-first Personal Data Storage
      </p>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Records"
              value={records.length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Plain"
              value={plainCount}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Refer"
              value={referCount}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
