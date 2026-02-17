import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEventPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    starttime: "",
    endtime: "",
    description: "",
    agerate: "",
    genre: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create an event");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create event");
      } else {
        alert("Event created successfully!");
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      setError("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Start Time"
        name="starttime"
        type="time"
        value={form.starttime}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="End Time"
        name="endtime"
        type="time"
        value={form.endtime}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Age Rate"
        name="agerate"
        value={form.agerate}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Genre"
        name="genre"
        value={form.genre}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-white text-black px-3 py-1 rounded mt-2 w-full"
      >
        {loading ? "Creating..." : "Create Event"}
      </button>
    </div>
  );
};

export default AddEventPage;
