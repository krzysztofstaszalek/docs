// src/components/PingCastleEditionTabs.js
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function PingCastleEditionTabs({ children }) {
  return (
    <Tabs
      groupId="editions"
      defaultValue="enterprise"
      values={[
        { label: 'Basic/Standard Edition', value: 'basic' },
        { label: 'Pro Edition', value: 'pro' },
        { label: 'Enterprise Edition', value: 'enterprise' },
      ]}
    >
      {children}
    </Tabs>
  );
}
