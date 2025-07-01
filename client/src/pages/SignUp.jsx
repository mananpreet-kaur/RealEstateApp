// import  React from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
export default function SignUp() {
  const [formData, setFormData] =useState({});
  const [error, setError] = useState(null); // Declare error state
  const [loading, setLoading] = useState(false); // Declare loading state
  const navigate = useNavigate(); // Initialize navigate hook
  const handleChange = (e)=>{
     setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });

  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
     try {
      setLoading(true); // Set loading to true when starting the request
      setError(null); // Clear previous errors

const res =await fetch('/api/auth/signup' ,
{ 
  method:'POST',
  headers:{
    'Content-Type':'application/json',   
  },
  body:JSON.stringify(formData), //for safety

});
const data = await res.json();
      console.log(data);

      // This check is good if your backend sends { success: false, message: "..." }
      // even for 200 OK responses (e.g., for specific validation errors).
      if (data.success === false) {
        setLoading(false);
        setError(data.message); // Use setError instead of StorageError
        return;
      }

      setLoading(false);
      setError(null); // Clear any error if it was a success
      navigate('/sign-in'); // Navigate to sign-in on successful signup

    }catch (error) {
      setLoading(false);
      setError(error.message); // Catch network errors or issues with res.json()
    }
  };
// try{
// const data= await res.json();
// console.log(data);
// if(data.success===false){
//   setLoading(false);
//   StorageError(data.message);
//   return;
// }
// setLoading(false);
// setError(null);
// navigate('/sign-in');
// }catch(error){
//    setLoading(false);
//    setError(error.message);
//   }

// };
  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-7'> Sign Up    </h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className=' border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="email" placeholder='E-mail' className=' border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='Password' className=' border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> Sign Up</button>
      </form>
       <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign In</span>
        </Link>
       </div>
        {error && <p className='text-red-500 mt-5 text-center'>{error}</p>} 
    </div>
  )
}
