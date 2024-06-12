import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Leaders() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLeaders();
  }, [])


  const getLeaders = () => {
    setLoading(true)
    axiosClient.get('/leaders')
      .then(({ data }) => {
        setLoading(false)
        setLeaders(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div className="users-header">
        <h1>Таблица лидеров</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Студент</th>
						<th>Рейтинг</th>
            <th>Дата регистрации</th>
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
            {leaders.map(l => (
              <tr key={l.id}>
                <td>{l.name}</td>
                <td>{l.rating}</td>
                <td>{l.created_at}</td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}