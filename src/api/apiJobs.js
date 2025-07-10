import supabaseClient from "@/utils/supabase";

export async function getjobs(token, {location, company_id, searchQuery}){
const supabase = await supabaseClient(token);

let query = supabase.from('jobs').select("*, company:companies(name,logo_url), saved: savedjobs(id)");

if(location) {
    query = query.eq("location", location)
}

if(company_id) {
    query = query.eq("company_id", company_id)
}

if(searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`)
}

const {data, error} = await query

if(error){
    console.error("Error fetching jobs:", error)
    return null;
}

return data;
}

export async function savejobs(token, {alreadySaved}, saveData){

    const supabase = await supabaseClient(token);

    if(alreadySaved) {
        const {data, deleteError} = await supabase.from('savedjobs')
        .delete()
        .eq("job_id", saveData.job_id);


        if(deleteError){
            console.error("Error deleting saved job:", deleteError)
            return null;
        }

        return data;
    } else{
        const {data, insertError} = await supabase.from('savedjobs')
        .insert([saveData])
        .select();


        if(insertError){
            console.error("Error inserting saved job:", insertError)
            return null;
        }

        return data;
    }


    }