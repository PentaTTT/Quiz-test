//import ReactPaginate from 'react-paginate';

const TableQuiz = (props) => {
    let { listQuiz, clickBtnUpdate, clickBtnView, clickBtnDelete, } = props

    // // Invoke when user click to request another page.
    // const handlePageClick = (event) => {
    //     props.listUserWithPaginate(+event.selected + 1)
    //     setCurrentPage(+event.selected + 1)
    // };

    return (
        <>
            <table className="table table-striped table-hover table-bordered mt-2">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Quiz name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listQuiz && listQuiz?.length > 0 ? listQuiz.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => { clickBtnView(item) }}>Detail</button>
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
            {/* <div className='d-flex justify-content-center'>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div> */}

        </>
    );
}
export default TableQuiz;