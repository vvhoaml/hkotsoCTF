import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getCompetitions();
  }, [])

  const onDeleteClick = competition => {
    if (!window.confirm("Вы уверены что хотите удалить этого пользователя?")) {
      return
    }
    axiosClient.delete(`/competitions/${competitions.id}`)
      .then(() => {
        setNotification('Пользователь был успешно удален')
        getCompetitions()
      })
  }

  const getCompetitions = () => {
    setLoading(true)
    axiosClient.get('/competitions')
      .then(({ data }) => {
        setLoading(false)
        setCompetitions(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div className="users-header">
        <h1>Соревновательные лобби</h1>
        <Link className="btn-add" to="/dashboard/users/new">Добавить</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Дата</th>
            <th>Команды</th>
						<th>Задания</th>
						<th>Результат</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Загрузка...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {competitions.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.date}</td>
                <td>{c.teams}</td>
                <td>{c.tasks}</td>
								<td>{c.result}</td>
								<td>{c.status}</td>
                <td>{c.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/dashboard/users/' + u.id}>Изменить</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Удалить</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}