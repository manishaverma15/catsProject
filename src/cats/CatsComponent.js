import * as React from 'react';
import Card from '@mui/material/Card';
import TabPanel from '../tabs/CardTabComponent';

const CatsMainCard = () => {
  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', marginTop: '20px' }}>
      <TabPanel/>
    </Card>
  );
}
export default CatsMainCard;