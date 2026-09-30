import { gh, parseRepo } from '../github';

export async function cloneRepository(sourceRepo:string,newRepoName:string){
 const client=gh(); const {owner,name}=parseRepo(sourceRepo);
 const created=await client.repos.createForAuthenticatedUser({name:newRepoName,private:true,description:'Cloned from '+sourceRepo});
 try{await client.repos.createUsingTemplate({template_owner:owner,template_repo:name,owner:created.data.owner!.login,name:newRepoName,include_all_branches:true});}catch{}
 return created.data.full_name;
}
