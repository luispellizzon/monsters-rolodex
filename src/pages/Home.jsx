import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import Spinner from "../components/Spinner";

function Home() {
  const [users, setUsers] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [lastFetched, setLastFetched] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/users?_start=0&_limit=3"
      );

      const response = await data.json();
      setLastFetched(response);

      let usersArray = [];

      response.forEach((user) => usersArray.push(user));

      setUsers(usersArray);
    };
    fetchUsers();
  }, []);

  const handleOnChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleOnClick = () => {
    const lastVisibleId = lastFetched[lastFetched.length - 1].id;
    const pagination = async () => {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/users?_start=${lastVisibleId}&_limit=${3}`
      );

      const response = await data.json();
      setLastFetched(response);

      let usersArray = [];

      response.forEach((user) => usersArray.push(user));

      setUsers((prevState) => [...prevState, ...response]);
    };
    pagination();
  };

  if (!users) {
    return <Spinner />;
  }

  const filterMonsters = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchUser.toLowerCase())
  );

  return (
    <>
      <SearchBox value={searchUser} onChange={handleOnChange} />

      <section className="container" id="monsters">
        <div className="flex-container">
          {filterMonsters.map((user) => (
            <ListItem key={user.id} user={user} id={user.id} />
          ))}
        </div>

        {lastFetched.length > 0 && (
          <button className="btn" onClick={handleOnClick}>
            Load More{" "}
          </button>
        )}
      </section>
    </>
  );
}

export default Home;
