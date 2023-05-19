import { useState } from "react"

export default function AddSkill() {

    const [newCategory, setCategory] = useState("Other")
    const [newTitle, setTitle] = useState("")
    const [newDescription, setDescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        
        console.log("New Skill created:", newCategory, newTitle, newDescription)
      }

  return (
    <form onSubmit={handleSubmit}>
       <div>
         <label>Category:</label>
         <select name="category" value={newCategory} onChange={(e) => setCategory(e.target.value)} required>
         <option value="Other">Other</option>
         <option value="Music">Music</option>
         <option value="Photography">Photography</option>
         <option value="Coding">Coding</option>
         <option value="Cooking">Cooking</option>
         <option value="Gardering">Gardering</option>
         <option value="Beauty">Beauty</option>
         <option value="Domestic-Skills">Domestic-Skills</option>
         <option value="Languages">Languages</option>
         </select>      
       </div>

       <div>
        <label>Skill Title:</label>
        <input type="text" name="title" value={newTitle} onChange={(e) => setTitle(e.target.value)} required></input>
       </div>

       <div>
        <label>Description:</label>
        <textarea type="text" name="description" value={newDescription} onChange={(e) => setDescription(e.target.value)} required></textarea>
       </div>

       <div>
        <button type="submit">Submit Skill:</button>
       </div>

    </form>
    
  )
}
