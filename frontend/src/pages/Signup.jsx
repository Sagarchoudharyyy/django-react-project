import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("")
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {}

        // Email validation
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if (!emailRegex.test(email)) {
                newErrors.email =
                    "Please enter a valid email address"
            }
        }

        // Password validation
        if (password && password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters"
        }

        // Confirm password validation
        if (
            confirmPassword &&
            password !== confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match"
        }

        // Stop form submission if errors exist
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})

        // Required fields check
        if (
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setMessage("All fields are required")
            setMessageType("danger")
            return
        }

        try {
            const response = await fetch(
                "http://localhost:8000/api/signup/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        confirm_password: confirmPassword,
                    }),
                }
            )

            const data = await response.json()

            if (response.ok) {
                setMessage(
                    "Signup successful! Please login."
                )
                setMessageType("success")

                setUsername("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")

                navigate("/login")
            } else {
                setMessage(
                    data.message || "Signup failed"
                )
                setMessageType("danger")
            }
        } catch (error) {
            console.error(
                "Error during signup:",
                error
            )

            setMessage(
                "An error occurred during signup. Please try again later."
            )

            setMessageType("danger")
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">
                            Signup
                        </h2>
                        <div className="w-100 text-center p-0 mb-4">
                            {message && (
                                <p className="text-danger mt-2 mb-0">
                                    {message}
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <div className="mb-3 text-start">
                                <label className="form-label">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-3 text-start">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className={`form-control ${errors.email
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                />

                                {errors.email && (
                                    <small className="text-danger">
                                        {errors.email}
                                    </small>
                                )}
                            </div>

                            {/* Password */}
                            <div className="mb-3 text-start">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className={`form-control ${errors.password
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                />

                                {errors.password && (
                                    <small className="text-danger">
                                        {errors.password}
                                    </small>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-3 text-start">
                                <label className="form-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    className={`form-control ${errors.confirmPassword
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                />

                                {errors.confirmPassword && (
                                    <small className="text-danger">
                                        {
                                            errors.confirmPassword
                                        }
                                    </small>
                                )}
                            </div>

                            <button className="btn btn-primary w-100">
                                Signup
                            </button>



                            <p className="text-center mt-3">
                                Already have an
                                account?{" "}
                                <Link to="/login">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup