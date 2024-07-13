"use client";

import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import { useRouter ,useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const router= useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submit,setsubmit]=useState(false) ;
    const[post,setpost]=useState({
        prompt:'',
        tag:'', 
    });
    useEffect(()=>{
        const getPromptDetails = async ()=>{
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setpost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
        if(promptId) getPromptDetails();
 },[promptId])
     const UpdatePrompt = async (e)=>{
         e.preventDefault();
        setsubmit(true);

        if(!promptId) return alert('Prompt ID not found');

       

        try{
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            })
            if(response.ok){
                router.push('/');
            }
        }catch(error){
            console.log(error);
        }finally{
            setsubmit(false);
        }
    }
  return (
   <Form
   type='Edit'
   post={post}
   setpost={setpost}
   
   submit={submit}
   handleSubmit={UpdatePrompt}
    />
  )
}

export default EditPrompt;