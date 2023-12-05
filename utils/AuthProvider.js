import React, { useState, useEffect, createContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export const AuthContext = createContext({});

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session?.user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id);
        if (error) {
          console.error("Error fetching profile:", error);
        }
        setProfile(data[0]);
      };
      fetchProfile();
    }
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    initialized,
    profile,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// type AuthProps = {
//   user: User | null
//   session: Session | null
//   profile: Profile | null
//   initialized?: boolean
//   signOut?: () => void
// }

// export const AuthContext = createContext<Partial<AuthProps>>({})

// // Custom hook to read the context values
// export function useAuth() {
//   return React.useContext(AuthContext)
// }

// export const AuthProvider = ({ children }: PropsWithChildren) => {
//   const [user, setUser] = useState<User | null>()
//   const [session, setSession] = useState<Session | null>(null)
//   const [initialized, setInitialized] = useState<boolean>(false)
//   const [profile, setProfile] = useState<Profile | null>()

//   useEffect(() => {
//     // Listen for changes to authentication state
//     const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
//       setSession(session)
//       setUser(session ? session.user : null)
//       setInitialized(true)
//     })

//     return () => {
//       data.subscription.unsubscribe()
//     }
//   }, [])

//   useEffect(() => {
//     if (session?.user) {
//       const fetchProfile = async () => {
//         const { data, error } = await supabase.from("profiles").select().eq("id", user.id)
//         // Handle the response
//         if (error) {
//           console.error("Error fetching profile:", error)
//         } else {
//           console.log("Fetched profile:", data)
//         }
//       }
//       fetchProfile()
//     }
//   }, [session, user])

//   // Log out the user
//   const signOut = async () => {
//     await supabase.auth.signOut()
//   }

//   const value = {
//     user,
//     session,
//     initialized,
//     signOut,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }
