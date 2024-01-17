import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function CreateProject() {
 const [form, setForm] = useState({
   title: "",
   description: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
// This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
    await fetch("http://localhost:5001/project/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

    setForm({ title: "", description: "" });
   navigate("/project");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div className="container">
     <h3>Create New Project</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group mt-2">
         <label htmlFor="name">Title</label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group mt-2">
         <label htmlFor="position">Description</label>
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
           value="Create Project"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
