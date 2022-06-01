import React, { useEffect, useState } from "react";
import axios from 'axios';

const TimeTable = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    department: "",
    course: "",
    room: "",
    instructor: "",
    meetingTiming: "",
  });

  useEffect(() => {
    fetchData();
    // console.log(data);
  }, []);

  const handleChange = (e) => {
    //   e.preventDefault()
    const { id, value } = e.target; //ES6 object destructuring.
    // console.log(id, value, checked, type);
    setForm({
      ...form,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payloadjson = JSON.stringify(form);

    fetch(`https://timetablebackend.herokuapp.com/timeTable`, {
      method: "POST",
      body: payloadjson,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        // console.log(res.data)
        // getData();
        fetchData();
      })
      .catch((err) => console.log(err));
    // fetchData();
  };

  const fetchData = () => {
    axios
      .get("https://timetablebackend.herokuapp.com/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleClear = () => {
    axios
      .delete("https://timetablebackend.herokuapp.com/clearTable")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const { department, course, room, instructor, meetingTiming } = form;
//   console.log(form);
  return (
    <div className="mx-auto table-responsive" style={{ textAlign: "center" }}>
      <h1>Time Table</h1>
      <form className="my-4 form-inline" onSubmit={handleSubmit}>
        <input
          required
          placeholder="Department"
          type="text"
          //   name="department"
          id="department"
          className="form-control col mr-2"
          onChange={handleChange}
          value={department}
        />
        <input
          required
          placeholder="Course"
          type="text"
          name="course"
          id="course"
          className="form-control col mr-2"
          onChange={handleChange}
          value={course}
        />
        <input
          required
          placeholder="Room"
          type="text"
          name="room"
          id="room"
          className="form-control col mr-2"
          onChange={handleChange}
          value={room}
        />
        <input
          required
          placeholder="Instructor"
          type="text"
          name="instructor"
          id="instructor"
          className="form-control col mr-2"
          onChange={handleChange}
          value={instructor}
        />
        <input
          required
          placeholder="Meeting Timing"
          type="text"
          name="meetingTiming"
          id="meetingTiming"
          className="form-control mr-2"
          onChange={handleChange}
          value={meetingTiming}
        />
        {/* <button className="btn btn-success" type="submit">
          Add
              </button> */}
        <input className="btn btn-success" type="submit" value="SUBMIT" onSubmit={handleSubmit}/>
      </form>

      <table className="table align-middle table-striped">
        <thead>
          <tr>
            <th>Class #</th>
            <th>Dept</th>
            <th>Course (number, max # of students)</th>
            <th>Room (Capacity)</th>
            <th>Instructor (Id)</th>
            <th>Meeting Time (Id)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem) => (
            <tr key={elem._id}>
              <td>{elem.class}</td>
              <td>{elem.department}</td>
              <td>{elem.course}</td>
              <td>{elem.room}</td>
              <td>{elem.instructor}</td>
              <td>{elem.meetingTiming}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 7 ? (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginRight: "5px" }}
            onClick={window.print}
          >
            Print
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TimeTable;
