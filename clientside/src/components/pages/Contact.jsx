// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Api from "../Api";
// import '../css/contact.css';

// const Contacts = ({ setUser }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("Token");
//   const [contacts, setContacts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     if (token) {
//       try {
//         const res = await axios.get(`${Api()}/getcontacts`, {
//           headers: { authorization: `Bearer ${token}` },
//         });
//         setContacts((res.data.contacts || []).filter((contact) => contact.username)); // Exclude invalid contacts
//         setUser(res.data.username);
//       } catch (error) {
//         console.error(error);
//         if (error.response && error.response.status === 401) {
//           localStorage.removeItem("Token");
//           navigate("/signin");
//         }
//       }
//     } else {
//       navigate("/signin");
//     }
//   };

//   const filteredContacts = contacts.filter((contact) =>
//     contact?.username?.toLowerCase().includes((searchQuery || "").toLowerCase())
//   );

//   return (
//     <div className="contacts-container">
//       <div className="contact-list-wrapper">
//         <div className="search-container">
//           <div className="search-input-wrapper">
//             <span className="search-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
//                 <circle cx="10" cy="10" r="7" stroke="black" strokeWidth="2" fill="none" />
//                 <line x1="15" y1="15" x2="20" y2="20" stroke="black" strokeWidth="2" />
//               </svg>
//             </span>
//             <input
//               type="text"
//               placeholder="Search contacts"
//               aria-label="Search contacts"
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input1"
//             />
//           </div>
//         </div>

//         <ul className="contact-list">
//           {filteredContacts.map((contact) => (
//             <Link className="lcn" to={`/chat/${contact._id}`} key={contact._id}>
//               <li className="contact-item1">
//                 <img
//                   src={contact.profile || "default-profile.png"}
//                   alt={`${contact.username}'s profile`}
//                 />
//                 <p className="cna">{contact.username}</p>
//               </li>
//             </Link>
//           ))}
//           {filteredContacts.length === 0 && <p className="no-results">No contacts found.</p>}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Contacts;


// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Api from "../Api";
// import "../css/contact.css";

// const Contacts = ({ setUser }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("Token");
//   const [contacts, setContacts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     if (token) {
//       try {
//         const res = await axios.get(`${Api()}/getcontacts`, {
//           headers: { authorization: `Bearer ${token}` },
//         });
//         setContacts((res.data.contacts || []).filter((contact) => contact.username)); // Exclude invalid contacts
//         setUser(res.data.username);
//       } catch (error) {
//         console.error(error);
//         if (error.response && error.response.status === 401) {
//           localStorage.removeItem("Token");
//           navigate("/signin");
//         }
//       }
//     } else {
//       navigate("/signin");
//     }
//   };

//   const deleteContact = async (contactId) => {
//     if (token) {
//       try {
//         await axios.delete(`${Api()}/deletecontact/${contactId}`, {
//           headers: { authorization: `Bearer ${token}` },
//         });
//         setContacts((prevContacts) =>
//           prevContacts.filter((contact) => contact._id !== contactId)
//         );
//       } catch (error) {
//         console.error("Failed to delete contact:", error);
//         alert("Could not delete contact. Please try again.");
//       }
//     }
//   };

//   const filteredContacts = contacts.filter((contact) =>
//     contact?.username?.toLowerCase().includes((searchQuery || "").toLowerCase())
//   );

//   return (
//     <div className="contacts-container">
//       <div className="contact-list-wrapper">
//         <div className="search-container">
//           <div className="search-input-wrapper">
//             <span className="search-icon">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
//                 <circle cx="10" cy="10" r="7" stroke="black" strokeWidth="2" fill="none" />
//                 <line x1="15" y1="15" x2="20" y2="20" stroke="black" strokeWidth="2" />
//               </svg>
//             </span>
//             <input
//               type="text"
//               placeholder="Search contacts"
//               aria-label="Search contacts"
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input1"
//             />
//           </div>
//         </div>

//         <ul className="contact-list">
//           {filteredContacts.map((contact) => (
//             <li className="contact-item1" key={contact._id}>
//               <Link className="lcn" to={`/chat/${contact._id}`}>
//                 <img
//                   src={contact.profile || "default-profile.png"}
//                   alt={`${contact.username}'s profile`}
//                 />
//                 <p className="cna">{contact.username}</p>
//               </Link>
//               <button
//                 className="delete-btn"
//                 onClick={() => deleteContact(contact._id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//           {filteredContacts.length === 0 && <p className="no-results">No contacts found.</p>}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Contacts;


import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Api from "../Api";
import "../css/contact.css";

const Contacts = ({ setUser }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null); // Track which menu is open

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    if (token) {
      try {
        const res = await axios.get(`${Api()}/getcontacts`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setContacts((res.data.contacts || []).filter((contact) => contact.username)); // Exclude invalid contacts
        setUser(res.data.username);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("Token");
          navigate("/signin");
        }
      }
    } else {
      navigate("/signin");
    }
  };

  const deleteContact = async (contactId) => {
    if (token) {
      try {
        await axios.delete(`${Api()}/deletecontact/${contactId}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== contactId)
        );
      } catch (error) {
        console.error("Failed to delete contact:", error);
        alert("Could not delete contact. Please try again.");
      }
    }
  };

  const toggleMenu = (contactId) => {
    setActiveMenu((prev) => (prev === contactId ? null : contactId)); // Toggle the menu
  };

  const filteredContacts = contacts.filter((contact) =>
    contact?.username?.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div className="contacts-container">
      <div className="contact-list-wrapper">
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <circle cx="10" cy="10" r="7" stroke="black" strokeWidth="2" fill="none" />
                <line x1="15" y1="15" x2="20" y2="20" stroke="black" strokeWidth="2" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search contacts"
              aria-label="Search contacts"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input1"
            />
          </div>
        </div>

        <ul className="contact-list">
          {filteredContacts.map((contact) => (
            <li className="contact-item1" key={contact._id}>
              <Link className="lcn" to={`/chat/${contact._id}`}>
                <img
                  src={contact.profile || "default-profile.png"}
                  alt={`${contact.username}'s profile`}
                />
                <p className="cna">{contact.username}</p>
              </Link>

              {/* Three dots menu */}
              <div className="menu-container">
                <button
                  className="menu-btn"
                  onClick={() => toggleMenu(contact._id)}
                >
                  &#x22EE;
                </button>
                {activeMenu === contact._id && (
                  <div className="dropdown-menu">
                    <button
                      className="menu-item"
                      onClick={() => {
                        deleteContact(contact._id);
                        setActiveMenu(null);
                      }}
                    >
                      Delete Contact
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
          {filteredContacts.length === 0 && <p className="no-results">No contacts found.</p>}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
