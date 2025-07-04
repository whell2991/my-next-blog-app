import { auth } from "@/auth"
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation"

const page = async () => {

  const session = await auth()
  if (!session) {
    redirect("/") }
  return (
    <>
    <section className="pink_container !min-h-[240px]">
      <h1 className="heading">Submit Your Startup Pitch</h1>
    </section>
    <StartupForm />
    </>
  )
}

export default page