import {useState} from "react";

function AddChannelForm({onAdd, closeAddForm}: {
    onAdd:(newName: string, newAmount:number)=>void;
    closeAddForm:()=>void
}){
    const [amount, setAmount] = useState<string | number>("");
    const [name, setName] = useState<string>("");
    const [amountError, setAmountError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);

    const validateAmount = (inputAmount: string | number): boolean=>{
        if(inputAmount === ""){
            setAmountError("Amount can not be empty. Please fill this field.");
            return false;
        }
        const numericValue = Number(inputAmount);
        if(isNaN(numericValue)){
            setAmountError("Please enter a valid number");
            return false;
        }
        if(numericValue < 0){
            setAmountError("The value can not be lower than 0. Amount can be equal or greater than 0.")
            return false;
        }
        setAmountError(null);
        return true;
    };

    const validateName = (inputName: string): boolean =>{
        if(inputName === ""){
            setNameError("Name can not be empty. Please fill this field.");
            return false;
        }
        if(inputName.length < 4){
            setNameError("Channel name must be at least 4 characters long.");
            return false;
        }
        setNameError(null);
        return  true;
    };

    const handleAmountChange=(event: { target: { value: any; }; })=>{
        const amountInput = event.target.value;
        if(validateAmount(amountInput)){
            setAmount(Number(amountInput));
        }
        else{
            setAmount(amountInput);
        }
    };

    const handleNameChange=(event: { target: { value: any; }; })=>{
        const nameInput = event.target.value;
        validateName(nameInput);
        setName(nameInput);
    };

    const isFormValid = (): boolean => {
        return nameError === null && amountError === null && name !== null && name !== "" && amount !== "";
    };

    const handleSubmit = (event: { preventDefault: () => void; })=>{
        event.preventDefault();
        if(validateAmount(amount) && validateName(name)){
          onAdd(name, Number(amount));
        }
    };

    return (
        <div className="modal z-10 modal-middle modal-open">
            <div className="modal-box flex justify-center items-center">

                <form  onSubmit={handleSubmit}>
                    <label htmlFor="name_input">Channel name: </label>
                    <div>
                        <input
                            id="name_input"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter channel name"
                            className={`mb-1 input input-bordered ${nameError ? "input-error" : ""}`}
                        />
                        <div>
                            {nameError && <span className="text-error mt-1 mb-1 text-sm">{nameError}</span>}
                        </div>
                    </div>
                    <label htmlFor="amount_input">Amount value: </label>
                    <div>
                        <input
                            id="amount_input"
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount of clients"
                            className={`mb-1 input input-bordered ${amountError ? "input-error" : ""}`}
                        />
                        <div>
                            {amountError && <span className="text-error mt-1 mb-1 text-sm">{amountError}</span>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mt-2"
                        disabled={!isFormValid()}>
                        Confirm
                    </button>
                    <button
                        className="btn btn-active btn-squar absolute right-2 top-2"
                        aria-label="close"
                        onClick={closeAddForm}>
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

export default AddChannelForm;
