import React from 'react';
import { Card } from 'antd';

const FirstC: React.FC = () => (
  <Card title="Login" bordered={false} style={{ width: 300 }}>
    <p>Welcome to Thndr!</p>
    <p>Please enter Movie name.</p>
  </Card>
);

export default FirstC;