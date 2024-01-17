import React, { useState } from "react";
import { useNavigate } from "react-router";

// This following section will display the form that takes the input from the user.
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
	email:"",
	fullName: "",
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
    await fetch("http://localhost:5001/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateUser),
    }).catch((error) => {
      window.alert(error.message);
      return;
    });
    setForm({ name: "", password: "", fullName:"", email:""});
    navigate("/login");
  }

  return (
    <>
      <div className="container">
        <form  onSubmit={onSubmit} className="login-form py-4">
          <h3>Register to Knowledge Management System</h3>
		  <div className="form-group mt-2">
			<label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
		  <div className="form-group mt-2">

			<label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={form.fullName}
              onChange={(e) => updateForm({ fullName: e.target.value })}
            />
          </div>
		  <div className="form-group mt-2">
			<label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>

          <div className="form-group mt-2">
			<label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </div>
          <div className="form-group mt-2">
            <input className="btn btn-primary" type="submit" value="Register" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="btn btn-danger" type="submit" value="Cancel" />
          </div>
        </form>
      </div>
    </>
  );
}
