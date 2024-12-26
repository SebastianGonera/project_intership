import MyChart from "./MyChart";
import {useEffect, useState} from "react";
import {getChannels, deleteChannel, updateAmount, addChannel} from "./services";
import MyTable from "./MyTable";
import DeleteModalDialog from "./DeleteModalDialog";
import UpdateForm from "./UpdateForm";
import AddChannelForm from "./AddChannelForm";


function Main() {
    const [data, setData] = useState<(string | number)[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);
    const [amount, setAmount] = useState<number | string>();

    const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);

    const closeModal = () => {
        setIsModalOpen(false);
    }
    const openModal = (name_: string) => {
        setName(name_);
        setIsModalOpen(true);
    }

    const closeUpdateForm = () => {
        setIsUpdateFormOpen(false);
    }

    const openUpdateForm = (newAmount: number, name_: string) => {
        setName(name_);
        setAmount(newAmount);
        setIsUpdateFormOpen(true);
    }

    const openAddForm = ()=> setIsAddFormOpen(true);
    const closeAddForm=()=>setIsAddFormOpen(false);

    // @ts-ignore
    const handleAdd = async (newName:string, newAmount: number) => {
        try {
            closeAddForm();
            await addChannel(newName, newAmount);
            await fetchData();
        } catch (error) {
            console.error('Error adding channel:', error);
        }
    };

    // @ts-ignore
    const handleUpdate = async (newAmount: number) => {
        try {
            closeUpdateForm();
            await updateAmount(name, newAmount);
            await fetchData();
        } catch (error) {
            console.error('Error updating channel:', error);
        }
    };

    // @ts-ignore
    const handleDelete = async (name: string) => {
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
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-lg">Loading</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="mt-2 mb-2 ml-2">
                <button className="btn btn-primary" onClick={openAddForm}>
                    Add New Channel
                </button>
            </div>

            <div className="w-full">
                <MyChart
                    data={data}
                />
            </div>

            {isAddFormOpen && (
                <AddChannelForm
                    onAdd={handleAdd}
                    closeAddForm={closeAddForm}
                />
            )}

            <div className="w-full">
                <MyTable
                    data={data}
                    openModal={openModal}
                    openUpdateForm={openUpdateForm}
                />
            </div>

            {isModalOpen && (
                <DeleteModalDialog
                    name={name}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            )}

            {isUpdateFormOpen && (
                <UpdateForm
                    name={name}
                    currentAmount={amount}
                    onUpdate={handleUpdate}
                    closeUpdateForm={closeUpdateForm}
                />
            )}
        </div>
    );

}

export default Main;
