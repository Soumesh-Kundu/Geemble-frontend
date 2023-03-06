import PostManagement from '../components/PostManagement'
import { useAuthorAtom } from '../store/Authstore'
import {useNavigate} from 'react-router-dom'

export default function CreatePost({user}) {
  const [{username}]=useAuthorAtom()
  const navigate=useNavigate()
  console.log(user)
  if(user!==username){
    console.log(user)
    navigate('*')
    return 
  }
  function handleSubmit(data){
    console.log("posted")
  }
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50 flex items-center justify-center">
      <PostManagement author={username} Button_text={"Post"} onSubmit={handleSubmit}/>
    </div>
  )
}
