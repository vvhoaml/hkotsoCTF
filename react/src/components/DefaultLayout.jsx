import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

	if (!token) {
	  return <Navigate to="/login"/>
	}

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/mainPage">Главная страница</Link>
        <Link to="/leaders">Таблица лидеров</Link>
				<Link to="/gym">Тренажер</Link>
				<Link to="/lobbies">Соревнования</Link>
				{user.status == "админ" && (
				<Link to="/dashboard">Панель управления</Link>
				)}
      </aside>
      <div className="content">
        <header>
          <div>
            <Link to='userProfile' className="btn-logout">{user.name}</Link>
						&nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Выйти</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}