import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post('/api/users', user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.patch(`/api/users/${id}`, updatedUser);
      setUsers(users.map(user => (user._id === id ? response.data : user)));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm addUser={addUser} />
      <UserList users={users} updateUser={updateUser} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
