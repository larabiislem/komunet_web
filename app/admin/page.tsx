'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Dropdown, Modal, Switch, Select } from 'antd';
import type { MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

// Enregistrement des composants ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Rôles
type Role = 'ADMIN' | 'MODERATOR' | 'USER';

// Simulation session
const currentUser: { id: string; role: Role } = {
  id: '11111111-1111',
  role: 'ADMIN',
};

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

interface ActionLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  detail: string;
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'Admin One', email: 'admin@example.com', role: 'ADMIN', isActive: true, createdAt: '2025-06-01' },
    { id: 'u2', name: 'Mod One', email: 'mod@example.com', role: 'MODERATOR', isActive: true, createdAt: '2025-06-15' },
    { id: 'u3', name: 'User One', email: 'user1@example.com', role: 'USER', isActive: false, createdAt: '2025-07-01' },
    { id: 'u4', name: 'User Two', email: 'user2@example.com', role: 'USER', isActive: true, createdAt: '2025-07-20' },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState<'7d' | '30d'>('7d');
  const [logs] = useState<ActionLog[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      userEmail: 'admin@example.com',
      action: 'ROLE_UPDATED',
      detail: 'Changement de rôle user1@example.com (USER → MODERATOR)',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      userEmail: 'admin@example.com',
      action: 'VALIDATE_GROUP',
      detail: "Validation du groupe 'Cuisine du Monde' (ID:42)",
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      userEmail: 'mod@example.com',
      action: 'REJECT_GROUP',
      detail: "Rejet du groupe 'Crypto Inutile' (ID:77)",
    },
  ]);

  // Vérification des permissions
  const isAdmin = currentUser.role === 'ADMIN';
  const isModerator = currentUser.role === 'MODERATOR';

  if (!isAdmin && !isModerator) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-sm text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Accès refusé</h1>
          <p className="text-sm text-gray-600">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  // Calcul des KPIs
  const kpi = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isActive).length;
    const now = Date.now();
    const span = period === '7d' ? 7 : 30;
    const spanMs = span * 24 * 3600 * 1000;
    const newSignups = users.filter(u => now - Date.parse(u.createdAt) <= spanMs).length;
    
    return { totalUsers, activeUsers, newSignups };
  }, [users, period]);

  // Données pour les graphiques
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Nouveaux utilisateurs',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const activityData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Activité',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        barPercentage: 0.6,
      },
    ],
  };

  // Gestion des rôles
  const handleRoleChange = (userId: string, newRole: Role) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    
    // Ici vous pourriez ajouter un appel API pour sauvegarder le changement
  };

  const handleStatusChange = (userId: string, isActive: boolean) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive } : user
    ));
  };

  const showUserModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    // Sauvegarder les modifications
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen  px-4 md:px-6 py-8 flex justify-center">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-sm text-gray-500 mt-1">Aperçu des activités et des utilisateurs</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <Link
                href="/admin/annonces"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Annonces
              </Link>
              <Link
                href="/admin/groupes"
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Groupes
              </Link>
            </div>
            
            <Select
              value={period}
              onChange={setPeriod}
              className="w-28"
              options={[
                { value: '7d', label: '7 jours' },
                { value: '30d', label: '30 jours' },
              ]}
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <KpiCard 
            title="Total utilisateurs" 
            value={kpi.totalUsers} 
            trend="up" 
            percentage="12%"
            icon={<UsersIcon />}
          />
          <KpiCard 
            title="Utilisateurs actifs" 
            value={kpi.activeUsers} 
            trend="up" 
            percentage="8%"
            icon={<ActivityIcon />}
          />
          <KpiCard 
            title="Nouveaux inscrits" 
            value={kpi.newSignups} 
            trend={period === '7d' ? 'down' : 'up'} 
            percentage={period === '7d' ? '5%' : '15%'}
            icon={<GrowthIcon />}
          />
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Croissance des utilisateurs</h3>
              <span className="text-xs text-gray-500">Mise à jour quotidienne</span>
            </div>
            <div className="h-64">
              <Line 
                data={userGrowthData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Activité hebdomadaire</h3>
              <span className="text-xs text-gray-500">7 derniers jours</span>
            </div>
            <div className="h-64">
              <Bar
                data={activityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Dernières activités */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Activité récente</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {logs.length === 0 ? (
              <div className="p-5 text-center text-sm text-gray-500">Aucune activité récente</div>
            ) : (
              logs.map(log => (
                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <ActivityIcon className="text-black w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-gray-900">{log.action}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{log.detail}</p>
                      <p className="text-xs text-gray-500 mt-1">Par {log.userEmail}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Utilisateurs</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              + Ajouter un utilisateur
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscrit le</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Switch
                        checked={user.isActive}
                        onChange={(checked) => handleStatusChange(user.id, checked)}
                        className={`${user.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Dropdown 
                        menu={{
                          items: [
                            {
                              key: 'edit',
                              label: 'Modifier',
                              onClick: () => showUserModal(user),
                            },
                            {
                              key: 'change_role',
                              label: 'Changer le rôle',
                              disabled: !isAdmin,
                              children: [
                                {
                                  key: 'admin',
                                  label: 'Administrateur',
                                  disabled: user.role === 'ADMIN',
                                  onClick: () => handleRoleChange(user.id, 'ADMIN'),
                                },
                                {
                                  key: 'moderator',
                                  label: 'Modérateur',
                                  disabled: user.role === 'MODERATOR',
                                  onClick: () => handleRoleChange(user.id, 'MODERATOR'),
                                },
                                {
                                  key: 'user',
                                  label: 'Utilisateur',
                                  disabled: user.role === 'USER',
                                  onClick: () => handleRoleChange(user.id, 'USER'),
                                },
                              ],
                            },
                            {
                              key: 'delete',
                              label: 'Supprimer',
                              danger: true,
                              disabled: user.role === 'ADMIN',
                            },
                          ],
                        }}
                        trigger={['click']}
                      >
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreOutlined />
                        </button>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal d'édition utilisateur */}
      <Modal
        title="Modifier l'utilisateur"
        open={isModalOpen}
        onOk={handleSaveUser}
        onCancel={() => setIsModalOpen(false)}
        okText="Enregistrer"
        cancelText="Annuler"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                defaultValue={selectedUser.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={selectedUser.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <Select
                defaultValue={selectedUser.role}
                className="w-full"
                options={[
                  { value: 'ADMIN', label: 'Administrateur' },
                  { value: 'MODERATOR', label: 'Modérateur' },
                  { value: 'USER', label: 'Utilisateur' },
                ]}
                onChange={(value) => handleRoleChange(selectedUser.id, value as Role)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Statut actif</label>
              <Switch
                checked={selectedUser.isActive}
                onChange={(checked) => handleStatusChange(selectedUser.id, checked)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// Composants UI améliorés
function KpiCard({ title, value, trend, percentage, icon }: { 
  title: string; 
  value: number; 
  trend?: 'up' | 'down'; 
  percentage?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="bg-gray-200 p-3 rounded-lg">
          {icon || <ActivityIcon className="text-black w-5 h-5" />}
        </div>
      </div>
      
      {trend && percentage && (
        <div className={`mt-3 flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? (
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 5.414V6a1 1 0 01-1 1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 13a1 1 0 100-2H5.414l4.293-4.293a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.414l6 6a1 1 0 001.414-1.414L5.414 13H12z" clipRule="evenodd" />
            </svg>
          )}
          <span>{percentage} vs. période précédente</span>
        </div>
      )}
    </div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const colors = {
    ADMIN: 'bg-red-100 text-red-800',
    MODERATOR: 'bg-indigo-100 text-indigo-800',
    USER: 'bg-gray-100 text-gray-800',
  };
  
  const labels = {
    ADMIN: 'Admin',
    MODERATOR: 'Mod',
    USER: 'User',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role]}`}>
      {labels[role]}
    </span>
  );
}

// Icônes simples
function ActivityIcon({ className = 'w-5 h-5 text-black' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function UsersIcon({ className = 'w-5 h-5 text-black' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function GrowthIcon({ className = 'w-5 h-5 text-black' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}