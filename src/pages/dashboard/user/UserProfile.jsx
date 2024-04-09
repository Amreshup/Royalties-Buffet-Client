import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthProvider'
import { useForm } from 'react-hook-form';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserProfile = () => {
    const {updateUserProfile} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit =async (data) => {
    
      const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=ce8937148b19db34fadde8bb70b4194d`;
        const imageFile = { image: data.photoURL[0] };
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        const photoURL = hostingImg.data.data.display_url;
        const name = data.name;

        updateUserProfile(name, photoURL).then(() => {
            // Profile updated! // update name also in node database
            alert("Profile updated successfully")
          }).catch((error) => {
            console.log("API Error")
          });
      }
  return (
    <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="file" {...register("photoURL")}  className="file-input w-full mt-1" />
          {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
        </div>
        <div className="form-control mt-6">
          <input type='submit' value={"Update"} className="btn bg-green text-white"/>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UserProfile