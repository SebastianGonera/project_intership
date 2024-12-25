import {Chart} from 'react-google-charts';

function MyChart({data}: {data:(string | number)[][]}) {
    return (
        <div>
            <Chart
                chartType={"PieChart"}
                width={"100%"}
                data={data}
                height={"400px"}
            />

        </div>
    );
}

export default MyChart;
