import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Showprofile.css";

function Showprofile() {
    const [showprofile, setShowprofile] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(function() {
        fetch("https://shopflow-wkvz.onrender.com/showprofile", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Failed to load profile");
            }
            return response.json();
        })
        .then(function(data) {
            console.log("profile:", data);
            setShowprofile(data);
        })
        .catch(function(error) {
            console.log("Profile error:", error);
        })
        .finally(function() {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="showprofile-loading">
                <div className="profile-loader"></div>
                <p>Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="showprofile">
            <div className="profile-page-heading">
                <div>
                    <span className="profile-eyebrow">YOUR ACCOUNT</span>
                    <h1>My Profile</h1>
                    <p>Manage your personal information and delivery details.</p>
                </div>

                <div className="profile-heading-icon">✦</div>
            </div>

            {showprofile ? (
                <div className="profile-dashboard">

                    <div className="profile-cover">
                        <div className="profile-cover-circle circle-one"></div>
                        <div className="profile-cover-circle circle-two"></div>

                        <span className="profile-cover-label">
                            SHOPFLOW MEMBER
                        </span>

                        <div className="profile-avatar">
                            {showprofile.image ? (
                                <img
                                    src={showprofile.image}
                                    alt="Profile"
                                />
                            ) : (
                                <span>
                                    {showprofile.name
                                        ? showprofile.name.charAt(0).toUpperCase()
                                        : "U"}
                                </span>
                            )}
                        </div>

                        <h2>{showprofile.name || "Your Name"}</h2>
                        <p>{showprofile.email || "No email added"}</p>

                        <div className="profile-member-badge">
                            <span>✓</span> Account Profile
                        </div>
                    </div>

                    <div className="profile-information">
                        <div className="profile-section-heading">
                            <div>
                                <span className="profile-eyebrow">
                                    PERSONAL DETAILS
                                </span>
                                <h3>Account Information</h3>
                            </div>

                            <button
                                className="profile-edit-button"
                                onClick={function() {
                                    navigate("/profile");
                                }}
                            >
                                <span>✎</span> Edit Profile
                            </button>
                        </div>

                        <div className="profile-info-grid">
                            <div className="profile-info-card">
                                <div className="profile-info-icon icon-blue">
                                    <span>♙</span>
                                </div>
                                <div>
                                    <span className="profile-info-label">
                                        FULL NAME
                                    </span>
                                    <p>{showprofile.name || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="profile-info-card">
                                <div className="profile-info-icon icon-purple">
                                    <span>✉</span>
                                </div>
                                <div>
                                    <span className="profile-info-label">
                                        EMAIL ADDRESS
                                    </span>
                                    <p>{showprofile.email || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="profile-info-card">
                                <div className="profile-info-icon icon-green">
                                    <span>☎</span>
                                </div>
                                <div>
                                    <span className="profile-info-label">
                                        PHONE NUMBER
                                    </span>
                                    <p>{showprofile.phone || "Not provided"}</p>
                                </div>
                            </div>

                            <div className="profile-info-card profile-address-card">
                                <div className="profile-info-icon icon-orange">
                                    <span>⌖</span>
                                </div>
                                <div>
                                    <span className="profile-info-label">
                                        DELIVERY ADDRESS
                                    </span>
                                    <p>{showprofile.address || "No address added yet"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="profile-bottom-note">
                            <span className="profile-note-icon">🔒</span>
                            <div>
                                <strong>Your information matters</strong>
                                <p>Keep your contact and delivery details up to date for a smoother shopping experience.</p>
                            </div>
                        </div>

                        <button
                            className="profile-primary-button"
                            onClick={function() {
                                navigate("/profile");
                            }}
                        >
                            Edit Personal Information
                            <span>→</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="profile-empty">
                    <div className="profile-empty-icon">♙</div>
                    <h2>Your profile is waiting</h2>
                    <p>Add your phone number and delivery address to make checkout easier.</p>

                    <button
                        className="profile-primary-button"
                        onClick={function() {
                            navigate("/profile");
                        }}
                    >
                        + Add Profile
                    </button>
                </div>
            )}
        </div>
    );
}

export default Showprofile;