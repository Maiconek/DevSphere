import React, {useEffect, useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";

const ReviewList = (props) => {
    const [reviews, setReviews] = useState([])
    const [loggedInUser, setLoggedInUser] = useState('')
    const {user} = useContext(AuthContext)
    


    useEffect(() => {
        fetchReviews()
        findLoggedInUser()
    }, [])

    const fetchReviews = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/reviews/projects/${props.id}`, {
                method: 'GET',
                'headers': {
                    'Authorization': "Bearer " + props.token,
                },
            })
            let data = await response.json()
            setReviews(data)
            console.log(data)
        }
        catch (error) {
            console.error('Błąd połączenia:', error);
        }
    }

    const deleteReview = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/reviews/${loggedInUser.id}/${props.id}`, {
                method: 'DELETE',
                'headers': {
                    'Authorization': "Bearer " + props.token,
                }
            });
            setReviews((prevReviews) => (prevReviews.filter(review => review.userDto.email !== loggedInUser.email)))
            console.log("ok")
            console.log("Logged in user:", loggedInUser.id)
            console.log("Project:", props.id)
        } 
        catch (error) {
            console.error("Blad polaczenia:" , error)
        }
    }

    const findLoggedInUser = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/users/email/${user.sub}`, {
                method: 'GET',
                'headers': {
                    'Authorization': "Bearer " + props.token,
                }
            });
            let data = await response.json()
            setLoggedInUser(data)
        } 
        catch (error) {
            console.error("Blad polaczenia:" , error)
        }
    }


    return (
        <div className="reviews-list mt-2">
            <ul className="list-group">
                {reviews.map(((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="me-auto">
                            <div className="d-flex justify-content-start mb-2">
                                <img className="review-profile-image" src={item.userDto.imageUrl}></img>
                                <div className="fw-bold m-2">{item.userDto.firstName} {item.userDto.lastName}</div>
                            </div>
                            <span className="ms-1">{item.content}</span>
                        </div>
                        <span className="badge text-bg-primary rounded-pill">Score: {item.score}/5</span>
                        {item.userDto.email === user.sub ?
                            <a onClick={deleteReview}>
                                <i className="material-icons" style={{fontSize: "20px", color:"red"}}>delete</i>
                            </a>
                            :
                            <></>
                        }
                    </li>
                )))}
            </ul>    
        </div>
    )
}

export default ReviewList;