function DeleteModalDialog({name, closeModal, handleDelete}: {name: string,
    closeModal: ()=> void, handleDelete: (name:string) => void}){
    const handleClick = () =>{
        handleDelete(name)
    };
    return (
        <div id="my_modal_3" className="modal z-10 modal-middle modal-open">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Deleting</h3>
            <p className="py-4">If you want delete {name} channel press OK button.</p>
            <form method="dialog">
                <button className="btn btn-info" onClick={handleClick}>OK</button>
                <button className="btn btn-active btn-squar absolute right-2 top-2"
                        aria-label="close"
                        onClick={closeModal}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </form>

        </div>
        </div>
    );
}

export default DeleteModalDialog;
