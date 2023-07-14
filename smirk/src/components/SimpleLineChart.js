import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {name: 'Jan', uv: 4000},
  {name: 'Feb', uv: 3000},
  {name: 'Mar', uv: 2000},
  {name: 'Apr', uv: 2780},
  {name: 'May', uv: 1890},
  {name: 'Jun', uv: 2390},
  {name: 'Jul', uv: 3490},
];

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

const SimpleLineChart = () => (
  <LineChart width={300} height={100} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#cc5500" strokeWidth={2} />
    <CartesianGrid stroke="#aaa" />
    <XAxis dataKey="name" stroke="#8884d8" />
    <YAxis stroke="#8884d8" />
    <Tooltip content={<CustomTooltip />} />
  </LineChart>

);

export default SimpleLineChart;
