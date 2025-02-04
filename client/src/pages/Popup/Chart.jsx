import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ roleCounts }) => {
    const [chartType, setChartType] = useState("bar");

    const [chartOptions, setChartOptions] = useState({
        chart: {
            height: 350,
            type: chartType,
            dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1,
            },
        },
        title: {
            text: "Users by Role",
            style: {
                fontSize: "18px",
                fontWeight: "bold",
            },
        },
        stroke: {
            width: 2,
        },
        fill: {
            opacity: 0.8,
        },
        markers: {
            size: 0,
        },
        yaxis: {
            show: false,
        },
        xaxis: {
            categories: ["Admin", "Student", "Recruiter"],
        },
        labels: ["Admin", "Student", "Recruiter"],
    });

    const [chartSeries, setChartSeries] = useState([
        {
            name: "Users by Role",
            data: [roleCounts.admin || 0, roleCounts.student || 0, roleCounts.recruiter || 0],
        },
    ]);

    const handleChartTypeChange = (event) => {
        const selectedType = event.target.value;
        setChartType(selectedType);

        setChartOptions((prevOptions) => ({
            ...prevOptions,
            chart: {
                ...prevOptions.chart,
                type: selectedType === "funnel" ? "bar" : selectedType,
            },
            plotOptions:
                selectedType === "donut"
                    ? {
                        pie: {
                            donut: {
                                size: "65%",
                            },
                        },
                    }
                    : {},
        }));

        if (selectedType === "donut") {
            setChartSeries([
                roleCounts.admin || 0,
                roleCounts.student || 0,
                roleCounts.recruiter || 0,
            ]);
        } else {
            setChartSeries([
                {
                    name: "Users by Role",
                    data: [roleCounts.admin || 0, roleCounts.student || 0, roleCounts.recruiter || 0],
                },
            ]);
        }
    };

    return (
        <div className="m-2">
            <div className="mb-3">
                <label htmlFor="chartType">Select Chart Type: </label>
                <select id="chartType" className="form-select" value={chartType} onChange={handleChartTypeChange}>
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="area">Area</option>
                    <option value="donut">Donut</option>
                </select>
            </div>

            <div id="chart">
                <ReactApexChart options={chartOptions} series={chartSeries} type={chartType} height={350} />
            </div>
        </div>
    );
};

export default Chart;
