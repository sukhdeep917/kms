import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">KMS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" 
  data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
        <a class="nav-link" href="Dashboard"> Dashboard <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="Project"> Project </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="Assigne project">Assigne project</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="user List">User List</a>
      </li>
    </ul>
    <span class="navbar-text">
    <a class="nav-link" href="Logout">Logout</a>
    </span>
  </div>
</nav>
    </div>
  );
}
