import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [image, setImage] = React.useState("");

    useEffect(function() {
        fetch("https://shopflow-wkvz.onrender.com/profile", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("profile:", data);

            setName(data.name || "");
            setEmail(data.email || "");
            setPhone(data.phone || "");
            setAddress(data.address || "");
            setImage(data.image || "");
        })
        .catch(function(error) {
            console.log("Profile loading error:", error);
        });
    }, []);

    function saveProfile() {
        fetch("https://shopflow-wkvz.onrender.com/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                address: address,
                image: image
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("profile saved:", data);
            alert(data.message || "Profile saved successfully");
            navigate("/showprofile");
        })
        .catch(function(error) {
            console.log("Profile saving error:", error);
            alert("Unable to save profile");
        });
    }

    return (
        <div className="profile-form-page">
            <div className="profile-form-heading">
                <span className="profile-form-eyebrow">SHOPFLOW ACCOUNT</span>
                <h1>Complete Your Profile</h1>
                <p>Keep your personal and delivery information up to date.</p>
            </div>

            <div className="profile-form-card">
                <div className="profile-form-banner">
                    <div className="profile-form-avatar">
                        {image ? (
                            <img src={image} alt="Profile preview" />
                        ) : (
                            <span>
                                {name ? name.charAt(0).toUpperCase() : "U"}
                            </span>
                        )}
                    </div>

                    <h2>{name || "Your Profile"}</h2>
                    <p>{email || "Add your account details below"}</p>
                </div>

                <div className="profile-form-content">
                    <div className="profile-form-section-title">
                        <span>01</span>
                        <div>
                            <h3>Personal Information</h3>
                            <p>Your basic contact details</p>
                        </div>
                    </div>

                    <div className="profile-form-grid">
                        <div className="profile-form-field">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={function(event) {
                                    setName(event.target.value);
                                }}
                            />
                        </div>

                        <div className="profile-form-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={function(event) {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>

                        <div className="profile-form-field">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={function(event) {
                                    setPhone(event.target.value);
                                }}
                            />
                        </div>

                        <div className="profile-form-field">
                            <label>Profile Image URL</label>
                            <input
                                type="url"
                                placeholder="Paste an image URL"
                                value={image}
                                onChange={function(event) {
                                    setImage(event.target.value);
                                }}
                            />
                        </div>

                        <div className="profile-form-field profile-address-field">
                            <label>Delivery Address</label>
                            <textarea
                                placeholder="House number, street, city, state and PIN code"
                                value={address}
                                onChange={function(event) {
                                    setAddress(event.target.value);
                                }}
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className="profile-form-tip">
                        <span>ⓘ</span>
                        <p>Your address helps you complete checkout more quickly.</p>
                    </div>

                    <div className="profile-form-actions">
                        <button
                            className="profile-form-cancel"
                            onClick={function() {
                                navigate("/showprofile");
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            className="profile-form-save"
                            onClick={saveProfile}
                        >
                            Save Profile <span>→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;