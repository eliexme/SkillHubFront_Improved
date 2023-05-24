import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SessionContext } from "../contexts/SessionContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AddSkill({ isUpdating = false }) {
  const { currentUser , setNeedRefreshUser} = useContext(SessionContext);
  const [newCategory, setCategory] = useState("Other");
  const [newTitle, setTitle] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const navigate = useNavigate();
  const { skillid } = useParams()
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  /* console.log(skillid) */


  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`);
        const data = await response.json();
        setCategory(data.category);
        setTitle(data.title);
        setNewDetails(data.details);
        setPreviewImageUrl(data.imageUrl);
        setOriginalImageUrl(data.imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

    if (isUpdating && skillid) {
      fetchSkill();
    }

  }, [isUpdating, skillid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fData = new FormData() 
        const imageUrl = e.target.imageUrl.files[0]
        fData.append("title", newTitle )
        fData.append("details", newDetails)
        fData.append("category", newCategory) 
        fData.append("createdBy", currentUser._id)
               
        if (imageUrl) {
           fData.append("imageUrl", imageUrl)
          setPreviewImageUrl(URL.createObjectURL(imageUrl));
        } else {
          if (!imageUrl && originalImageUrl) {
            fData.append("originalImageUrl", originalImageUrl);
          }
        }
        console.log(imageUrl)
    
    /* try {
      let response;
      if (isUpdating && skillid) {
        response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fData),
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fData),
        });
      }
      if (response.status === 201 || response.status === 200) {
        const newSkill = await response.json();
        setNeedRefreshUser(true)
        navigate(`/skilldets/${newSkill._id}`);
      }
    } catch (error) {
      console.log(error);
    } */
    try {
      
      let response
      if (isUpdating && skillid) {
        response = await axios.put(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`, fData)
      } else {
        response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/skill/create`, fData)
      }
      if (response.status === 201 || response.status === 200) {
        const newSkill = await response.data;
        console.log(newSkill)
        setNeedRefreshUser(true)
        navigate(`/skilldets/${newSkill._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>{isUpdating ? "Update your Skill" : "Create a new"}</h1>
     <div className="pageForms">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={newCategory}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Other">Other</option>
            <option value="Music">Music</option>
            <option value="Photography">Photography</option>
            <option value="Coding">Coding</option>
            <option value="Cooking">Cooking</option>
            <option value="Gardening">Gardening</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Details:</label>
          <textarea
            name="details"
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>
           <input type="file" accept="image/jpg,image/png" name="imageUrl" />
          </label>
            {previewImageUrl && <img src={previewImageUrl} alt="Preview" />}
        </div>
        <button>{isUpdating ? "Update" : "Create"}</button>
      </form>
      </div>
    </>
  );
}
