import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ showAlert }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  let host = "http://localhost:3002";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const res = await response.json();
    if (res.success) {
      navigate("/home");
      localStorage.setItem("token", res.auhttoken);
      showAlert("Account created successfully", "success");
    } else {
      showAlert("Invalid Details", "danger");
    }
    setUser({ name: "", email: "", password: "" });
  };
  return (
    <>
      <div className="container my-5">
        <h1>Create an account to use iNotebook</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              minLength={3}
              required
              className="form-control"
              id="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              minLength={5}
              required
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              minLength={5}
              required
              className="form-control"
              id="password"
            />
          </div>

          <button
            type="submit"
            disabled={
              user.name.length < 3 || !user.email || user.password.length < 5
            }
            className="btn btn-primary"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
