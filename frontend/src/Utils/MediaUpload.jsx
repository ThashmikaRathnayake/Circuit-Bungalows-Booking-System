import React from 'react'
import { createClient } from '@supabase/supabase-js'

const projectURL="https://fjbhhrqudbhkaglghbuq.supabase.co"

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqYmhocnF1ZGJoa2FnbGdoYnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTIwNzIsImV4cCI6MjA3MzQyODA3Mn0.NjRWfnTt84_feTnivKy-M2Ht4qTUTBG7d2-FCQkB-yM"

const supabase = createClient(projectURL, anonKey)

export default function MediaUpload(file) {
  const promise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("Please select a file to upload");
      return;
    }
    const timeStamp = new Date().getTime();
    const fileName = timeStamp + "-" + file.name;

    supabase.storage.from("files").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false
    }).then(() => {
      const publicURL = supabase.storage.from("files").getPublicUrl(fileName).data.publicUrl;
      console.log("Public URL:", publicURL);
      resolve(publicURL);
      
    }).catch((error) => {
      console.error("Error Uploading File" + error)
      reject("Error uploading file: " + error.message);
    });
  });


  return promise;
}
