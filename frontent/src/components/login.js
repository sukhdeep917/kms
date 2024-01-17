import React, { useState } from "react";
import { useNavigate } from "react-router";

// This following section will display the form that takes the input from the user.
export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    const validateUser = { ...form };
    let message = await fetch("http://localhost:5001/user/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });
	if(message.ok ) {
		setForm({ name: "", password: ""});
		navigate("/");
	} else {
		console.log(message)
		alert("Username or Password Invalid");
	}
  }

  return (
    <>
      <div className="container">
        <form  onSubmit={onSubmit} className="login-form py-4">
          <h3>Knowledge Management System</h3>
          <div className="form-group">
            <input
              type="text"
              class="form-control"
              id="name" placeholder="Username"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
            <br />
          </div>
          <div className="form-group">
            <input
              type="password"
              class="form-control"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
            <br />
          </div>
          <div className="form-group">
            <input className="btn btn-primary" placeholder="Password" type="submit" value="Login" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="btn btn-danger" type="submit" value="Cancel" />
          </div>
          <div className="form-group">
          <a  href="#">Forget Password</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a  href="#">Sign Up</a>
          </div>
          
        </form>
      </div>
    </>
  );
}
