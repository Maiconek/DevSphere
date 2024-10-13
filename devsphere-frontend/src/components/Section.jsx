import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Section = () => {

    const {user} = useContext(AuthContext)

    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Welcome to DevSphere!</h1>
                    <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                    <p>
                        <Link to='/project-form'><button type="button" className="btn btn-success my-2 me-2">Add your project</button></Link>
                        <Link to={`/users/${user.id}`}><button type="button" className="btn btn-secondary my-2">Go to your profile page</button></Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Section;