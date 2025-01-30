// import React, { useEffect, useState } from "react";
// import Api from "../Api";
// import axios from "axios";
// import Swal from 'sweetalert2';
// import "../css/home.css";  // Import custom CSS file
// import { useNavigate, Link } from "react-router-dom";
// import { FaSearch, FaUser, FaSignOutAlt, FaComments, FaPlusCircle } from "react-icons/fa"; // Import React Icons

// const Home = ({ setUser }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('Token');
//   const [chatMembers, setChatMembers] = useState([]);
//   const [currentPage, setCurrentPage] = useState("chats");
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const filteredContacts = chatMembers.filter((mb) =>
//     mb.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleImageChange = async (e) => {
//     const profile = await convertBase64(e.target.files[0]);
//     setProfileData((pre) => ({ ...pre, profile: profile }));
//   };

//   function convertBase64(file) {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   }

//   // const handleOpenChat = async (_id) => {
//   //   try {
//   //     const res = await axios.get(`${Api()}/openchat/${_id}`, {
//   //       headers: { "authorization": `Bearer ${token}` },
//   //     });
//   //     fetchUser();
//   //   } catch (error) {
//   //     console.log(error.response);
//   //   }
//   // };

//   const handleOpenChat = async (_id) => {
//     try {
//       const res = await axios.get(`${Api()}/openchat/${_id}`, {
//         headers: { "authorization": `Bearer ${token}` },
//       });
  
//       // Reset unreadCount to 0 for the opened chat
//       setChatMembers((prev) =>
//         prev.map((member) =>
//           member._id === _id ? { ...member, unreadCount: 0 } : member
//         )
//       );
  
//       fetchUser();
//     } catch (error) {
//       console.log(error.response);
//     }
//   };
  
//   const handleProfileClick = () => {
//     setCurrentPage("profile");
//   };

//   const handleChatClick = () => {
//     setCurrentPage("chats");
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     if (token) {
//       try {
//         setIsEditing(false);
//         const res = await axios.put(`${Api()}/edituser`, profileData, {
//           headers: { "authorization": `Bearer ${token}` },
//         });
//         Swal.fire({
//           title: 'Updated!',
//           text: `${res.data.msg}`,
//           icon: 'success',
//           confirmButtonText: 'OK',
//           customClass: {
//             popup: 'bg-white rounded-lg shadow-md',
//             title: 'text-lg font-semibold text-gray-800',
//             htmlContainer: 'text-sm text-gray-600',
//             confirmButton: 'bg-teal-600 text-white px-5 py-2 rounded hover:bg-teal-700',
//           },
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       navigate('/signin');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // const fetchUser = async () => {
//   //   if (token) {
//   //     try {
//   //       const res = await axios.get(`${Api()}/getuser`, {
//   //         headers: { "authorization": `Bearer ${token}` },
//   //       });
//   //       setProfileData(res.data.user);
//   //       setUser(res.data.user.username);
//   //       setChatMembers([...new Map(res.data.chatMembers.map(member => [member._id, member])).values()].reverse());
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   } else {
//   //     navigate('/signin');
//   //   }
//   // };


//   const fetchUser = async () => {
//     if (token) {
//       try {
//         const res = await axios.get(`${Api()}/getuser`, {
//           headers: { "authorization": `Bearer ${token}` },
//         });
  
//         setProfileData(res.data.user);
//         setUser(res.data.user.username);
  
//         const chatData = res.data.chatMembers.map(member => ({
//           ...member,
//           unreadCount: member.unreadCount || 0,  // Ensure unreadCount is defined
//         }));
  
//         setChatMembers([...new Map(chatData.map(member => [member._id, member])).values()].reverse());
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       navigate('/signin');
//     }
//   };
  

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You will be logged out of your account!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#008080',
//       cancelButtonColor: '#f4f4f4',
//       confirmButtonText: '<span style="color: white;">Yes, log me out!</span>',
//       cancelButtonText: '<span style="color: #333;">Cancel</span>',
//       background: '#ffffff',
//       color: '#333',
//       customClass: {
//         title: 'text-lg font-bold',
//         content: 'text-sm',
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setUser('');
//         navigate('/signin');
//         localStorage.removeItem('Token');

//         Swal.fire({
//           title: 'Logged Out',
//           text: 'You have been successfully logged out.',
//           icon: 'success',
//           timer: 1000,
//           showConfirmButton: false,
//           background: '#ffffff',
//           color: '#008080',
//           iconColor: '#008080',
//         });
//       }
//     });
//   };

//   const formatLastMessageTime = (member) => {
//     try {
//       const { lastMessageDate, lastMessageTime } = member;

//       // Check if lastMessageDate or lastMessageTime is available
//       if (!lastMessageDate || !lastMessageTime) {
//         return "No message time available";
//       }

//       const [day, month, year] = lastMessageDate.split('/').map(Number);
//       const [time, ampm] = lastMessageTime.split(' ');

//       if (!time || !ampm) {
//         return lastMessageTime; // If time or ampm is missing, return the lastMessageTime directly
//       }

//       const [hours, minutes, seconds] = time.split(':').map(Number);
//       const hours24 = ampm.toLowerCase() === 'am' ? (hours === 12 ? 0 : hours) : (hours === 12 ? 12 : hours + 12);
      
//       const lastMessageDateTime = new Date(year, month - 1, day, hours24, minutes, seconds);
//       const now = new Date();
//       const isSameDay = lastMessageDateTime.getFullYear() === now.getFullYear() &&
//                         lastMessageDateTime.getMonth() === now.getMonth() &&
//                         lastMessageDateTime.getDate() === now.getDate();
      
//       return isSameDay ? lastMessageTime : lastMessageDate;
//     } catch (error) {
//       console.error("Error parsing date/time:", error);
//       return "Invalid date/time";
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="sidebar">
//   <nav className="sidebar-nav">
//     <ul className="nav-links top-links">
//       <li>
//         <button onClick={handleChatClick} className="nav-button">
//           <FaComments className="nav-icon" />
//           Chats
//         </button>
//       </li>
//     </ul>
//     <ul className="nav-links bottom-links">
//       <li>
//         <button onClick={handleProfileClick} className="nav-button">
//           <FaUser className="nav-icon" />
//           Profile
//         </button>
//       </li>
//       <li>
//         <button onClick={handleLogout} className="nav-button">
//           <FaSignOutAlt className="nav-icon" />
//           Logout
//         </button>
//       </li>
//     </ul>
//   </nav>
// </div>


//       <div className="main-content">
//         {currentPage === "chats" ? (
//           <div>
//             <h2 className="page-title">Chats</h2>

//             <div className="contacts-grid">
//               {filteredContacts.map((member) => (
//                 <Link className="infde" to={`/chat/${member._id}`} key={member._id} onClick={() => handleOpenChat(member._id)}>
//                   <div className="contact-card">
//                     <div className="contact-info">
//                       <img
//                         src={member.profile}
//                         alt={member.username}
//                         className="contact-avatar"
//                       />
//                       <div className="contact-details">
//                         <p className="contact-username">{member.username}</p>
//                         <p className="contact-last-message">{member.lastMessage || "No messages yet..."}</p>
//                       </div>
//                     </div>
//                     <div className="contact-time">
//                       {member.lastMessageTime && (
//                         <p className="message-time">
//                           {formatLastMessageTime(member)}
//                         </p>
//                       )}
//                       {member.unreadCount > 0 && (
//   <div className="unread-count">{member.unreadCount}</div>
// )}

//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>

//             <button onClick={() => navigate('/contacts')} className="new-chat-button">
//               <FaPlusCircle className="new-chat-icon" />
//             </button>
//           </div>
//         ) : (
//           <div>
//             <h2 className="page-title">Your Profile</h2>
//             <div className="profile-container">
//               <div className="profile-image">
//                 <img src={profileData.profile} alt="Profile" />
//                 {isEditing && (
//                   <label htmlFor="profile" className="profile-edit-label">
//                     <FaUser className="edit-icon" />
//                     <input
//                       id="profile"
//                       type="file"
//                       className="profile-file-input"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 )}
//               </div>

//               <div className="account-details">
//                 <div className="input-group">
//                   <label>Name</label>
//                   <input
//                     type="text"
//                     name="username"
//                     value={profileData.username}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={profileData.email}
//                     disabled={!isEditing}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label>Phone</label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={profileData.phone}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                   />
//                 </div>
//               </div>

//               <div className="profile-actions">
//                 {!isEditing ? (
//                   <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
//                 ) : (
//                   <button onClick={handleSaveClick} className="save-button">Save Changes</button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import Api from "../Api";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/home.css"; // Import custom CSS file
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaUser, FaSignOutAlt, FaComments, FaPlusCircle } from "react-icons/fa"; // Import React Icons

const Home = ({ setUser }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [chatMembers, setChatMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState("chats");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/signin"); // Redirect to login if user is not authenticated
    } else {
      fetchUser();
    }
  }, [navigate, token]); // Ensure dependency array includes `navigate`

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${Api()}/getuser`, {
        headers: { authorization: `Bearer ${token}` },
      });

      setProfileData(res.data.user);
      setUser(res.data.user.username);

      const chatData = res.data.chatMembers.map((member) => ({
        ...member,
        unreadCount: member.unreadCount || 0, // Ensure unreadCount is defined
      }));

      setChatMembers(
        [...new Map(chatData.map((member) => [member._id, member])).values()].reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenChat = async (_id) => {
    try {
      await axios.get(`${Api()}/openchat/${_id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      // Reset unreadCount to 0 for the opened chat
      setChatMembers((prev) =>
        prev.map((member) => (member._id === _id ? { ...member, unreadCount: 0 } : member))
      );

      fetchUser();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#f4f4f4",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("Token"); // Remove token
        setUser("");
        navigate("/signin"); // Redirect to login page
      }
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (token) {
      try {
        setIsEditing(false);
        const res = await axios.put(`${Api()}/edituser`, profileData, {
          headers: { authorization: `Bearer ${token}` },
        });
        Swal.fire("Updated!", res.data.msg, "success");
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/signin");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredContacts = chatMembers.filter((mb) =>
    mb.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav-links top-links">
            <li>
              <button onClick={() => setCurrentPage("chats")} className="nav-button">
                <FaComments className="nav-icon" />
                Chats
              </button>
            </li>
          </ul>
          <ul className="nav-links bottom-links">
            <li>
              <button onClick={() => setCurrentPage("profile")} className="nav-button">
                <FaUser className="nav-icon" />
                Profile
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-button">
                <FaSignOutAlt className="nav-icon" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        {currentPage === "chats" ? (
          <div>
            <h2 className="page-title">Chats</h2>
            <div className="contacts-grid">
              {filteredContacts.map((member) => (
                <Link
                  className="infde"
                  to={`/chat/${member._id}`}
                  key={member._id}
                  onClick={() => handleOpenChat(member._id)}
                >
                  <div className="contact-card">
                    <div className="contact-info">
                      <img src={member.profile} alt={member.username} className="contact-avatar" />
                      <div className="contact-details">
                        <p className="contact-username">{member.username}</p>
                        <p className="contact-last-message">{member.lastMessage || "No messages yet..."}</p>
                      </div>
                    </div>
                    <div className="contact-time">
                      {member.lastMessageTime && <p className="message-time">{member.lastMessageTime}</p>}
                      {member.unreadCount > 0 && <div className="unread-count">{member.unreadCount}</div>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button onClick={() => navigate("/contacts")} className="new-chat-button">
              <FaPlusCircle className="new-chat-icon" />
            </button>
          </div>
        ) : (
          <div>
            <h2 className="page-title">Your Profile</h2>
            <div className="profile-container">
              <div className="profile-image">
                <img src={profileData.profile} alt="Profile" />
              </div>
              <div className="account-details">
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" name="email" value={profileData.email} disabled={!isEditing} />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="profile-actions">
                {!isEditing ? (
                  <button onClick={handleEditClick} className="edit-button">
                    Edit Profile
                  </button>
                ) : (
                  <button onClick={handleSaveClick} className="save-button">
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
