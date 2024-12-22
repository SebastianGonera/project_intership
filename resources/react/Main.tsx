import MyChart from "./MyChart";
const data =[
    ["Kanal", "Liczba"],
    ["Google", 234],
    ["Facebook", 111],
    ["ASDF",456],
    ["FGJ",888],];

function Main() {

    return(
        <div>
            <h1>Działa</h1>
            <MyChart data={data}></MyChart>
        </div>
    );
}

export default Main;
