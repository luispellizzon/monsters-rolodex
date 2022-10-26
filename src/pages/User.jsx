import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

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
    return <Spinner />;
  }

  return (
    <>
      <section className="user-container">
        <div className="container">
          <div className="heading">
            <BackButton />
            <h2 className="user-title">{user.name}</h2>
          </div>
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
          <div className="location-container">
            <h2 className="location">Location</h2>
            <div className="leaflet-container">
              <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={[user.address.geo.lat, user.address.geo.lng]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                />
                <Marker position={[user.address.geo.lat, user.address.geo.lng]}>
                  <Popup>{user.address.street}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default User;
