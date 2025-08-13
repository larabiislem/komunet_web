'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link'; // <- ajout

// Rôles
type Role = 'ADMIN' | 'MODERATOR' | 'USER';

// Simulation session (remplacer plus tard)
const currentUser: { id: string; role: Role } = {
  id: '11111111-1111',
  role: 'ADMIN', // changer pour tester
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

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function DashboardPage() {
  const isAdmin = currentUser.role === 'ADMIN';
  const isModerator = currentUser.role === 'MODERATOR';
  if (!isAdmin && !isModerator) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Accès refusé</h1>
          <p className="text-sm text-gray-600">Vous n’avez pas l’autorisation.</p>
        </div>
      </div>
    );
  }

  // Mock data
  const [users] = useState<User[]>([
    { id: 'u1', name: 'Admin One', email: 'admin@example.com', role: 'ADMIN', isActive: true, createdAt: '2025-06-01' },
    { id: 'u2', name: 'Mod One', email: 'mod@example.com', role: 'MODERATOR', isActive: true, createdAt: '2025-06-15' },
    { id: 'u3', name: 'User One', email: 'user1@example.com', role: 'USER', isActive: false, createdAt: '2025-07-01' },
    { id: 'u4', name: 'User Two', email: 'user2@example.com', role: 'USER', isActive: true, createdAt: '2025-07-20' },
  ]);

  const [period, setPeriod] = useState<'7d' | '30d'>('7d');

  const kpi = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.isActive).length;
    const now = Date.now();
    const span = period === '7d' ? 7 : 30;
    const spanMs = span * 24 * 3600 * 1000;
    const newSignups = users.filter(u => now - Date.parse(u.createdAt) <= spanMs).length;
    return { totalUsers, activeUsers, newSignups };
  }, [users, period]);

  // Action log mock
  const [logs] = useState<ActionLog[]>([
    {
      id: uuid(),
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      userEmail: 'admin@example.com',
      action: 'ROLE_UPDATED',
      detail: 'Changement de rôle user1@example.com (USER → MODERATOR)',
    },
    {
      id: uuid(),
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      userEmail: 'admin@example.com',
      action: 'VALIDATE_GROUP',
      detail: "Validation du groupe 'Cuisine du Monde' (ID:42)",
    },
    {
      id: uuid(),
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      userEmail: 'mod@example.com',
      action: 'REJECT_GROUP',
      detail: "Rejet du groupe 'Crypto Inutile' (ID:77)",
    },
  ]);

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 md:ml-64">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Tableau de bord
            </h1>
                    <div className="flex gap-2">
              <Link
                href="/admin/annnonces"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-900 text-sm font-medium hover:bg-gray-900 hover:shadow transition"
              >
                Annonces
              </Link>
              <Link
                href="/admin/groupes"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-900 text-sm font-medium hover:bg-gray-900 hover:shadow transition"
              >
                Groupes
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={period}
              onChange={e => setPeriod(e.target.value as any)}
              className="bg-white border border-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFBFBF]"
            >
              <option value="7d">7 jours</option>
              <option value="30d">30 jours</option>
            </select>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <KpiCard title="Total utilisateurs" value={kpi.totalUsers} />
          <KpiCard title="Utilisateurs actifs" value={kpi.activeUsers} />
          <KpiCard title="Nouveaux inscrits" value={kpi.newSignups} />
        </div>

        {/* Graph placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartPlaceholder title="Utilisateurs dans le temps" />
          <ChartPlaceholder title="Taux d’activité" />
        </div>

        {/* Logs récents */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
          {logs.length === 0 && <p className="text-sm text-gray-600">Aucune activité.</p>}
            <ul className="divide-y divide-gray-100">
              {logs.map(l => (
                <li key={l.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="text-sm text-gray-800">
                    <span className="font-medium">{l.action}</span>{' '}
                    <span className="text-gray-600">{l.detail}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(l.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
        </div>

        {/* Simple table utilisateurs */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Utilisateurs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4 font-medium">Nom</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Rôle</th>
                  <th className="py-2 pr-4 font-medium">Actif</th>
                  <th className="py-2 pr-4 font-medium">Créé le</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b last:border-none">
                    <td className="py-2 pr-4">{u.name}</td>
                    <td className="py-2 pr-4 text-gray-700">{u.email}</td>
                    <td className="py-2 pr-4">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="py-2 pr-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          u.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {u.isActive ? 'Oui' : 'Non'}
                      </span>
                    </td>
                    <td className="py-2 pr-4 text-xs text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <p className="text-sm text-gray-600 mt-4">Aucun utilisateur.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Local UI components (remplacent StatsCards / charts externes)
function KpiCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl bg-white border border-gray-100 shadow p-5 flex flex-col">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {title}
      </span>
      <span className="mt-2 text-2xl font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function ChartPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-100 shadow p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <span className="text-[11px] text-gray-400">Mock</span>
      </div>
      
    </div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const clr =
    role === 'ADMIN'
      ? 'bg-red-100 text-red-700'
      : role === 'MODERATOR'
      ? 'bg-indigo-100 text-indigo-700'
      : 'bg-gray-100 text-gray-700';
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${clr}`}>
      {role === 'ADMIN'
        ? 'Administrateur'
        : role === 'MODERATOR'
        ? 'Modérateur'
        : 'Utilisateur'}
    </span>
  );
}