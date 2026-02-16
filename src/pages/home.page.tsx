import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Event } from "../types/event.types";
import ScrollToTop from "../components/scrollToTop.component";
import { HiArchiveBoxXMark } from "react-icons/hi2";

const HomePage = () => {
  // ---------------- Event state ----------------
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [searchEventName, setSearchEventName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAgeRate, setSelectedAgeRate] = useState("");

  // Auth //
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    age: number;
    role: string;
  } | null>(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  //Load user //
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  // Fetch events //
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchEvents = async () => {
      setLoadingEvents(true);
      setFetchError("");
      try {
        const res = await fetch("http://localhost:4000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized or server error");

        const data = await res.json();
        setEvents(data.data || []);
      } catch (err) {
        console.error(err);
        setFetchError("Failed to load events. Come back later.");
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [currentUser]);

  //  Logout //
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setEvents([]);
    setFilteredEvents([]);
  };

  //  Filter events//
  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesName = event.name
        .toLowerCase()
        .includes(searchEventName.toLowerCase());
      const matchesGenre =
        selectedGenre === "" || event.genre === selectedGenre;
      const matchesAge =
        selectedAgeRate === "" || event.agerate === selectedAgeRate;
      return matchesName && matchesGenre && matchesAge;
    });
    setFilteredEvents(filtered);
  }, [events, searchEventName, selectedGenre, selectedAgeRate]);

  //  Auth handler //
  const handleAuth = async () => {
    setAuthError("");
    setFieldErrors({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //  FRONTEND VALIDATION //
    const errors: { [key: string]: string } = {};

    // Email
    if (!authForm.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(authForm.email)) {
      errors.email = "Invalid email format";
    }

    // Password
    if (!authForm.password) {
      errors.password = "Password is required";
    } else if (authForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    
    if (!isLogin) {
      if (!authForm.name) {
        errors.name = "Name is required";
      }
      const ageNum = Number(authForm.age);
      if (!authForm.age || isNaN(ageNum) || ageNum <= 0) {
        errors.age = "Valid age is required";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    //  SEND REQUEST TO BACKEND //
    try {
      const url = isLogin
        ? "http://localhost:4000/api/users/login"
        : "http://localhost:4000/api/users/register";

      const body: any = {
        email: authForm.email,
        password: authForm.password,
      };
      if (!isLogin) {
        body.name = authForm.name;
        body.age = Number(authForm.age);
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (Array.isArray(data.details)) {
          const backendErrors: { [key: string]: string } = {};
          data.details.forEach((d: any) => {
            const field = d.path?.[1];
            if (field) backendErrors[field] = d.message;
          });
          setFieldErrors(backendErrors);
        } else {
          setAuthError(data.message || "Authentication failed");
        }
        return;
      }

     
      const userToStore = {
        name: data.user.name,
        email: data.user.email,
        age: data.user.age,
        role: data.user.role,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userToStore));
      setCurrentUser(userToStore);
      setShowAuthPopup(false);
      setAuthForm({ name: "", email: "", age: "", password: "" });
    } catch {
      setAuthError("Server error, try again later");
    }
  };

 
  return (
    <div className="home-page p-4 max-w-7xl mx-auto">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 border-b">
        <h1 className="text-xl font-bold">Movie Planner Center</h1>
        {currentUser ? (
          <div className="flex gap-4 items-center">
            <span>Hello, {currentUser.name}</span>

            {currentUser.role === "admin" && (
              <Link
                to="/add-event"
                className="bg-green-600 px-3 py-1 rounded text-white"
              >
                Add Event
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-600 px-3 py-1 rounded"
            onClick={() => {
              setShowAuthPopup(true);
              setIsLogin(true);
            }}
          >
            Sign In / Sign Up
          </button>
        )}
      </nav>

      <ScrollToTop />

      {/* Filters */}
      <div className="my-4 flex gap-2 flex-wrap">
        <input
          placeholder="Search event"
          value={searchEventName}
          onChange={(e) => setSearchEventName(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All genres</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Crime">Crime</option>
          <option value="Horror">Horror</option>
        </select>
        <select
          value={selectedAgeRate}
          onChange={(e) => setSelectedAgeRate(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All age rates</option>
          <option value="PG-13">PG-13</option>
          <option value="PG-18">PG-18</option>
        </select>
      </div>

      {/* Events */}
      {loadingEvents ? (
        <p>Loading events...</p>
      ) : fetchError ? (
        <p className="text-red-600">{fetchError}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.length === 0 && <p>No events found</p>}
          {filteredEvents.map((event) => (
            <div key={event._id} className="border p-4 rounded bg-gray-100">
              <h2 className="font-bold text-lg">{event.name}</h2>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>Age: {event.agerate}</p>
              <p>Genre: {event.genre}</p>
              <HiArchiveBoxXMark className="text-red-600 w-6" />
              <Link
                to={`/event/${event._id}`}
                className="inline-block mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Auth Popup */}
      {/* Auth Popup */}
      {showAuthPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md relative">
            {/* Stäng-knapp */}
            <button
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl mb-4 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            {!isLogin && (
              <>
                <input
                  placeholder="Name"
                  value={authForm.name}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, name: e.target.value })
                  }
                  className="w-full p-2 border mb-1"
                />
                {fieldErrors.name && (
                  <p className="text-red-500 mb-1">{fieldErrors.name}</p>
                )}

                <input
                  type="number"
                  placeholder="Age"
                  value={authForm.age}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, age: e.target.value })
                  }
                  className="w-full p-2 border mb-1"
                />
                {fieldErrors.age && (
                  <p className="text-red-500 mb-1">{fieldErrors.age}</p>
                )}
              </>
            )}

            <input
              placeholder="Email"
              value={authForm.email}
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
              className="w-full p-2 border mb-1"
            />
            {fieldErrors.email && (
              <p className="text-red-500 mb-1">{fieldErrors.email}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
              className="w-full p-2 border mb-2"
            />
            {fieldErrors.password && (
              <p className="text-red-500 mb-1">{fieldErrors.password}</p>
            )}

            {authError && (
              <p className="text-red-600 text-center mb-2">{authError}</p>
            )}

            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 py-2 rounded"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p
              className="text-center mt-2 cursor-pointer text-blue-600"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create account" : "Back to login"}
            </p>
          </div>
        </div>
      )}

      <button
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded"
        onClick={scrollToTop}
      >
        Back To Top
      </button>
    </div>
  );
};

export default HomePage;
