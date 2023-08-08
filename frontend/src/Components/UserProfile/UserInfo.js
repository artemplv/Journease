
export default function UserInfo ({currentUser}) {

    return (
        <div className="user-info">
            <img src={currentUser?.profileImageUrl}/>
            <h1>{currentUser?.username}</h1>
        </div>
    )
}