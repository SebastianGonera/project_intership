import {Chart} from 'react-google-charts';

function MyChart(props) {
    const chartEvents = [{
        eventName: "select",
        callback({chartWrapper}){
            console.log("Wybrtano: ", chartWrapper.getChart().getSelection());
        }
    }];
    return (
        <div>
            <p>{props.data[0][0]} </p>
            <Chart
                chartType={"PieChart"}
                data={props.data}
                width={"100%"}
                height={"400px"}
                chartEvents={chartEvents}
            />
        </div>
    );
}

export default MyChart;
