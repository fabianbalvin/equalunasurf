
import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  Label,
  // FIX: Imported ReferenceLine directly from recharts.
  ReferenceLine,
} from 'recharts';

interface Point {
  x: number;
  y: number;
  name?: string;
}

interface LineDefinition {
  formula: (x: number) => number;
  color: string;
  name?: string;
}

interface InteractiveGraphProps {
  points?: Point[];
  lines?: LineDefinition[];
}

const InteractiveGraph: React.FC<InteractiveGraphProps> = ({ points = [], lines = [] }) => {
  const domain = [-10, 10];

  const lineData = useMemo(() => {
    const data: { x: number; [key: string]: number | undefined }[] = [];
    for (let i = domain[0]; i <= domain[1]; i += 0.5) {
      const dataPoint: { x: number; [key: string]: number | undefined } = { x: i };
      lines.forEach((line, index) => {
        dataPoint[`y${index}`] = line.formula(i);
      });
      data.push(dataPoint);
    }
    return data;
  }, [lines, domain]);
  
  const allYValues = [
    ...points.map(p => p.y), 
    ...lineData.flatMap(d => Object.values(d).slice(1) as number[])
  ].filter(y => y !== undefined && isFinite(y));
  
  const yDomain = [
      Math.min(-10, ...allYValues) - 1,
      Math.max(10, ...allYValues) + 1
  ];

  return (
    <div className="w-full h-96 bg-slate-50 p-4 rounded-lg border border-slate-200">
      <ResponsiveContainer>
        <LineChart
          data={lineData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={domain}
            tickCount={11}
            allowDataOverflow={true}
            stroke="#94a3b8"
          >
            <Label value="Eixo X" offset={-15} position="insideBottom" fill="#475569"/>
          </XAxis>
          <YAxis 
            type="number" 
            domain={yDomain} 
            allowDataOverflow={true} 
            stroke="#94a3b8"
          >
            <Label value="Eixo Y" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#475569"/>
          </YAxis>

          <Tooltip
            formatter={(value, name, props) => [`${(value as number).toFixed(2)}`, `y`]}
            labelFormatter={(label) => `x: ${label}`}
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #ccc',
                borderRadius: '8px',
            }}
          />
          <Legend wrapperStyle={{paddingTop: '20px'}}/>
          
          <Line type="monotone" dataKey="x" stroke="transparent" dot={false} legendType="none" />
          
          {lines.map((line, index) => (
            <Line
              key={index}
              type="linear"
              dataKey={`y${index}`}
              stroke={line.color}
              strokeWidth={3}
              dot={false}
              name={line.name || `Reta ${index + 1}`}
            />
          ))}

          {points.length > 0 && (
            <Scatter name="Pontos" data={points} fill="#dc2626">
                {points.map((p, i) => <Label key={i} value={p.name} position="right" offset={5}/>)}
            </Scatter>
          )}

           {/* Zero axes */}
          <Line dataKey={() => 0} stroke="#94a3b8" strokeWidth={1.5} dot={false} legendType="none" xAxisId={0}/>
          <ReferenceLine y={0} stroke="#94a3b8" strokeWidth={1.5} />
          <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={1.5} />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// FIX: Removed hacky ReferenceLine component that used `require` and caused an error.
// The component is now imported directly from recharts.

export default InteractiveGraph;
