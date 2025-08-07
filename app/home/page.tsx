
'use client';
import { Provider} from 'react-redux';
import postStore from '../../store';
import AnnouncementsList from '../../composents/annnones';




export default function LoginPage() {
  return (
    <Provider store={postStore}>
       <div className="flex justify-center h-screen">
       
          <AnnouncementsList />
        
     
    </div>
    </Provider>
  );
}