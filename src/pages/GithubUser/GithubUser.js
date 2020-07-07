import React, { useState } from 'react';

function GithubUser() {
    const [input, setInput] = useState('');
    const [user, setUser] = useState(null);

    function handleChange(event) {
        setInput(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            let url = `https://api.github.com/users/${input}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;
            let response = await fetch(url);
            let result = await response.json();

            if (result.message !== 'Not Found') {
                setUser({
                    username: result.login,
                    avatar: result.avatar_url,
                    bio: result.bio,
                    followers: result.followers,
                    following: result.following,
                    publicRepos: result.public_repos,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='input'
                        id='input'
                        value={input}
                        onChange={handleChange}
                    />
                </form>
            </div>
            {user !== null ? (
                <div>
                    <img src={user.avatar} alt="User's Avatar" />
                    <h1>{user.username}</h1>
                    <span>{user.publicRepos}</span>
                    <span>{user.followers}</span>
                </div>
            ) : (
                'user tidak ditemukan'
            )}
        </div>
    );
}

export default GithubUser;
