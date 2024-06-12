import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Competitions from "./views/Competitions";
import CompetitionTasks from "./views/CompetitionTasks";
import Dashboard from "./views/Dashboard";
import Gym from "./views/Gym";
import Leaders from "./views/Leaders";
import Lobbies from "./views/Lobbies";
import Login from "./views/Login";
import MainPage from "./views/MainPage";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import TaskForm from "./views/TaskFrom";
import Tasks from "./views/Tasks";
import UserForm from "./views/UserForm";
import UserProfile from "./views/UserProfile";
import Users from "./views/Users";

const router = createBrowserRouter([
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <Navigate to="/mainPage" />
			},
			{
				path: '/dashboard',
				element: 
				(
          <Dashboard>
            <Navigate to="/dashboard/users" replace />
          </Dashboard>),
				children: [
					{
						path: '/dashboard/users',
						element: <Users />
					},
					{
						path: '/dashboard/users/new',
						element: <UserForm key="userCreate" />
					},
					{
						path: '/dashboard/users/:id',
						element: <UserForm key="userUpdate" />
					},
					{
						path: '/dashboard/tasks',
						element: <Tasks />
					},
					{
						path: '/dashboard/tasks/new',
						element: <TaskForm key="taskCreate" />
					},
					{
						path: '/dashboard/tasks/:id',
						element: <TaskForm key="taskUpdate"/>
					},
					{
						path: '/dashboard/competitiontasks',
						element: <CompetitionTasks />
					}
				]
			},
			{
				path: '/mainPage',
				element: <MainPage />
			},
			{
				path: '/leaders',
				element: <Leaders />
			},
			{
				path: '/Gym',
				element: <Gym />
			},
			{
				path: '/Lobbies',
				element: <Lobbies />
			},
			{
				path: '/UserProfile',
				element: <UserProfile />
			}
		]
	},
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/signup',
				element: <Signup />
			},
		]
	},
  {
		path: '*',
    element: <NotFound />
	},
])

export default router;