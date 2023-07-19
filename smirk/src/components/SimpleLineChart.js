import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
        <label>{`${label} : ${payload[0].value}`}</label>
      </div>
    );
  }

  return null;
};

const formatDate = (tickItem) => {
  const date = new Date(tickItem);
  return `${date.getMonth() + 1}-${date.getDate()}`;  // format as MM-DD
};

const SimpleLineChart = ({ data }) => (
  <LineChart width={700} height={200} data={data}>
    <Line type="monotone" dataKey="price" stroke="#cc5500" strokeWidth={2} />
    <CartesianGrid stroke="#aaa" />
    <XAxis dataKey="date" stroke="#8884d8" tickFormatter={formatDate} />
    <YAxis stroke="#8884d8" />
    <Tooltip content={<CustomTooltip />} />
  </LineChart>
);

export default SimpleLineChart;
