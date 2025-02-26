import React, { useState } from 'react';

const UserForm = ({ addUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ name, email, age: Number(age) });
    setName('');
    setEmail('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
