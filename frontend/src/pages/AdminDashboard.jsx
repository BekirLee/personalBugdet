import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAll = async () => {
      const headers = { Authorization: `Bearer ${token}` };

      const usersRes = await axios.get('/api/admin/users', { headers });
      const incomeRes = await axios.get('/api/admin/incomes', { headers });
      const expenseRes = await axios.get('/api/admin/expenses', { headers });

      setUsers(usersRes.data);
      setIncomes(incomeRes.data);
      setExpenses(expenseRes.data);
    };

    fetchAll();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>👨‍💼 Admin Panel</h1>

      <h2>👥 Kullanıcılar</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.email} ({user.role})</li>
        ))}
      </ul>

      <h2>💰 Tüm Gelirler</h2>
      <ul>
        {incomes.map(income => (
          <li key={income._id}>
            {income.source} - {income.amount}₺
          </li>
        ))}
      </ul>

      <h2>💸 Tüm Giderler</h2>
      <ul>
        {expenses.map(exp => (
          <li key={exp._id}>
            {exp.category} - {exp.amount}₺
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
