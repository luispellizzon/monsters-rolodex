import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";

function Home() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/users?_start=0&_limit=3"
      );

      const response = await data.json();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  const handleOnChange = (e) => {
    setSearchUser(e.target.value);
  };
  const handleOnClick = () => {
    const last = users.length;
    const pagination = async () => {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/users?_start=${last}&_limit=${3}`
      );

      const response = await data.json();
      setUsers((prevState) => [...prevState, ...response]);
    };
    pagination();
  };

  console.log(users);

  const filterMonsters = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchUser.toLowerCase())
  );

  return (
    <>
      <Header />
      <SearchBox value={searchUser} onChange={handleOnChange} />

      <section className="container" id="monsters">
        <div className="flex-container">
          {filterMonsters.map((user) => (
            <ListItem key={user.id} user={user} id={user.id} />
          ))}
        </div>
        <button className="btn" onClick={handleOnClick}>
          Load More
        </button>
      </section>
    </>
  );
}

export default Home;
