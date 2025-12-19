import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in as admin
        const storedUsername = localStorage.getItem('username');
        const accessToken = localStorage.getItem('accessToken');

        // Simple admin check (in production, this should be server-side)
        if (storedUsername === 'admin' && accessToken) {
            setIsAuthenticated(true);
            loadAdminData();
        }
    }, []);

    const loadAdminData = async () => {
        // Mock data - in production, fetch from API
        setUsers([
            { id: 1, username: 'user1', email: 'user1@example.com', role: 'customer', status: 'active' },
            { id: 2, username: 'user2', email: 'user2@example.com', role: 'customer', status: 'active' },
            { id: 3, username: 'testuser', email: 'test@funkostore.com', role: 'customer', status: 'active' },
        ]);

        setOrders([
            { id: 1, customer: 'user1', total: '$45.99', status: 'completed', date: '2024-12-15' },
            { id: 2, customer: 'user2', total: '$89.99', status: 'pending', date: '2024-12-18' },
            { id: 3, customer: 'testuser', total: '$120.00', status: 'shipped', date: '2024-12-19' },
        ]);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple admin login (VULNERABILITY: hardcoded credentials for demo)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('username', username);
            localStorage.setItem('accessToken', 'admin-token-' + Date.now());
            setIsAuthenticated(true);
            loadAdminData();
        } else {
            alert('Invalid admin credentials');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter admin username"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Enter admin password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-500">
                        Demo credentials: admin / admin123
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-black text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <div className="flex items-center gap-4">
                        <span>Welcome, {localStorage.getItem('username')}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white shadow">
                <div className="container mx-auto">
                    <div className="flex gap-4 p-4">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                            Users
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-black text-white' : 'bg-gray-200'}`}
                        >
                            Products
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto p-6">
                {activeTab === 'dashboard' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-gray-500 text-sm">Total Users</h3>
                                <p className="text-3xl font-bold mt-2">{users.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-gray-500 text-sm">Total Orders</h3>
                                <p className="text-3xl font-bold mt-2">{orders.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-gray-500 text-sm">Revenue</h3>
                                <p className="text-3xl font-bold mt-2">$255.98</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">User Management</h2>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4">{user.id}</td>
                                            <td className="px-6 py-4">{user.username}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.role}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                                                <button className="text-red-600 hover:text-red-800">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Order Management</h2>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4">#{order.id}</td>
                                            <td className="px-6 py-4">{order.customer}</td>
                                            <td className="px-6 py-4">{order.total}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{order.date}</td>
                                            <td className="px-6 py-4">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                                                <button className="text-green-600 hover:text-green-800">Update</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Product Management</h2>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="text-gray-600">Product management features coming soon...</p>
                            <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                                Add New Product
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
