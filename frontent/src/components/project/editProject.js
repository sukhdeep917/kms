import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 export default function EditProject() {
 const [form, setForm] = useState({
   title: "",
   description: "",
 });
 const params = useParams();
 const navigate = useNavigate();
  useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5001/project/${params.id.toString()}`);
      if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const record = await response.json();
     if (!record) {
       window.alert(`Project with id ${id} not found`);
       navigate("/");
       return;
     }
      setForm(record);
   }
    fetchData();
    return;
 }, [params.id, navigate]);
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     title: form.title,
     description: form.description,
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5001/project/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/project");
 }
  // This following section will display the form that takes input from the user to update the data.
 return (
   <div className="container">
     <h3>Update Project</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group mt-2">
         <label htmlFor="title">Title: </label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group mt-2">
         <label htmlFor="description">Description: </label>
         <textarea
		 rows={10}
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>

       <div className="form-group mt-2">
         <input
           type="submit"
           value="Update Project"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
