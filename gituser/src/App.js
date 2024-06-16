import React, { useState } from 'react';
// import './App.css'; 

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setError(null);
      } else {
        setError('User not found. Please enter a valid GitHub username.');
        setUserData(null);
      }
    } catch (error) {
      setError('An error occurred while fetching data.');
      setUserData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>

      <div className='container' style={{ background: "linear-gradient(275deg,#2980b9,#8e44ad)", borderRadius: "50px", width: "50%", height: "auto", boxShadow: "5px 5px 5px 0.5px gray" }}>
        <div className="App" style={{ color: "white", marginTop: "80px", textAlign: "center", fontFamily: "cursive" }}>
          <i class="bi bi-github"></i>
          <h1>Serch Github User Info</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="a" style={{width: "300px", height: "50px", borderRadius: "30px",border:"none",outline:"none",textAlign:"center" }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              required
            />&nbsp;&nbsp;&nbsp;
            <button type="submit" className="a" style={{ width: "300px", height: "50px", borderRadius: "30px" ,border:"none",outline:"none"}}>Submit</button>
          </form>
          {error && <p className="error">{error}</p>}
          {userData && (
            <div className="user-card">
              <img src={userData.avatar_url} alt="User Avatar" />
              <div>
                <p>Username: {userData.login}</p>
                {userData.name && <p>Name: {userData.name}</p>}
                <p>No. of Public Repos: {userData.public_repos}</p>
                <p>No. of Public Gists: {userData.public_gists}</p>
                <p>Profile Created At: {new Date(userData.created_at).toISOString().split('T')[0]}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
