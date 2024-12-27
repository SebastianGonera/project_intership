import {useState} from "react";

function UpdateForm({name, currentAmount, onUpdate, closeUpdateForm}: {name: string;
    currentAmount: number | string; onUpdate:(newAmount: number)=>void;
    closeUpdateForm:()=>void}){
    const [value, setValue] = useState<number | string>(currentAmount);
    const [error, setError] = useState<string | null>(null);
    const validateValue = (inputValue: string): boolean=>{
        const numericValue = Number(inputValue);
        if(isNaN(numericValue)){
            setError("Please enter a valid number");
            return false;
        }
      if(numericValue < 0){
          setError("The value can not be lower than 0. Amount can be equal or greater than 0.")
          return false;
      }
      setError(null);
      return true;
    };
    const handleChange = (event: { target: { value: any; }; })=>{
        const inputValue= event.target.value;

        if (inputValue === ""){
            setValue("");
            setError("It can not be empty. Please enter number.");
            return;
        }

        if(validateValue(inputValue)){
            setValue(Number(inputValue));
        }
        else{
            setValue(inputValue);
        }
    };

    const handleSubmit = (event: { preventDefault: () => void; })=>{
        event.preventDefault();
        if(validateValue(String(value))){
            onUpdate(Number(value));
        }
    };

    return (
        <div className="modal z-10 modal-middle modal-open">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Update amount of {name}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    placeholder="Enter number"
                    onChange={handleChange}
                    className={`input input-bordered ${error ? "input-error" : ""}`}
                />
                <div>
                      {error && <span className="text-error mt-1 text-sm">{error}</span>}
                </div>
                <button type="submit" className="btn btn-primary mt-2" aria-label="confirmUpdate" disabled={!!error}>Update</button>
                <button className="btn btn-active btn-squar absolute right-2 top-2"
                        aria-label="close"
                        onClick={closeUpdateForm}>
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

export default UpdateForm;
