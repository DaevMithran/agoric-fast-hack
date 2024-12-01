"use client"

import { useState } from "react"
interface Course {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  content: string
}

const courses: Course[] = [
  {
    id: "basics",
    title: "Basics of Agoric",
    description: "Learn the fundamentals of Agoric development",
    level: "Beginner",
    content: "# Basics of Agoric\n\nWelcome to the Agoric basics course...",
  },
  {
    id: "zoe",
    title: "Introduction to Zoe",
    description: "Understanding Zoe contract framework",
    level: "Beginner",
    content: "# Introduction to Zoe\n\nZoe is the smart contract framework...",
  },
  {
    id: "ertp",
    title: "ERTP",
    description: "Electronic Rights Transfer Protocol",
    level: "Intermediate",
    content: "# ERTP\n\nERTP is the token standard for Agoric...",
  },
  {
    id: "deploy",
    title: "Deployment",
    description: "Deploy your first Agoric contract",
    level: "Intermediate",
    content: "# Deploying Agoric Contracts\n\nLearn how to deploy...",
  },
]

export function Learn() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  return (
    <div className="h-full flex">
      <div className="w-80 bg-[#2a2c3b] border-r border-[#3a3c4b] overflow-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Courses</h2>
          <div className="grid gap-4">
            {Object.entries(groupBy(courses, "level")).map(
              ([level, courses]) => (
                <div key={level}>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    {level}:
                  </h3>
                  <div className="grid gap-2">
                    {(courses as Course[]).map((course) => (
                      <button
                        key={course.id}
                        onClick={() => setSelectedCourse(course)}
                        className="text-left p-3 rounded-lg bg-[#1d1e20] hover:bg-[#2d2e30] transition-colors"
                      >
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-gray-400">
                          {course.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {selectedCourse && (
          <div className="p-8 max-w-3xl w-full">
            <h1 className="text-3xl font-bold mb-4">{selectedCourse.title}</h1>
            <div className="prose prose-invert">{selectedCourse.content}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
  return array.reduce((groups, item) => {
    const value = item[key] as string
    return {
      ...groups,
      [value]: [...(groups[value] || []), item],
    }
  }, {} as { [key: string]: T[] })
}
