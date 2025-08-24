import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
   deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,  
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
  const { currentUser, loading, error  } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [file, setFile] = useState(undefined);
  const [preview, setPreview] = useState(currentUser.avatar); // fallback to current avatar
  console.log(file);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
    avatar: currentUser.avatar || "",
  });

  // Handle file preview
  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Set formData
    setFormData((prevData) => ({
      ...prevData,
      avatar: objectUrl,
    }));
    // Clean up memory
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid image file.");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
        Profile
      </h1>
      <div className=" p-6 rounded-2xl shadow-md bg-slate-200">
        <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={preview}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 ring-2 ring-slate-500 hover:scale-105 transition-transform duration-300"
          />
          <input
            type="text"
            placeholder="Username"
            className=" bg-slate-50 border p-3 rounded-lg "
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-slate-50 border p-3 rounded-lg"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <input
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="bg-slate-50 border p-3 rounded-lg"
            id="password"
          />
           <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        </form>
      </div>
      <div className="flex justify-between mt-6 text-sm text-slate-600">
         <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer hover:underline ">
          Sign Out
        </span>
      </div>
       <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  );
}
