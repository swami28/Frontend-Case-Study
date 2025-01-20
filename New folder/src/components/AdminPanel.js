import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ name: "", description: "", photo: "" });

  useEffect(() => {
    fetch("/api/profiles")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => {
    fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProfile),
    })
      .then((res) => res.json())
      .then((data) => setProfiles([...profiles, data]))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`/api/profiles/${id}`, { method: "DELETE" })
      .then(() => setProfiles(profiles.filter((profile) => profile.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <input
        type="text"
        placeholder="Name"
        value={newProfile.name}
        onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProfile.description}
        onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={newProfile.photo}
        onChange={(e) => setNewProfile({ ...newProfile, photo: e.target.value })}
      />
      <button onClick={handleAdd}>Add Profile</button>
      <div>
        {profiles.map((profile) => (
          <div key={profile.id}>
            <span>{profile.name}</span>
            <button onClick={() => handleDelete(profile.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
