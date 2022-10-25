import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import { BrowserRouter as Router, Route } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/users?_start=0&_limit=20"
      );

      const response = await data.json();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  return (
    <div className="div">
      <h1>
        {users.map((user, index) => (
          <ListItem key={index} user={user} />
        ))}
      </h1>
    </div>
  );
}

export default Home;
