import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Lobbies() {
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLobbies();
  }, [])


  const getLobbies = () => {
    setLoading(true)
    axiosClient.get('/lobbies')
      .then(({ data }) => {
        setLoading(false)
        setLobbies(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div className="users-header">
        <h1>Соревновательные лобби</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Дата</th>
            <th>Команды</th>
						<th>Результат</th>
            <th>Статус</th>
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
            {lobbies.map(lb => (
              <tr key={lb.id}>
                <td>{lb.date}</td>
                <td>{lb.teams}</td>
                <td>{lb.result}</td>
                <td>{lb.status}</td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}