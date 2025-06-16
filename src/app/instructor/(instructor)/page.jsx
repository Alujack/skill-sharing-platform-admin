
'use client';
import { useEffect } from 'react';
import {useInstructorDashboardQuery} from '@/entities/instructor/useInstructorDashboard.query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/ui/Card';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';


const analyticsData = Array.from({ length: 60 }, (_, i) => ({ name: `${i * 1000}`, value: Math.random() * 100 }));

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.id)
  const { dashboard, refetch } = useInstructorDashboardQuery(user?.id);
  console.log(dashboard)
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card className="p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center">
            <GraduationCap className="text-blue-400 w-8 h-8" />
            <p className="text-lg font-semibold">Total Students</p>
          </div>
          <p className="text-2xl font-bold mt-2">{dashboard?.studentsCount}</p>
        </Card>
        <Card className="p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center">
            <TrendingUp className="text-blue-400 w-8 h-8" />
            <p className="text-lg font-semibold">Total Courses</p>
          </div>
          <p className="text-2xl font-bold mt-2">{dashboard?.coursesCount}</p>
        </Card>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Profit</h2>
          <div className="w-16 h-16 mx-auto border-4 border-dotted border-blue-400 rounded-full"></div>
        </Card>
        <Card className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Course Management</h2>
          <ul className="space-y-2 text-sm">
            <li>🔹 Course Approval Workflow</li>
            <li>🔹 Course Categorization</li>
            <li>🔹 Quality Control</li>
            <li>🔹 Featured Courses</li>
          </ul>
        </Card>
      </div>

      <Card className="p-6 bg-gray-800 rounded-lg shadow-lg mt-6">
        <h2 className="text-lg font-bold mb-4">Analytics and Reporting</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}