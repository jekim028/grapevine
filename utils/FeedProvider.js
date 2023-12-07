import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./AuthProvider";

export const FeedContext = createContext();

export function useFeed() {
  return React.useContext(FeedContext);
}

export const FeedProvider = ({ children }) => {
  const [recs, setRecs] = useState([]);
  const { session } = useAuth();

  // Function to fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await supabase
        .from("recs")
        .select("*")
        .order("created_at", { ascending: false });

      setRecs(response.data);
    };
    fetchInitialData();
  }, []);

  const handleRecordUpdated = (payload) => {
    console.log("Record updated!", payload);
    setRecs((oldData) =>
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
    setRecs((oldData) => [...oldData, payload.new]);
  };

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setRecs((oldData) => oldData.filter((post) => post.id !== payload.old.id));
  };

  useEffect(() => {
    if (session) {
      const subscription = supabase
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "recs" },
          handleRecordUpdated
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "recs" },
          handleRecordInserted
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "recs" },
          handleRecordDeleted
        )
        .subscribe();

      return () => supabase.removeAllChannels();
    }
  }, [session]);

  return (
    <FeedContext.Provider value={{ recs, setRecs }}>
      {children}
    </FeedContext.Provider>
  );
};
