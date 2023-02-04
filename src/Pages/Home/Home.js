import React, { useEffect, useState } from "react";
import "./Home.css";
import { db } from "../../firebase";
// import {GrView} from "react-icons/gr"
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    db.child("students").on("value", (snapshot) => {
      if (snapshot.val() != null) setData({ ...snapshot.val() });
      else setData({});
    });
    return () => {
      setData({});
    };
  }, []);
  console.log(data);

  const onDelete=(id)=>{
    if(window.confirm("Are you sure you want to delete student data!")){
      db.child(`students/${id}`).remove((err)=>{
        if(err)
          toast.error(err);
        else
          toast.success("Deleted successfully")
      });
    }
  }
  return (
    <div className="student">
      <h2>Manage Students</h2>
      <table className="student_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Roll Number</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <td>
                  {data[id].firstName} {data[id].lastName}{" "}
                </td>
                <td>
                  {data[id].class} {data[id].division}
                </td>
                <td>{data[id].rollNumber}</td>
                <td className="functional_col">
                  {/* <GrView className="functional_icons"/> */}
                  <Link to={`/update/${id}`}>
                    <AiOutlineEdit className="functional_icons" />
                  </Link>
                  <MdDeleteOutline className="functional_icons" onClick={()=>{
                    onDelete(id);
                  }}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
