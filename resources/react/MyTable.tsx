function MyTable({data, openModal}: { data: any[]; openModal: (name: string) => void }) {
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
                                    <button className="btn">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-error" onClick={()=>openModal(item[0])}>Delete</button>
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
