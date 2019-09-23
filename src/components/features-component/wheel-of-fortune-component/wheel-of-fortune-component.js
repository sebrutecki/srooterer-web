import React, { useState, useEffect } from "react";
import './wheel-of-fortune-component.css';

function WheelOfFortune() {

  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
    .then(res => res.json())
    .then(
      (result) => {
        setUsers(result.data);
      },
      (error) => {
        console.log(error)
      }
    )
  }, []);

	return users ? (
    <div className="wheel-of-fortune">
        <h2>
        	Wheel of fortune
        </h2>

        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name}
            </li>
          ))}

        </ul>
    </div>
	) : (
    <div className="wheel-of-fortune">
      <h2>
        Wheel of fortune loading
      </h2>
    </div>
  );
}

export default WheelOfFortune;
