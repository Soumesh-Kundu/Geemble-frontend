import PostManagement from '../components/PostManagement'
import { useAuthorAtom } from '../store/Authstore'
import {useOutletContext,Navigate} from 'react-router-dom'
import { usePostAtom } from '../store/CurrentPost';


export default function EditPost() {
  const [{ username }] = useAuthorAtom();
  const [{caption,postedImage,profilePicture,username:user}]=usePostAtom()
  if (user !== username) {
    return <Navigate to="*" replace={true} />;
  }

  return (
    <div className="min-h-screen w-screen fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <PostManagement author={username} caption={caption} profilePicture={profilePicture}  postedImage={postedImage} Button_text={"Save"} action="update"/>
    </div>
  );
}
