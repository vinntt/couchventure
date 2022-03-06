import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


export default function TripDetails() {

	// const { id } = useParams()

	// const [project, setProject] = useState(null);

	// useEffect(() => {
	// 	// request to the backend
	// 	axios.get(`/api/projects/${id}`)
	// 		.then(response => {
	// 			console.log(response)
	// 			setProject(response.data)
	// 		})
	// 		.catch(err => console.log(err))
	// }, [])

	// return (
		// <>
		// 	{project === null ? <div>Loading ...</div> :
		// 		<>
		// 			<h1>ProjectDetails</h1>
		// 			<h3>{project.title}</h3>
		// 			<p>{project.description}</p>
		// 			<Link to={`/projects/edit/${project._id}`}>
		// 				<button>Edit this project</button>
		// 			</Link>
				// </>
		// 	}</>
	// )
};
