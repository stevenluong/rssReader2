import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';


export default function Keywords() {
  return (
    <React.Fragment>
      <Title>Keywords</Title>
      <ResponsiveContainer>
        <a href="#">coronavirus</a>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
