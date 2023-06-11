import PostManagement from '../components/PostManagement'
import { useAuthorAtom } from '../store/Authstore'
import {useNavigate} from 'react-router-dom'

export default function CreatePost({user}) {
  const [{username,profilePicture}]=useAuthorAtom()
  const navigate=useNavigate()
  if(user!==username){
    navigate('*')
    return 
  }

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center">
      <PostManagement author={username} profilePicture={profilePicture} Button_text={"Post"} action="create"/>
    </div>
  )
}
