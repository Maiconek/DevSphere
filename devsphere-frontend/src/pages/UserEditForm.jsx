import React from "react";
import { Link } from "react-router-dom";

const UserEditForm = () => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Edit your profile</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputFirstname1" className="form-label">Firstname</label>
                    <input type="text" className="form-control" id="exampleInputFirstname" name="firstname"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputLastname1" className="form-label">Lastname</label>
                    <input type="text" className="form-control" id="exampleInputLastname" name="lastname"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputBio1" className="form-label">Bio</label>
                    <textarea type="text" className="form-control" id="exampleInputBio" name="bio"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputCompany1" className="form-label">Company</label>
                    <input type="text" className="form-control" id="exampleInputCompany" name="company"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputImage1" className="form-label">Upload image</label>
                    <input type="file" className="form-control" id="exampleInputImage" name="image"/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/"><button type="button" className="btn btn-secondary">Go back</button></Link>
            </form>
        </div>
    )
}

export default UserEditForm;