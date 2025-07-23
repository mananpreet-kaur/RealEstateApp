import { useSelector } from "react-redux";
import{useRef,useState,useEffect} from 'react';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef= useRef(null);
  const [file, setFile]= useState(undefined)
   const [preview, setPreview] = useState(currentUser.avatar); // fallback to current avatar
  console.log(file);
 const [formData, setFormData] = useState({
    username: currentUser.username || '',
    email: currentUser.email || '',
    password: '',
    avatar: currentUser.avatar || ''
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

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid image file.');
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">Profile</h1>
       <div className=" p-6 rounded-2xl shadow-md bg-slate-200">
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept='image/*'onChange={handleFileChange}/>
        <img
        onClick={()=>fileRef.current.click()}
          src={preview}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 ring-2 ring-slate-500 hover:scale-105 transition-transform duration-300"
        />
        <input type="text" placeholder="Username" className=" bg-slate-50 border p-3 rounded-lg " id='username' />
        <input type="email" placeholder="Email" className="bg-slate-50 border p-3 rounded-lg" id='email' />
        <input type="text" placeholder="Password" className="bg-slate-50 border p-3 rounded-lg" id='password' />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-60">Update</button>
      </form>
      </div>
      <div className="flex justify-between mt-6 text-sm text-slate-600">
        <span className="text-red-700 cursor-pointer  hover:underline ">Delete Account</span>
        <span className="text-red-700 cursor-pointer hover:underline ">Sign Out</span>
      </div>
    </div>
  );
}
