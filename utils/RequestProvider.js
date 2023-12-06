import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./AuthProvider";

export const RequestContext = createContext();

export function useRequest() {
  return React.useContext(RequestContext);
}

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const { session } = useAuth();
  const [myRequests, setMyRequests] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching data:", error);
      }
      setRequests(data);
    };

    fetchRequests();
  }, [session]);

  useEffect(() => {
    if (requests) {
      const myReqs = requests.filter((req) => req.user_id === session.user.id);
      const friendReqs = requests.filter(
        (req) => req.user_id !== session.user.id
      );

      setMyRequests(myReqs);
      setFriendRequests(friendReqs);
    }
  }, [requests]);

  return (
    <RequestContext.Provider
      value={{ myRequests, setMyRequests, friendRequests, setFriendRequests }}
    >
      {children}
    </RequestContext.Provider>
  );
};
