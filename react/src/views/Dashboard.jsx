import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Панель управления</h1>
			&nbsp;
      <div>
        <Link
          to="/dashboard/users"
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => handleTabClick('users')}
        >
          Пользователи
        </Link>
        <Link
          to="/dashboard/tasks"
          className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => handleTabClick('tasks')}
        >
          Задания
        </Link>
        <Link
          to="/dashboard/competitiontasks"
          className={`tab-button ${activeTab === 'competitiontasks' ? 'active' : ''}`}
          onClick={() => handleTabClick('competitiontasks')}
        >
          Пакеты заданий на соревнования
        </Link>
				<Link
          to="/dashboard/competitions"
          className={`tab-button ${activeTab === 'competitions' ? 'active' : ''}`}
          onClick={() => handleTabClick('competitions')}
        >
          Соревновательные лобби
        </Link>
      </div>
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;