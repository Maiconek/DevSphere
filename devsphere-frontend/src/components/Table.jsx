import React from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
    return (
        <table className="table table-hover w-75">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Link</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {props.projects.map((item, index) => (
                    <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.title}</td>
                        <td><img src={item.imageUrl} className="image-table" alt="image"/></td>
                        <td>{item.link}</td>
                            <td>
                                <Link to={`/project/${item.id}`}>
                                    <button type="button" className="btn btn-primary me-2">Visit</button>
                                </Link>
                                <Link to={`/project-form/${item.id}`}>
                                    <button type="button" className="btn btn-success me-2">Edit</button>
                                </Link>
                                    <button type="button" className="btn btn-danger me-2" onClick={() => props.delete(item.id)}>Delete</button>
                             </td>
                    </tr>
                ))}    
            </tbody>
        </table>
    )
}

export default Table;