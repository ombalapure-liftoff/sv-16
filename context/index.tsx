import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import axios from "axios";
import Post from "../models/Post";
import User from "../models/User";

// Context object type
export type AppContextObject = {
  posts: Post[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  user: string;
};

// Create context
const AppContext = createContext<AppContextObject | null>(null);

// Creating the provider
const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    if (window !== null || window !== undefined) {
      // First time using the app, user not signed in
      if (!window.localStorage.getItem("postit_user")) {
        return;
      }

      const tempUser: User = JSON.parse(
        window.localStorage.getItem("postit_user") || ""
      );

      setUser(tempUser?.name);
    }
  }, []);

  /**
   * Get list of posts
   * @params none
   * @return void
   */
  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        { headers: { "Content-Type": "application/json" } }
      );

      setPosts(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <AppContext.Provider value={{ posts, isMenuOpen, setIsMenuOpen, user }}>
      {children}
    </AppContext.Provider>
  );
};

// export const useGlobalContext = () => {
//   return useContext(AppContext);
// };

export { AppProvider, AppContext };
