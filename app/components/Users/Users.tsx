import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../(authorised)/UserManagement/page.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface User {
    id: number;
    email: string;
    blocked: boolean;
    createdAt: string;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [lastUserBlocked, setLastUserBlocked] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    'https://back.chakrulos.ge/users',
                );
                const usersData = response.data;
                setUsers(usersData);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error(
                        'Error fetching users:',
                        error.response?.data || error.message,
                    );
                    setError('Error fetching users. Please try again later.');
                } else if (error instanceof Error) {
                    console.error('Error fetching users:', error.message);
                    setError('Error fetching users. Please try again later.');
                } else {
                    console.error('An unknown error occurred');
                    setError(
                        'An unknown error occurred. Please try again later.',
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [lastUserBlocked]);

    const handleBlockUser = async (id: number, isBlocked: boolean) => {
        try {
            await axios.patch(`https://back.chakrulos.ge/users/block/${id}`);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, isBlocked: !isBlocked } : user,
                ),
            );
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(
                    `Error ${isBlocked ? 'unblocking' : 'blocking'} user:`,
                    error.response?.data || error.message,
                );
            } else if (error instanceof Error) {
                console.error(
                    `Error ${isBlocked ? 'unblocking' : 'blocking'} user:`,
                    error.message,
                );
            } else {
                console.error('An unknown error occurred');
            }
        }
        if (lastUserBlocked === 0) {
            setLastUserBlocked(id);
        } else {
            setLastUserBlocked(0);
        }
    };

    const handlePasswordChange = async (id: number) => {
        try {
            await axios.patch(
                `https://back.chakrulos.ge/users/password/${id}`,
                { password: newPassword },
            );
            alert('Password changed successfully!');
            setSelectedUserId(null);
            setNewPassword('');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(
                    'Error changing password:',
                    error.response?.data || error.message,
                );
            } else if (error instanceof Error) {
                console.error('Error changing password:', error.message);
            } else {
                console.error('An unknown error occurred');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className={styles.mainWrapper}>
            <h1>User Management</h1>
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>Email</th>
                            <th className={styles.tableHeader}>Status</th>
                            <th className={styles.tableHeader}>Actions</th>
                            <th className={styles.tableHeader}>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className={styles.tableCell}>
                                        {user.email || 'Email not available'}
                                    </td>
                                    <td className={styles.tableCell}>
                                        {user.blocked ? 'Blocked' : 'Active'}
                                    </td>
                                    <td className={styles.tableCell}>
                                        <button
                                            onClick={() =>
                                                handleBlockUser(
                                                    user.id,
                                                    user.blocked,
                                                )
                                            }
                                        >
                                            {user.blocked ? 'Unblock' : 'Block'}
                                        </button>
                                    </td>
                                    <td className={styles.tableCell}>
                                        <button
                                            onClick={() =>
                                                setSelectedUserId(user.id)
                                            }
                                        >
                                            Change Password
                                        </button>
                                        {selectedUserId === user.id && (
                                            <div
                                                className={
                                                    styles.changePasswordWrapper
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.inputWrapper
                                                    }
                                                >
                                                    <input
                                                        type={
                                                            passwordVisible
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        value={newPassword}
                                                        onChange={(e) =>
                                                            setNewPassword(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Enter new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                        className={
                                                            styles.eyeButton
                                                        }
                                                    >
                                                        {passwordVisible ? (
                                                            <FaEyeSlash />
                                                        ) : (
                                                            <FaEye />
                                                        )}
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handlePasswordChange(
                                                            user.id,
                                                        )
                                                    }
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className={styles.tableCell} colSpan={4}>
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserManagement;
