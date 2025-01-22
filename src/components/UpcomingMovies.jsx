import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import blankimg from '../assets/blankMovi.webp'
import { useNavigate } from "react-router-dom";

const UpcomingMovies = () => {
    const navigate = useNavigate();
    const [allUpcomingMovies, setAllUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);  // Use `page` instead of `count`
    
    let Api_key = 'c45a857c193f6302f2b5061c3b85e743';
    useEffect(() => {

        setLoading(true);

        axios.request(`https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=${page}`).then((response) => {
            console.log(response);
            setAllUpcomingMovies((allUpcomingMovies) => [...allUpcomingMovies, ...response.data.results]);
        })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page])

    const handledclick = (e) => {
        console.log(e);
        navigate('/movie-detail', { state: { key: e } });
    }

    const handlePageChange = (newPage) => {
        console.log(newPage)
        if (newPage >= 1 && newPage <= 20) {
            setPage(newPage);  // Update to the selected page
        }
    };

    return (
        <div>
            <div>
                {loading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="container text-center">
                        <div className="row row-cols-4">
                            {
                                allUpcomingMovies.map((name, index) => (
                                    <div key={index} className="movie-card my-5">
                                        <img src={`https://image.tmdb.org/t/p/w500${name?.poster_path}` ? `https://image.tmdb.org/t/p/w500${name?.poster_path}` : blankimg} alt={name.title} />
                                        <p className='text-light fs-6 fw-bold'>{name.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="d-flex justify-content-center m-5">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                                            Previous
                                        </button>
                                    </li>
                                    {[...Array(5)].map((_, index) => {
                                        const pageNumber = index + 1 + (page - 1); // Dynamically generate pages around the current page
                                        return (
                                            <li key={pageNumber} className="page-item">
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(pageNumber)}
                                                >
                                                    {pageNumber}
                                                </button>
                                            </li>
                                        );
                                    })}
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UpcomingMovies