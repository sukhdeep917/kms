import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
const Record = (props) => (
 <tr>
   <td>{props.record.title}</td>
   <td>{props.record.description}</td>
   <td>
     <Link className="btn btn-link" to={`/edit-knowledge/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
export default function KnowledgeList() {
 const [records, setRecords] = useState([]);
  // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5001/record/`);
      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const records = await response.json();
     setRecords(records);
   }
    getRecords();
    return;
 }, [records.length]);
  // This method will delete a record
 async function deleteRecord(id) {
	await fetch(`http://localhost:5001/record/${id}`,{method:"DELETE"});
    const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
  // This method will map out the records on the table
 function knowledgeList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
  // This following section will display the table with the records of individuals.
 return (
   <div className="container">
     <h3>Knowledge List </h3>
	 <NavLink to="/create-knowledge" className="btn btn-primary">Create</NavLink>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Title</th>
           <th>Description</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{knowledgeList()}</tbody>
     </table>
   </div>
 );
}
