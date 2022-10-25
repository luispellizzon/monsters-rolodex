import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import { BrowserRouter as Router, Route } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

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

  const handleOnChange = (e) => {
    setSearchUser(e.target.value);
  };

  const filterMonsters = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchUser.toLowerCase())
  );

  return (
    <div className="div">
      <input
        type="text"
        value={searchUser}
        style={{ width: "200px" }}
        onChange={handleOnChange}
      />
      <section className="container" id="monsters">
        <div className="flex-items">
          {filterMonsters.map((user, index) => (
            <ListItem key={index} user={user} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
