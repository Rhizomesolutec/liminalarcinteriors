"use client";
import ProjectConfiguration from "@/components/admin/newProject";
import ProjectManagementPanel from "@/components/admin/projectManagementPanel";
import React, { useState } from "react";

import UpdateProjectProjectConfiguration from "../updateProject";
import { Project } from "@/types/type";

export default function ProjectServalComponent({
  inistalData,
}: {
  inistalData: Project[];
}) {
  const [currentModal, setCurrentModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>(inistalData);
  const [selectProjects, setSelectProjects] = useState<Project  | null>(null);

  const fetchData = async () => {
    const res = await fetch("/api/projects/getProjects");
    const data = await res.json();
    setProjects(data);
  };
  const handelsuccess = () => {
    setSelectProjects(null);
    setCurrentModal(false);
    fetchData();
  };


  return (
    <>
      {!selectProjects && !currentModal && (
        <ProjectManagementPanel
          setProjects={setProjects}
          projects={projects}
          open={setCurrentModal}
          setSelectProjects={setSelectProjects}
        />
      )}
      {!selectProjects && currentModal && (
        <ProjectConfiguration
          open={setCurrentModal}
          
          fetchData={fetchData}
        />
      )}
      {selectProjects && (
        <UpdateProjectProjectConfiguration
          open={handelsuccess}
          data={selectProjects}
        />
      )}
    </>
  );
}
