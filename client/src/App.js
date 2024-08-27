// import React, { useState, useEffect } from 'react';
// import { getUsers, createUser, updateUser, deleteUser } from './UserService';

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5013/api/users')
//         .then(response => response.json())
//         .then(data => setUsers(data))
//         .catch(error => console.error('Error fetching users:', error));
// }, []);


//   const fetchUsers = async () => {
//     try {
//       const response = await getUsers();
//       setUsers(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editId) {
//       await updateUser(editId, { name, email });
//     } else {
//       await createUser({ name, email });
//     }
//     setName('');
//     setEmail('');
//     setEditId(null);
//     fetchUsers();
//   };

//   const handleEdit = (user) => {
//     setName(user.name);
//     setEmail(user.email);
//     setEditId(user.id);
//   };

//   const handleDelete = async (id) => {
//     await deleteUser(id);
//     fetchUsers();
//   };

//   return (
//     <div>
//       <h1>Users</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <button type="submit">{editId ? 'Update' : 'Create'}</button>
//       </form>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name} ({user.email})
//             <button onClick={() => handleEdit(user)}>Edit</button>
//             <button onClick={() => handleDelete(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:5013/api/users')
//             .then(response => response.json())
//             .then(data => setUsers(data))
//             .catch(error => console.error('Error fetching users:', error));
//     }, []);

//     return (
//         <div className="App">
//             <h1>Users List</h1>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         {user.name} ({user.email})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//     const [users, setUsers] = useState([]);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [newUserId, setNewUserId] = useState(null);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('http://localhost:5013/api/users');
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleCreateUser = async (e) => {
//         e.preventDefault();
//         const user = { name, email };
//         try {
//             const response = await fetch('http://localhost:5013/api/users', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(user),
//             });
//             if (response.ok) {
//                 const newUser = await response.json();
//                 setUsers([...users, newUser]);
//                 setName('');
//                 setEmail('');
//                 setNewUserId(newUser.id); // Optionally set the ID of the newly created user
//             } else {
//                 console.error('Error creating user:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error creating user:', error);
//         }
//     };

//     const handleDeleteUser = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5013/api/users/${id}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 setUsers(users.filter(user => user.id !== id));
//             } else {
//                 console.error('Error deleting user:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     return (
//         <div className="App">
//             <h1>Users List</h1>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         {user.name} ({user.email})
//                         <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//             <h2>Create User</h2>
//             <form onSubmit={handleCreateUser}>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Create User</button>
//             </form>
//         </div>
//     );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newUserId, setNewUserId] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingEmail, setEditingEmail] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5013/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const user = { name, email };
        try {
            const response = await fetch('http://localhost:5013/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                const newUser = await response.json();
                setUsers([...users, newUser]);
                setName('');
                setEmail('');
                setNewUserId(newUser.id);
            } else {
                console.error('Error creating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5013/api/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter(user => user.id !== id));
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (user) => {
        setEditingUserId(user.id);
        setEditingName(user.name);
        setEditingEmail(user.email);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const updatedUser = { id: editingUserId, name: editingName, email: editingEmail };
        
        try {
            const response = await fetch(`http://localhost:5013/api/users/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
    
            if (response.ok) {
                // No content to parse, directly update the state
                setUsers(users.map(user => user.id === editingUserId ? { ...user, name: editingName, email: editingEmail } : user));
                
                // Reset editing state
                setEditingUserId(null);
                setEditingName('');
                setEditingEmail('');
            } else {
                const errorText = await response.text();
                console.error('Error updating user:', response.statusText, errorText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    
    
    
    return (
        <div className="App">
            <h1>Users List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                    </li>
                ))}
            </ul>
            <h2>Create User</h2>
            <form onSubmit={handleCreateUser}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Create User</button>
            </form>
            {editingUserId && (
                <div>
                    <h2>Edit User</h2>
                    <form onSubmit={handleUpdateUser}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                value={editingEmail}
                                onChange={(e) => setEditingEmail(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit">Update User</button>
                        <button onClick={() => setEditingUserId(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;
