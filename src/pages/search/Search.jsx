import React from 'react'
import { PostService } from '../../services/PostService';
import { useState } from 'react';
import PostCard from '../../components/PostCard/PostCard';

const Search = () => {
    const [searchedPosts, setSearchedPosts] = useState(null)
    const handleSearch = async (value) => {
        try {
            // if(value.length < 2 ) return;
            setTimeout(async () => {
                const data = await PostService.searchPost(value.trim());
                setSearchedPosts(data)

            }, 2000)

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='search'>
            <input onChange={(e) => handleSearch(e.target.value)} type="text" className='serach-input' placeholder='Search by title...' />
            <hr />
            <div className="posts">
                {
                    searchedPosts ? <div>
                        {searchedPosts.length > 0 ? <div>
                            {
                                searchedPosts.map(post => {
                                    return <PostCard post={post} />
                                })
                            }
                        </div> : <div>Afsus, bunday sarlavhali post topilmadi !!!</div>}
                    </div> : <div>Loading...</div>
                }
            </div>

        </div>
    )
}

export default Search