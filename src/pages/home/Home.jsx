import React, { useEffect, useState } from 'react'
import "./Home.scss";
import { Link, Route, Routes } from 'react-router-dom';
import { PostService } from '../../services/PostService';
import PostCard from '../../components/PostCard/PostCard';
import OnePostInfo from "../onepost/OnePostInfo";
import CreatePost from "../create/CreatePost";
import Profile from '../profile/Profile';
import { useInfoContext } from '../../context/InfoContext';
import Search from '../search/Search';

const Home = () => {
    const { isPostChange } = useInfoContext();
    const [currentUser, setCurrentUser] = useState(null);
    const [allPosts, setAllPosts] = useState([]);

    const handleAllPost = async () => {
        try {
            const data = await PostService.getAllPost();
            setAllPosts(data.reverse().slice(0, 20));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) setCurrentUser(JSON.parse(user));
        let list = document.querySelectorAll(".navigation a");
        list.forEach(a => {
            a.addEventListener('click', () => {
                list.forEach(item => item.classList.remove("active"));
                a.classList.add('active');
            })
        })
    }, [])
    useEffect(() => {
        handleAllPost();
    }, [isPostChange])
    return (
        <main className='home'>
            <aside>
                <div className="top">
                    <h1>POST APP</h1>
                    <ul className="navigation">
                        <li>
                            <Link to={"/"} className='active'>
                                <box-icon name="home-alt"></box-icon>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/search"}>
                                <box-icon name="search"></box-icon>
                                <span>Search</span>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <box-icon name='compass'></box-icon>
                                <span>Explore</span>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <box-icon name='videos' type='solid'></box-icon>
                                <span>Reels</span>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <box-icon name='chat'></box-icon>
                                <span>Messages</span>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <box-icon name='heart'></box-icon>
                                <span>Notifications</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/create"}>
                                <box-icon name='message-square-add'></box-icon>
                                <span>Create</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                {
                                    currentUser?.avatar ?
                                        <img src={currentUser.avatar} alt="" /> : <box-icon name='user-circle' type='solid' ></box-icon>
                                }
                                <b>{currentUser?.name}</b>
                            </Link>
                        </li>
                    </ul>
                </div>
                <li>
                    <Link>
                        <box-icon name="menu"></box-icon>
                        <span>More</span>
                    </Link>
                </li>
            </aside>
            <Routes>
                <Route path='/' element={<article>
                    <div className="post">
                        {
                            allPosts.map(post => {
                                return <PostCard post={post} />
                            })
                        }
                    </div>
                </article>} />
                <Route path='/post/:id' element={<OnePostInfo />} />
                <Route path='/create' element={<CreatePost />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/post/:id' element={<OnePostInfo />} />
                <Route path='/search' element={<Search />} />
            </Routes>
            <aside className='right-aside'>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis minima modi iusto ex, incidunt distinctio inventore deleniti doloremque labore nemo voluptatibus ullam enim alias, et nihil voluptatum quod aliquid error.</p>
            </aside>
        </main>
    )
}

export default Home