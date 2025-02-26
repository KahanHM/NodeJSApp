import React from 'react';

const UserList = ({ users, updateUser, deleteUser }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.age}</span>
            <button onClick={() => updateUser(user._id, { name: 'Updated Name' })}>Update</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
