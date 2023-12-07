import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./AuthProvider";

export const RequestContext = createContext();

export function useRequest() {
  return React.useContext(RequestContext);
}

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const { session } = useAuth();

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
  }, []);

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

  // const handleRecordUpdated = (payload) => {
  //   console.log("Record updated!", payload);
  //   setRequests((oldData) =>
  //     oldData.map((post) => {
  //       if (post.id === payload.new.id) {
  //         return payload.new;
  //       } else {
  //         return post;
  //       }
  //     })
  //   );
  // };

  // const handleRecordInserted = (payload) => {
  //   console.log("INSERT", payload);
  //   setRequests((oldData) => [...oldData, payload.new]);
  // };

  // const handleRecordDeleted = (payload) => {
  //   console.log("DELETE", payload);
  //   setRequests((oldData) =>
  //     oldData.filter((post) => post.id !== payload.old.id)
  //   );
  // };

  // useEffect(() => {
  //   if (session) {
  //     const subscription = supabase
  //       .channel("schema-db-changes")
  //       .on(
  //         "postgres_changes",
  //         { event: "UPDATE", schema: "public", table: "requests" },
  //         handleRecordUpdated
  //       )
  //       .on(
  //         "postgres_changes",
  //         { event: "INSERT", schema: "public", table: "requests" },
  //         handleRecordInserted
  //       )
  //       .on(
  //         "postgres_changes",
  //         { event: "DELETE", schema: "public", table: "requests" },
  //         handleRecordDeleted
  //       )
  //       .subscribe();

  //     return () => supabase.removeAllChannels();
  //   }
  // }, [session]);

  return (
    <RequestContext.Provider
      value={{ myRequests, setMyRequests, friendRequests, setFriendRequests }}
    >
      {children}
    </RequestContext.Provider>
  );
};
