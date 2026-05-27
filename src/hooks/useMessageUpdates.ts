import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export function useMessageUpdates(callback: (payload:unknown) => void) {
  useEffect(() => {
    const channel = supabase.channel("schema-db-changes");

    channel
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "contact_messages",
        },
        (payload) => {
          console.log("Received update:", payload);
          callback(payload);
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [callback]);
}
