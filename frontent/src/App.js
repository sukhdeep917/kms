import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";

import  "./App.css";
import Register from "./components/register";
import KnowledgeList from "./components/knowledge";
import CreateKnowledge from "./components/createKnowledge";
import EditKnowledge from "./components/editKnowledge";
import ProjectList from "./components/project/project";
import CreateProject from "./components/project/createProject";
import EditProject from "./components/project/editProject";
 const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/register" element={<Register />} />
	   <Route exact path="/knowledge" element={<KnowledgeList/>}/>
	   <Route exact path="/create-knowledge" element={<CreateKnowledge/>}/>
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/edit-knowledge/:id" element={<EditKnowledge />} />
       <Route path="/create" element={<Create />} />

	   <Route exact path="/project" element={<ProjectList/>}/>
	   <Route exact path="/create-project" element={<CreateProject/>}/>
       <Route path="/edit-project/:id" element={<EditProject />} />


     </Routes>
   </div>
 );
};
 export default App;
