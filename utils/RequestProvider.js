import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./AuthProvider";

export const RequestContext = createContext();

export function useRequests() {
  return React.useContext(RequestContext);
}

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
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

  const handleRecordUpdated = (payload) => {
    console.log("Record updated!", payload);
    setRequests((oldData) =>
      oldData.map((post) => {
        if (post.id === payload.new.id) {
          return payload.new;
        } else {
          return post;
        }
      })
    );
  };

  const handleRecordInserted = (payload) => {
    console.log("INSERT", payload);
    setRequests((oldData) => [...oldData, payload.new]);
  };

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setRequests((oldData) =>
      oldData.filter((post) => post.id !== payload.old.id)
    );
  };

  useEffect(() => {
    if (session) {
      const subscription = supabase
        .channel("request-changes")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "requests" },
          handleRecordUpdated
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "requests" },
          handleRecordInserted
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "requests" },
          handleRecordDeleted
        )
        .subscribe();

      return () => supabase.removeAllChannels();
    }
  }, [session]);

  return (
    <RequestContext.Provider value={{ requests, setRequests }}>
      {children}
    </RequestContext.Provider>
  );
};
