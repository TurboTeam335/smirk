import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload[0] && payload[0].payload) {
    const dateParts = label.split('-');
    const formattedDate = `${dateParts[1]}-${dateParts[2]}`;

    return (
      <div
        className='custom-tooltip'
        style={{
          backgroundColor: 'rgba(29, 29, 31, .8)',
          color: '#F5F5F7',
          padding: '8px',
        }}
      >
        <label>{`${formattedDate} | $${payload[0].payload.price}`}</label>
      </div>
    );
  }

  return null;
};


const formatDate = tickItem => {
  const date = new Date(tickItem);
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`; // format as MM-DD with padding
};

const SimpleLineChart = ({ data }) => (
  <ResponsiveContainer width='100%' height={200}>
    <LineChart
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 35,
        bottom: 10,
      }}
    >
      <Line type='monotone' dataKey='price' stroke='#cc5500' strokeWidth={2} />
      <CartesianGrid stroke='#f0f0f0' />
      <XAxis
  dataKey="date"
  stroke="#8884d8"
  tickFormatter={formatDate}
  tick={{ fill: '#666' }}
  padding={{ left: 30, right: 30 }}
  label={{
    value: 'Date',
    position: 'insideBottomRight',
    offset: -10, 
  }}
/>
<YAxis
  stroke="#8884d8"
  domain={['dataMin - 5', 'dataMax + 5']}
  tick={{ fill: '#666' }}
  tickFormatter={(value) => value.toFixed(2)}
  label={{
    value: 'Price',
    angle: -90,
    position: 'insideLeft',
    offset: -15, 
  }}
/>


      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  </ResponsiveContainer>
);

export default SimpleLineChart;
