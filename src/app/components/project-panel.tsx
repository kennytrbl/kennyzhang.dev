"use client";

import { useState, useEffect } from "react";
import Projects from "./projects";
import { supabase } from "../utils/supabase";

function ProjectList() {
  interface ProjectType {
    id: number;
    project: string;
    link: string;
    description: string;
    image: string;
  }

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    if (mounted) {
      getProjects();
    }
  }, [mounted]);

  if (error) {
    return <div className="text-red-500 mt-4">Projects unavailable. Try again later.</div>;
  }

  if (!mounted) {
    return (
      <div className="mt-4 animate-pulse">
        <div className="h-48 bg-gray-700 rounded mb-4"></div>
        <div className="h-48 bg-gray-700 rounded mb-4"></div>
        <div className="h-48 bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <p className="font-bold mb-2 text-4xl">Projects</p>
      <p className="mb-4">
        More projects on{" "}
        <a
          href="https://github.com/kennytrbl"
          target="__blank"
          className="text-[#1ce0e0] text-decoration-none hover:underline"
        >
          Github
        </a>
        .
      </p>
      {loading ? (
        <div className="mt-4 animate-pulse">
          <div className="h-48 bg-gray-700 rounded mb-4"></div>
          <div className="h-48 bg-gray-700 rounded mb-4"></div>
          <div className="h-48 bg-gray-700 rounded"></div>
        </div>
      ) : projects.length > 0 ? (
        projects.map((projects) => (
          <Projects
            key={projects.id}
            project={projects.project}
            image={projects.image}
            description={projects.description}
            link={projects.link}
          />
        ))
      ) : (
        <p className="mt-2">No projects found.</p>
      )}
    </div>
  );
}

export default ProjectList;
