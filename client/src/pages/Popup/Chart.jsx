import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ roleCounts}) => {
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

        const total = roleCounts.admin + roleCounts.student + roleCounts.recruiter;

        const adminPercentage = total ? parseFloat(((roleCounts.admin / total) * 100).toFixed(2)) : 0;
        const studentPercentage = total ? parseFloat(((roleCounts.student / total) * 100).toFixed(2)) : 0;
        const recruiterPercentage = total ? parseFloat(((roleCounts.recruiter / total) * 100).toFixed(2)) : 0;

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
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return `${val.toFixed(2)}%`;
                        },
                    },
        }));
        
        if (selectedType === "donut") {
            setChartSeries([adminPercentage, studentPercentage, recruiterPercentage]);
            console.log('adminPercentage: ',adminPercentage, 'studentPercentage: ',studentPercentage, 'recruiterPercentage: ',recruiterPercentage)
        } else {
            setChartSeries([
                {
                    name: "Users by Role",
                    data: [adminPercentage, studentPercentage, recruiterPercentage],
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
