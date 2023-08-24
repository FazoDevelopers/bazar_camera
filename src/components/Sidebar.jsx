import React from 'react';
import { Container, Paper, Text, Button } from '@mantine/core';

const Sidebar = () => {
  return (
    <Container size="sm" style={{ display: 'flex' }}>
      <Paper padding="md" shadow="xs" style={{ width: 250 }}>
        <Text size="xl" style={{ marginBottom: 16 }}>
          Sidebar
        </Text>
        <Button fullWidth variant="outline">Item 1</Button>
        <Button fullWidth variant="outline">Item 2</Button>
        <Button fullWidth variant="outline">Item 3</Button>
        <Button fullWidth variant="outline">Item 4</Button>
      </Paper>
      <div style={{ flex: 1, marginLeft: 20 }}>
        <Text size="xl">Main Content</Text>
      </div>
    </Container>
  );
};

export default Sidebar;
