import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnboardingPage = () => {

  const { user, isLoaded }=useUser();
  const navigate = useNavigate();

  const handleRole = async (role) => {
    await user.update({
      unsafeMetadata: { role }
    }).then (() => {
      navigate(role === "recruiter" ? "/post/jobs" : "/jobs")
    }).catch((error) => {
      console.error("Error updating role: ", error)
    })
  };

  useEffect(() => {
    if(user?.unsafeMetadata?.role){
      navigate(user?.unsafeMetadata?.role === "recruiter" ? "/post/jobs" : "/jobs")
    }
  },[user]);

  if(!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
  }
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button variant="green" className={"h-32 text-3xl"} 
        onClick={() => handleRole("candidate")}
        > Candidate</Button>
        <Button variant="blue" className={"h-32 text-3xl"}
        onClick={() => handleRole("recruiter")}
        > Recruiter</Button>
      </div>
    </div>
  )
}
export default OnboardingPage