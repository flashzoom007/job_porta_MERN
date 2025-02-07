import React, { useState } from "react";
import Chart from "react-apexcharts";

const generateData = (count, range) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            x: `Category ${i + 1}`,
            y: Math.floor(Math.random() * (range.max - range.min + 1)) + range.min,
        });
    }
    return data;
};

const HeatmapChart = () => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];    
    // const month = ['Metric1', 'Metric2', 'Metric3', 'Metric4', 'Metric5', 'Metric6', 'Metric7', 'Metric8', 'Metric9',];

    const [chartData] = useState({
        series: month.map((props) => ({
            month: props,
            data: generateData(18, { min: 0, max: 90 })
        })),
        options: {
            dataLabels: { enabled: false },
            stroke: { width: 1 },
            // title: { text: 'HeatMap Chart (Single color)' },
            title: { text: "HeatMap Chart with Color Range" },
            colors: ["#008FFB"],
            plotOptions: {
                heatmap: {       
                    shadeIntensity: 0.5,
                    radius: 0,
                    useFillColorAsStroke: true,
                    colorScale: {
                        ranges: [
                            { from: -30, to: 5, name: "Low", color: "#00A100" },
                            { from: 6, to: 20, name: "Medium", color: "#128FD9" },
                            { from: 21, to: 45, name: "High", color: "#FFB200" },
                            { from: 46, to: 55, name: "Extreme", color: "#FF0000" },
                        ],
                    },
                },
            },

        },
    });

    return <Chart options={chartData.options} series={chartData.series} type="heatmap" height={500} />;
    // return (
    //     <select
    //         id="chartType"
    //         className="form-select w-25"
    //         // onChange={(e) => filterByRole(e.target.value)}
    //         value=''>
    //         <option value="">All Charts </option>
    //         <option value="singleColor">HeatMap Chart (Single color) </option>
    //         <option value="diffrentShades">HeatMap Chart (Different color shades for each series) </option>
    //         <option value="ColorRange">HeatMap Chart with Color Range </option>
    //     </select>)
};

export default HeatmapChart;
