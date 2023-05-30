import Link from "next/link"
import { prisma } from "../db";
import { redirect } from "next/navigation"

//how to connect to the server. Needs a async and data: FormData for the argument
async function createTodo (data: FormData) {
  //server code and it's never on client only server
  "use server"
  const title = data.get("title")?.valueOf();
  //name in the input field will match (title)
  //? so it returned undefined
  //checking to see if it is a string and not empty
  if(typeof title !== "string" || title.length === 0) {
      throw new Error("Invalid Title")
  }

  await prisma.todo.create({ data: {title, complete: false,} })
  redirect("/")
}
export default function Page() {
  return (
    <>
    <header className="flex justify-between items-center mb-4 ">
      <h1 className="text-2xl">New</h1>
    </header>
    <form className="flex gap-2 flex-col" action={createTodo}>
      {/* action goes to the server */}
        <input type="text" 
        name="title"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          {/* Back to homepage with .. */}
         <Link href=".."
         className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
         >Cancel</Link>
          <button type="submit"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >Submit</button>
        </div>
    </form>
    </>
  )
}
