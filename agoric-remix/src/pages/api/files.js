import fs from "fs"
import path from "path"

const getFiles = (dir) => {
  const result = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const isDirectory = fs.lstatSync(fullPath).isDirectory()

    if (isDirectory) {
      result.push({
        name: item,
        type: "folder",
        children: getFiles(fullPath), // Recursively get folder contents
      })
    } else {
      result.push({
        name: item,
        type: "file",
        content: fs.readFileSync(fullPath, "utf-8"), // Read file content
      })
    }
  }

  return result
}

export default function handler(req, res) {
  const staticPath = path.join(process.cwd(), "static/pages")
  const fileTree = getFiles(staticPath)
  res.status(200).json(fileTree)
}
