import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Gym() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, [])


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
        <h1>Задания для тренировки</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Тема</th>
						<th>Задание</th>
						<th>Сложность</th>
            <th>Дата создания</th>
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
                <td>{t.theme}</td>
								<td>{t.task}</td>
                <td>{t.level}</td>
                <td>{t.created_at}</td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}