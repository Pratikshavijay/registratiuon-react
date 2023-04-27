import { useState } from 'react';
import axios from 'axios'
function Registration() {
    const [registration, setRegistration] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""

    })
    const [record, setRecord] = useState([])
    const [error, setError] = useState(false)
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value)
        setRegistration({ ...registration, [name]: value })

    }
    let baseUrl = 'http://localhost:8081/api/user/registration'
    const handlesubmit = (e) => {
        e.preventDefault();
        if (registration.firstname.length == 0 || registration.lastname.length == 0 || registration.email.length == 0 || registration.password.length == 0) {
            console.log("please submit all these fields ")
            setError(true)
        } else {
            console.log(registration.firstname.length)
            let payload = {
                firstName: registration.firstname,
                lastName: registration.lastname,
                email: registration.email,
                password: registration.password

            }
            console.log("payload is............... ", payload)
            axios.post(baseUrl, payload).then((response) => {
                console.log("this is then part")

            }).catch((error) => {
                console.log(error)
            })
            const newRecord = { ...registration }
            console.log(newRecord)
            setRecord([...record, newRecord])
            setRegistration({ "firstname": "", "lastname": "", "email": "", "password": "" })
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">

                        <h2>REGISTRATION</h2>
                        <form action="" onSubmit={handlesubmit}>
                            <input type="text" className=" form-control mt-2 "
                                value={registration.firstname}
                                onChange={handleInput}
                                name="firstname" placeholder="firstname" />
                            {error && registration.firstname.length <= 0 ?
                                <label className='show1'>PLEASE ENTER YOUR NAME </label> : ""}
                            <input type="text" className="form-control mt-2"
                                value={registration.lastname}
                                onChange={handleInput}
                                name="lastname" placeholder="lastname" />
                            {error && registration.lastname.length <= 0 ?
                                <label className='show1'>PLEASE ENTER YOUR LASTNAME</label> : ""}
                            <input type="email" className="form-control mt-2"
                                value={registration.email}
                                onChange={handleInput}
                                name="email" placeholder="email" />
                            {error && registration.email.length <= 0 ?
                                <label className='show1'>PLEASE ENTER A VALID EMAIL ADDRESS</label> : ""}
                            <input type="password" className="form-control mt-2"
                                value={registration.password}
                                onChange={handleInput}
                                name="password" placeholder="password" />
                            {error && registration.password.length <= 0 ?
                                <label className='show1'>PLEASE ENTER PASSWORD</label> : ""}
                            <button type="submit" className="btn btn-primary form-control mt-2 mb-2">SIGN UP</button>
                        </form>

                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    );
}

export default Registration;