import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RevenueChart({ data }) {
    
    return (
        <div style={{height:'600px', width:'100%'}}>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={'100%'}
                    height={'600px'}
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 18,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis  />
                    <Tooltip />
                    <Legend />
                    <Line type="monotoneX" dataKey="revenue" label='trieu VND' stroke="#0d5de7" activeDot={{ r: 10 }} />
                    <Line type="monotoneX" dataKey="expense" label='trieu VND' stroke="#e70d14" activeDot={{ r: 10 }} />

                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

export default RevenueChart;