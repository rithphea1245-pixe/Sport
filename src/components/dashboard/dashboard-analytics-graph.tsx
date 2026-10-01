"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Activity,
  Users,
  Trophy,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface DataPoint {
  month: string;
  monthKm: string;
  attendance: number;
  matches: number;
  traffic: number;
}

const MONTHLY_DATA: DataPoint[] = [
  { month: "Jan", monthKm: "មករា", attendance: 24, matches: 28, traffic: 140 },
  { month: "Feb", monthKm: "កុម្ភៈ", attendance: 31, matches: 34, traffic: 180 },
  { month: "Mar", monthKm: "មីនា", attendance: 42, matches: 46, traffic: 240 },
  { month: "Apr", monthKm: "មេសា", attendance: 68, matches: 62, traffic: 390 },
  { month: "May", monthKm: "ឧសភា", attendance: 48, matches: 45, traffic: 290 },
  { month: "Jun", monthKm: "មិថុនា", attendance: 54, matches: 51, traffic: 330 },
  { month: "Jul", monthKm: "កក្កដា", attendance: 59, matches: 56, traffic: 360 },
  { month: "Aug", monthKm: "សីហា", attendance: 62, matches: 58, traffic: 380 },
  { month: "Sep", monthKm: "កញ្ញា", attendance: 71, matches: 65, traffic: 420 },
  { month: "Oct", monthKm: "តុលា", attendance: 79, matches: 72, traffic: 470 },
  { month: "Nov", monthKm: "វិច្ឆិកា", attendance: 86, matches: 78, traffic: 510 },
  { month: "Dec", monthKm: "ធ្នូ", attendance: 95, matches: 84, traffic: 580 },
];

