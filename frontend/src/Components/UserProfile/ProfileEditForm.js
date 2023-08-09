import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/users";

export default function ProfileEditForm ({currentUserId, setModalType}) {
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    
    function handleSubmit (e) {
        e.preventDefault();
        dispatch(updateUser(image, currentUserId));
        setModalType("");
    }

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0];
        setImage(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => 
                setImageUrl(fileReader.result);
        } else {
            setImageUrl(null);
        }
    };
    
      let preview = null;
      if (imageUrl) {
          preview = <img src={imageUrl}/>;
      }

    return (
        <form className="session-form" id="signup" onSubmit={handleSubmit}>
            <div className='label'>Change Profile Image</div>
            <div className='photo-container'>
                <div className='photo-preview'>{preview}</div>
                <input type="file" 
                    accept=".jpg, .jpeg, .png" 
                    onChange={handleFile} />
            </div>
            <input type="submit" value="Change Image"/>
        </form>
    )

}