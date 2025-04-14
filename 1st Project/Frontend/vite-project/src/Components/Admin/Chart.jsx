import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import Cookies from 'js-cookie';

const DashboardCharts = () => {
    const navigate = useNavigate();
    const [series, setSeries] = useState([]);
    const [pieOptions, setPieOptions] = useState({
        chart: {
            type: 'pie',
            toolbar: {
                show: true,
                tools: {
                    download: true,  // Enable the download button for Pie chart
                },
            },
        },
        labels: ['Completed', 'Rejected', 'Pending', 'In Process', 'Ticket Raised'],
        colors: ['#2ecc71', '#e74c3c', '#f1c40f', '#3498db', '#9b59b6'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    });

    const [barSeries, setBarSeries] = useState([
        {
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ]);

    const [stackedBarSeries, setStackedBarSeries] = useState([
        {
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43, 21, 49],
        },
        {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27, 33, 12],
        },
        {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14, 15, 13],
        },
    ]);

    const barChartOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => "$ " + val + " thousands",
            },
        },
    };

    const stackedBarChartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 100,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 200,
                },
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0,
                    },
                },
            },
        ],
        xaxis: {
            categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
            labels: {
                position: 'bottom', // Labels below the bars
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: 'bottom', // Adjusted legend positioning
            offsetX: 0,
            offsetY: 0,
        },
    };

    useEffect(() => {
        const userCookie = Cookies.get('Name');
        if (!userCookie) {
            navigate('/admin');
        }
    }, [navigate]);

    useEffect(() => {
        fetch('http://localhost:5000/Admin/ChartData')
            .then((response) => response.json())
            .then((data) => {
                if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
                    console.error("Invalid data structure:", data);
                    return;
                }

                const counts = data.data[0];
                const completed = counts.Completed || 0;
                const rejected = counts.Rejected || 0;
                const pending = counts.Pending || 0;
                const process = counts.Process || 0;
                const ticketRaised = counts["Ticket Raised"] || 0;

                const chartData = [completed, rejected, pending, process, ticketRaised];
                setSeries(chartData);
            })
            .catch((error) => {
                console.error('Error fetching chart data:', error);
            });
    }, []);

    return (
        <main className="p-6 space-y-10">
            <div className="head-title">
                <div className="left">
                    <h1 className="text-2xl font-semibold">Chart</h1>
                    <ul className="breadcrumb">
                        <li><Link to="/">Chart</Link></li>
                        <li><i className="bx bx-chevron-right"></i></li>
                        <li><Link to="/" className="active">Home</Link></li>
                    </ul>
                </div>
            </div>

            {series && series.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Pie Chart */}
                        <div className="bg-white shadow rounded p-4">
                            <h3 className="text-lg font-medium mb-2">Pie Chart</h3>
                            <div className="flex items-center justify-center">
                                <Chart options={pieOptions} series={series} type="pie" width="500" height="300" />
                            </div>
                        </div>

                        {/* Grouped Bar Chart */}
                        <div className="bg-white shadow rounded p-4">
                            <h3 className="text-lg font-medium mb-2">Grouped Bar Chart</h3>
                            <div className="flex items-center justify-center">
                                <Chart options={barChartOptions} series={barSeries} type="bar" width="500" height="300" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* 100% Stacked Bar Chart */}
                        <div className="bg-white shadow rounded p-4">
                            <h3 className="text-lg font-medium mb-2">100% Stacked Bar Chart</h3>
                            <div className="flex items-center justify-center">
                                <Chart options={stackedBarChartOptions} series={stackedBarSeries} type="bar" width="500" height="300" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading chart...</p>
            )}
        </main>
    );
};

export default DashboardCharts;
