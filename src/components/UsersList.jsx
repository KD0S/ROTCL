import React from 'react';

const UsersList = ({ users, onDuelClick }) => {
  const handleDuelClick = (username) => {
    // Emit socket event "duel" with the username
    onDuelClick(username);
  };

  if (!users) return <div>loading</div>
  else
    return (
      <div>
        {users.map((username) => (
          <button key={username} onClick={() => handleDuelClick(username)}>
            {username}
          </button>
        ))}
      </div>
    );
};

export default UsersList;