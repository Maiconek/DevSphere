import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Section = (props) => {

    const {user, token} = useContext(AuthContext)
    const [curUser, setCurUser] = useState(null)

    useEffect(() => {
        fetchUser()
    }, [curUser])

    const fetchUser = async () => {
        try {
            let respone = await fetch(`http://localhost:8080/api/v1/users/email/${user.sub}`, {
                'method': 'GET',
                'headers': {
                    'Authorization': "Bearer " + token.access_token,
                },
            })
            let data = await respone.json()
            if(respone.ok) {
                setCurUser(data)
            }
        } catch (error) {
            console.error('Błąd połączenia:', error)
        }
    }

    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Welcome to DevSphere!</h1>
                    <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                    {props.isMainPage === true ? 
                        <p>
                            <Link to='/project-form'><button type="button" className="btn btn-success my-2 me-2">Add your project</button></Link>
                            {curUser && curUser.id != null ? 
                                <Link to={`/users/${curUser.id}`}>
                                    <button type="button" className="btn btn-secondary my-2">Go to your profile page</button>
                                </Link>
                                : null 
                            }
                        </p>
                        : <></>
                    }
                </div>
            </div>
        </section>
    )
}

export default Section;