import MyChart from "./MyChart";
import {useEffect, useState} from "react";
import {getChannels, deleteChannel, updateAmount} from "./services";
import MyTable from "./MyTable";
import DeleteModalDialog from "./DeleteModalDialog";
import UpdateForm from "./UpdateForm";


function Main() {
    const [data, setData] = useState<(string | number)[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);
   const [amount, setAmount] = useState<number|string>();

    const closeModal = () =>{
        setIsModalOpen(false);
    }
    const openModal = (name_: string)=>{
        setName(name_);
        setIsModalOpen(true);
    }

    const closeUpdateForm = () =>{
        setIsUpdateFormOpen(false);
    }
    const openUpdateForm = (newAmount:number, name_: string)=>{
        setName(name_);
        setAmount(newAmount);
        setIsUpdateFormOpen(true);
    }
    // @ts-ignore
    const handleUpdate= async(newAmount: number)=>{
      try{
          closeUpdateForm();
          await updateAmount(name, newAmount);
          await fetchData();
      }
      catch (error) {
          console.error('Error updating channel:', error);
      }
    };

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
            <MyTable
                data={data}
                openModal={openModal}
                openUpdateForm={openUpdateForm}
            />
            {isModalOpen && (
                <DeleteModalDialog
                    name={name}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            )}

            {
                isUpdateFormOpen && (
                    <UpdateForm
                        name={name}
                        currentAmount={amount}
                        onUpdate={handleUpdate}
                        closeUpdateForm={closeUpdateForm}
                    />
                )
            }
        </div>
    );
}

export default Main;
