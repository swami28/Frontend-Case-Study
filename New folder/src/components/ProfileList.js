import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("/api/profiles")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile List</h1>
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="profile-card">
            <img src={profile.photo} alt={profile.name} />
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <button onClick={() => handleSummaryClick(profile)}>Summary</button>
            <button onClick={() => handleProfileClick(profile.id)}>Details</button>
          </div>
        ))}
      </div>
      {selectedProfile && <MapComponent address={selectedProfile.address} />}
    </div>
  );
}

export default ProfileList;


---

File: src/components/ProfileDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/profiles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found!</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <img src={profile.photo} alt={profile.name} />
      <p>{profile.description}</p>
      <p>Contact: {profile.contact}</p>
      <p>Interests: {profile.interests}</p>
    </div>
  );
}

export default ProfileDetails;