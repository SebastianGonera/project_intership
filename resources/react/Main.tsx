import MyChart from "./MyChart";
import {useEffect, useState} from "react";
import {getChannels, deleteChannel} from "./services";
import MyTable from "./MyTable";
import DeleteModalDialog from "./DeleteModalDialog";


function Main() {
    const [data, setData] = useState<(string | number)[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const closeModal = () =>{
        setIsModalOpen(false);
    }
    const openModal = (name_: string)=>{
        setName(name_);
        setIsModalOpen(true);
    }

    // @ts-ignore
    const handleDelete = async(name: string)=>{
        try {
            closeModal();
            await deleteChannel(name);
            await fetchData();
        } catch (error) {
            console.error('Error deleting channel:', error);
        }
    }
    // @ts-ignore
    const fetchData = async () => {
        const result = await getChannels();
        const chartData = [
            ["Channel", "Amount"],
            ...result
        ];
        setData(chartData);
        setLoading(false);
    };

    useEffect((): void => {
        fetchData();
    }, []);


    if (loading) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    return(
        <div>
            <MyChart data={data}></MyChart>
            <MyTable data={data} openModal={openModal}></MyTable>
            {isModalOpen && (
                <DeleteModalDialog
                    name={name}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default Main;