export function DashboardAnalyticsGraph() {
  const { isKhmer } = useLanguage();
  const [selectedMetric, setSelectedMetric] = useState<"attendance" | "matches" | "traffic">("attendance");
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [timeRange, setTimeRange] = useState<"year" | "q1" | "q2">("year");

  const filteredData =
    timeRange === "q1"
      ? MONTHLY_DATA.slice(0, 6)
      : timeRange === "q2"
      ? MONTHLY_DATA.slice(6, 12)
      : MONTHLY_DATA;

  // Compute SVG dimensions and path
  const svgWidth = 720;
  const svgHeight = 240;
  const paddingX = 40;
  const paddingY = 30;

  const values = filteredData.map((d) => d[selectedMetric]);
  const maxVal = Math.max(...values) * 1.15;
  const minVal = 0;

  const points = filteredData.map((d, i) => {
    const x = paddingX + (i / (filteredData.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((d[selectedMetric] - minVal) / (maxVal - minVal)) * (svgHeight - paddingY * 2);
    return { x, y, data: d };
  });

  // Build smooth bezier path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX1 = p0.x + (p1.x - p0.x) / 2;
    const cpY1 = p0.y;
    const cpX2 = p0.x + (p1.x - p0.x) / 2;
    const cpY2 = p1.y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }

  // Area path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const metricLabels = {
    attendance: {
      title: isKhmer ? "ចំនួនអ្នកទស្សនាកីឡាដ្ឋាន (ពាន់នាក់)" : "Tournament Attendance (k)",
      unit: "k Fans",
      badge: "+34.2% YoY",
    },
    matches: {
      title: isKhmer ? "ការប្រកួតពានរង្វាន់ផ្លូវការ" : "Official Match Fixtures",
      unit: "Matches",
      badge: "+22.8% YoY",
    },
    traffic: {
      title: isKhmer ? "ចរាចរណ៍ API & អ្នកប្រើប្រាស់ (ពាន់)" : "Live API Queries & Traffic",
      unit: "k Req/s",
      badge: "+48.5% YoY",
    },
  };

  return (
    <div className="bg-white dark:bg-[#151B10] rounded-[2rem] border border-[#E2E6D5] dark:border-[#26331B] p-6 sm:p-8 shadow-sm transition-colors mb-8">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E2E6D5] dark:border-[#26331B]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] dark:bg-[#C6FE56] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#616D54] dark:text-[#8E9B7E]">
              {isKhmer ? "ស្ថិតិវិភាគ និងក្រាហ្វិកកីឡា" : "Analytics & Activity Graph"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#12150D] dark:text-white tracking-tight flex items-center gap-2">
            <span>{metricLabels[selectedMetric].title}</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-[#1C2812] dark:text-[#C6FE56] inline-flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {metricLabels[selectedMetric].badge}
            </span>
          </h2>
        </div>

        {/* Metric Switcher & Time Range */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Metric Selector Pills */}
          <div className="flex p-1 bg-[#F4F6EE] dark:bg-[#1E2516] rounded-full border border-[#E2E6D5] dark:border-[#2A371B]">
            <button
              onClick={() => setSelectedMetric("attendance")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedMetric === "attendance"
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-white dark:text-[#12150D] shadow-xs"
                  : "text-[#616D54] dark:text-[#8E9B7E] hover:text-[#12150D] dark:hover:text-white"
              }`}
            >
              {isKhmer ? "អ្នកទស្សនា" : "Attendance"}
            </button>
            <button
              onClick={() => setSelectedMetric("matches")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedMetric === "matches"
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-white dark:text-[#12150D] shadow-xs"
                  : "text-[#616D54] dark:text-[#8E9B7E] hover:text-[#12150D] dark:hover:text-white"
              }`}
            >
              {isKhmer ? "ការប្រកួត" : "Matches"}
            </button>
            <button
              onClick={() => setSelectedMetric("traffic")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedMetric === "traffic"
                  ? "bg-[#12150D] dark:bg-[#C6FE56] text-white dark:text-[#12150D] shadow-xs"
                  : "text-[#616D54] dark:text-[#8E9B7E] hover:text-[#12150D] dark:hover:text-white"
              }`}
            >
              {isKhmer ? "API Traffic" : "API Traffic"}
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex p-1 bg-[#F4F6EE] dark:bg-[#1E2516] rounded-full border border-[#E2E6D5] dark:border-[#2A371B]">
            <button
              onClick={() => setTimeRange("year")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                timeRange === "year"
                  ? "bg-white dark:bg-[#252E1B] text-[#12150D] dark:text-[#C6FE56] shadow-xs font-bold"
                  : "text-[#616D54] dark:text-[#8E9B7E]"
              }`}
            >
              {isKhmer ? "ពេញមួយឆ្នាំ" : "Full Year"}
            </button>
            <button
              onClick={() => setTimeRange("q1")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                timeRange === "q1"
                  ? "bg-white dark:bg-[#252E1B] text-[#12150D] dark:text-[#C6FE56] shadow-xs font-bold"
                  : "text-[#616D54] dark:text-[#8E9B7E]"
              }`}
            >
              {isKhmer ? "ឆមាសទី១" : "H1 (Jan-Jun)"}
            </button>
            <button
              onClick={() => setTimeRange("q2")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                timeRange === "q2"
                  ? "bg-white dark:bg-[#252E1B] text-[#12150D] dark:text-[#C6FE56] shadow-xs font-bold"
                  : "text-[#616D54] dark:text-[#8E9B7E]"
              }`}
            >
              {isKhmer ? "ឆមាសទី២" : "H2 (Jul-Dec)"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Graph Grid: 8 cols SVG Chart, 4 cols Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* SVG Bezier Area Chart */}
        <div className="lg:col-span-8 relative">
          {/* Tooltip Popup */}
          {hoveredPoint && (
            <div
              className="absolute pointer-events-none z-20 px-3 py-2 rounded-xl bg-[#12150D] text-white border border-[#2B3520] shadow-xl text-xs"
              style={{
                left: `${(hoveredPoint.attendance / 100) * 80}%`,
                top: "10px",
              }}
            >
              <p className="font-bold text-[#C6FE56]">
                {isKhmer ? hoveredPoint.monthKm : hoveredPoint.month} 2026
              </p>
              <p className="text-[#E0E6D5]">
                {hoveredPoint[selectedMetric]} {metricLabels[selectedMetric].unit}
              </p>
            </div>
          )}

          <div className="w-full overflow-x-auto pb-2">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[500px] overflow-visible"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#C6FE56" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#C6FE56" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1={paddingX}
                y1={svgHeight - paddingY}
                x2={svgWidth - paddingX}
                y2={svgHeight - paddingY}
                stroke="currentColor"
                className="text-[#E2E6D5] dark:text-[#26331B]"
                strokeWidth="1"
              />
              <line
                x1={paddingX}
                y1={svgHeight / 2}
                x2={svgWidth - paddingX}
                y2={svgHeight / 2}
                stroke="currentColor"
                className="text-[#E2E6D5] dark:text-[#26331B]"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1={paddingX}
                y1={paddingY}
                x2={svgWidth - paddingX}
                y2={paddingY}
                stroke="currentColor"
                className="text-[#E2E6D5] dark:text-[#26331B]"
                strokeDasharray="4 4"
                strokeWidth="1"
              />

              {/* Area Fill */}
              <path d={areaD} fill="url(#chartGradient)" />

              {/* Smooth Bezier Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#16A34A"
                className="dark:stroke-[#C6FE56]"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Data Dots */}
              {points.map((pt, i) => (
                <g
                  key={i}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredPoint(pt.data)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    className="fill-white dark:fill-[#12150D] stroke-[#16A34A] dark:stroke-[#C6FE56] group-hover:r-7 transition-all"
                    strokeWidth="3"
                  />
                  {/* Month Label */}
                  <text
                    x={pt.x}
                    y={svgHeight - 8}
                    textAnchor="middle"
                    className="text-[11px] font-semibold fill-[#616D54] dark:fill-[#8E9B7E]"
                  >
                    {isKhmer ? pt.data.monthKm : pt.data.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Right Side: Quick Analytics & Breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#F8F9F3] dark:bg-[#192113] border border-[#E2E6D5] dark:border-[#263519]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#616D54] dark:text-[#8E9B7E]">
                {isKhmer ? "ការចូលរួមតាមវិញ្ញាសា" : "Discipline Distribution"}
              </span>
              <span className="text-xs font-black text-[#16A34A] dark:text-[#C6FE56]">100%</span>
            </div>

            {/* Discipline Bars */}
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#12150D] dark:text-white mb-1">
                  <span>⚽ Football (CPL)</span>
                  <span className="text-[#616D54] dark:text-[#8E9B7E]">42%</span>
                </div>
                <div className="h-2 w-full bg-[#E2E6D5] dark:bg-[#25301B] rounded-full overflow-hidden">
                  <div className="h-full bg-[#16A34A] dark:bg-[#C6FE56] rounded-full" style={{ width: "42%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#12150D] dark:text-white mb-1">
                  <span>🥊 Kun Khmer Duels</span>
                  <span className="text-[#616D54] dark:text-[#8E9B7E]">31%</span>
                </div>
                <div className="h-2 w-full bg-[#E2E6D5] dark:bg-[#25301B] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "31%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#12150D] dark:text-white mb-1">
                  <span>🏃 Marathon & Athletics</span>
                  <span className="text-[#616D54] dark:text-[#8E9B7E]">16%</span>
                </div>
                <div className="h-2 w-full bg-[#E2E6D5] dark:bg-[#25301B] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "16%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#12150D] dark:text-white mb-1">
                  <span>🏸 Badminton & Indoor</span>
                  <span className="text-[#616D54] dark:text-[#8E9B7E]">11%</span>
                </div>
                <div className="h-2 w-full bg-[#E2E6D5] dark:bg-[#25301B] rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "11%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Stadium Peak Capacity Insight */}
          <div className="p-4 rounded-2xl bg-[#12150D] text-white border border-[#2B3520] shadow-md flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#C6FE56] font-bold uppercase tracking-wider">
                {isKhmer ? "ពហុកីឡដ្ឋានសកម្មបំផុត" : "Most Active Arena"}
              </p>
              <p className="text-sm font-black text-white mt-0.5">
                Morodok Techo Stadium
              </p>
              <p className="text-[11px] text-[#8E9B7E] mt-0.5">
                58,400 max peak capacity recorded
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#C6FE56] text-[#12150D] flex items-center justify-center font-black shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
