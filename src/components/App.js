import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import TodoList from './TodoList/TodoList';
import MyCarousel from './MyCarousel/MyCarousel';
import MyCheckboxTree from './MyCheckboxTree/MyCheckboxTree';
import MyKonvaCanvas from './MyKonvaCanvas/MyKonvaCanvas';


function App() {
  return (
    <div className="container-fluid">
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/courses" component={CoursesPage}/>
        <Route path="/course/:slug" component={ManageCoursePage}/>
        <Route path="/course" component={ManageCoursePage}/>
        <Route path="/todo" component={TodoList}/>
        <Route path="/slides" component={MyCarousel}/>
        <Route path="/checkboxtree" component={MyCheckboxTree}/>
        <Route path="/konva" component={MyKonvaCanvas}/>
        
        <Route component={PageNotFound}/>
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
