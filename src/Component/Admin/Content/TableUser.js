

const TableUser = (props) => {
    let { listUser, clickBtnUpdate, clickBtnView, clickBtnDelete } = props
    return (
        <>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser && listUser?.length > 0 ? listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => { clickBtnView(item) }}>View</button>
                                        <button className="btn btn-warning mx-2" onClick={() => { clickBtnUpdate(item) }}>Update</button>
                                        <button className="btn btn-danger" onClick={() => { clickBtnDelete(item) }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                            :
                            <tr className="text-center">
                                <th scope="row"></th>
                                <td colSpan={4}>no data</td>
                            </tr>
                    }

                </tbody>
            </table>
        </>
    );
}

export default TableUser;