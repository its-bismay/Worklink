import { getjobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import UseFetch from "@/hooks/UseFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";



const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");


  const {isLoaded} = useUser();
  const { fn: jobFunction, data: Jobs, loading: jobloading, error } = UseFetch(getjobs,{location, company_id, searchQuery});

  if(Jobs){
    console.log(Jobs);
  }

  useEffect(() => {
    if(isLoaded) {
      jobFunction();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded){
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-6xl text-center pb-8">Latest Jobs</h1>
      {jobloading && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7"/>
      )}

      {jobloading === false && (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 items-stretch gap-4">
          {Jobs?.length ? (Jobs.map((Job) => {
            return <JobCard key={Job.id} job={Job} savedIntial={Job?.saved?.length > 0}/>
          })): (<div>Sorry no jobs found 🥲</div>)}
        </div>
      )}
    </div>
  )
}
export default JobListing