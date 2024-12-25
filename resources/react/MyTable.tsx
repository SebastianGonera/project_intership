function MyTable({data, openModal, openUpdateForm}:
                     {
                         data: any[];
                         openModal: (name: string) => void ;
                         openUpdateForm:(newAmount: number, name_:string)=>void
                     }
    ) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                <tr>
                    <th>Channel</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                    data
                        .filter((item) => item[0] != 'Channel')
                        .map((item) => (
                            <tr key={item[0]}>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={()=>openUpdateForm(item[1], item[0])}
                                    >Update</button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-error"
                                        onClick={()=>openModal(item[0])}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default MyTable;
