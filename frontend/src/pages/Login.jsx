import { useState } from "react"

import { Link } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!username || !password) {
            alert("All the fields are required")
            return
        }
        if (password.length < 8) {
            alert("Password length should be atleast 8 characters")
            return
        }
        alert("Login successfully")
        console.log(username)
        console.log(password)
    }

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5 p-4">
                        <div className="text-center">
                            <h1>Login</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 text-start">
                                <label className="form-label">Username</label>
                                <input className="form-control" type="text" placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label">Password</label>
                                <input className="form-control" type="password" placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary w-100 mt-4" type="submit">
                                Login
                            </button>
                            <div>
                                <p className="text-center mt-3">
                                    Don't have an account? <Link to="/signup">Signup</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login