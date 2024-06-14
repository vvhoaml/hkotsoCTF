import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getTasks();
  }, [])

  const onDeleteClick = task => {
    if (!window.confirm("Вы уверены что хотите удалить это задание?")) {
      return
    }
    axiosClient.delete(`/tasks/${task.id}`)
      .then(() => {
        setNotification('Задание было успешно удалено')
        getTasks()
      })
  }

  const getTasks = () => {
    setLoading(true)
    axiosClient.get('/tasks')
      .then(({ data }) => {
        setLoading(false)
        setTasks(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div className="users-header">
        <h1>Задания</h1>
        <Link className="btn-add" to="/dashboard/tasks/new">Добавить</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Тема</th>
						<th>Сложность</th>
						<th>Ответ</th>
            <th>Дата создания</th>
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
            {tasks.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.theme}</td>
                <td>{t.level}</td>
								<td>{t.flag}</td>
                <td>{t.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/dashboard/tasks/' + t.id}>Изменить</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(t)}>Удалить</button>
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