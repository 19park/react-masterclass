import { useOutletContext } from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchCoinHistory } from "../api";
import styled from "styled-components";
import ApaxChart from "react-apexcharts";
import { useContext } from "react";
import { AppContext } from "../App";

const Loader = styled.span`
    text-align: center;
    display: block;
    color: ${props => props.theme.boxColor};
`;

interface IChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart() {
    const { themeMode } = useContext(AppContext);
    const {coinId} = useOutletContext<IChartProps>();
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId], 
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );
    const isDark = themeMode === "dark";

    return <div>
        {isLoading ? 
            <Loader>"Loading Chart..."</Loader> :
            <ApaxChart 
                type="candlestick"
                series={[
                    {
                        name: "Price",
                        data: data?.map(v => ({
                            x: new Date(v.time_open),
                            y: [v.open, v.high, v.low, v.close]?.map(v => v.toFixed(2)),
                        })) ?? []
                    }
                ]}
                options={{
                    theme: {
                        mode: isDark ? "dark" : "light"
                    },
                    chart: {
                        width: 500,
                        height: 300,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent"
                    },
                    grid: {
                        show: false,
                    },
                    stroke: {
                        curve: "smooth",
                        width: 5,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        type: 'datetime',
                        labels: {
                            show: false,
                        },
                        axisTicks: {
                            show: false,
                        },
                        axisBorder: {
                            show: false,
                        },
                        categories: data?.map(price => price.time_close) || []
                    },
                    // fill :{
                    //     type: "gradient",
                    //     gradient: {
                    //         gradientToColors: ["#0be881"],
                    //         stops: [0, 100]
                    //     }
                    // },
                    // colors: ["#0fbcf9"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$ ${value.toFixed(2)}`
                        }
                    }
                }}
            />
        }
    </div>
}

export default Chart;