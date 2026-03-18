import { Card, Row, Col, Statistic } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import { listRecords } from '../services/records';
import type { IRecord } from '../../shared/types';

export default function Dashboard() {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listRecords().then(data => {
      setRecords(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

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
              value={loading ? 0 : records.length}
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
