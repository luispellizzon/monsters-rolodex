import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      const response = await data.json();
      setUser(response);
    };
    fetchUser();
  }, []);
  if (!user) {
    return <p>Loading</p>;
  }

  return (
    <section className="user-container">
      <div className="container">
        <h2 className="user-title">{user.name}</h2>
        <div className="flex-stats">
          <img
            src={`https://robohash.org/${user.id}?set=set2`}
            alt="Monster"
            className="card-image"
          />
          <div className="stats-info">
            <p>
              Username: <span>{user.username}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Website Portfolio: <span>{user.website}</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default User;
