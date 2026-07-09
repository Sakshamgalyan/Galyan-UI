'use client';

import React from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'donut';

export interface ChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface ChartProps {
  type: ChartType;
  data: any[];
  xAxisKey?: string;
  series?: ChartSeries[]; // for line, bar, area
  nameKey?: string;       // for pie
  valueKey?: string;      // for pie
  height?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  className?: string;
}

const DEFAULT_COLORS = [
  'var(--gy-primary)',
  'var(--gy-success)',
  'var(--gy-warning)',
  'var(--gy-danger)',
  'var(--gy-info)',
  '#8b5cf6',
  '#ec4899',
];

export function Chart({
  type,
  data,
  xAxisKey,
  series = [],
  nameKey,
  valueKey,
  height = 300,
  showGrid = true,
  showLegend = true,
  className = '',
}: ChartProps) {
  const commonAxisProps = {
    stroke: 'var(--gy-border-strong)',
    tick: { fill: 'var(--gy-text-subtle)', fontSize: 12 },
    tickLine: { stroke: 'var(--gy-border)' },
  };

  const commonTooltipProps = {
    contentStyle: {
      backgroundColor: 'var(--gy-surface)',
      borderColor: 'var(--gy-border)',
      borderRadius: 'var(--gy-radius-lg)',
      boxShadow: 'var(--gy-shadow-md)',
      color: 'var(--gy-text)',
      fontSize: 13,
    },
    itemStyle: { color: 'var(--gy-text)' },
  };

  const renderContent = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--gy-border)" vertical={false} />}
            <XAxis dataKey={xAxisKey} {...commonAxisProps} />
            <YAxis {...commonAxisProps} />
            <Tooltip {...commonTooltipProps} />
            {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {series.map((s, i) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name ?? s.key}
                stroke={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: 'var(--gy-surface)' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--gy-border)" vertical={false} />}
            <XAxis dataKey={xAxisKey} {...commonAxisProps} />
            <YAxis {...commonAxisProps} />
            <Tooltip {...commonTooltipProps} cursor={{ fill: 'var(--gy-background-muted)' }} />
            {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name ?? s.key}
                fill={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              {series.map((s, i) => {
                const color = s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
                return (
                  <linearGradient key={`grad-${s.key}`} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                );
              })}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--gy-border)" vertical={false} />}
            <XAxis dataKey={xAxisKey} {...commonAxisProps} />
            <YAxis {...commonAxisProps} />
            <Tooltip {...commonTooltipProps} />
            {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {series.map((s, i) => {
              const color = s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
              return (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name ?? s.key}
                  stroke={color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#grad-${s.key})`}
                />
              );
            })}
          </AreaChart>
        );

      case 'pie':
      case 'donut':
        return (
          <PieChart>
            <Tooltip {...commonTooltipProps} />
            {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
            <Pie
              data={data}
              dataKey={valueKey!}
              nameKey={nameKey!}
              cx="50%"
              cy="50%"
              innerRadius={type === 'donut' ? '60%' : 0}
              outerRadius="80%"
              stroke="var(--gy-surface)"
              strokeWidth={2}
              paddingAngle={type === 'donut' ? 2 : 0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        );
    }
  };

  return (
    <div className={`gy-chart ${className}`} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderContent()}
      </ResponsiveContainer>
    </div>
  );
}
