'use client'

import React, { useState } from 'react'
import { Input } from  '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react'
import { useActionState } from "react";

const StartupForm = () => {
    const [error, setError] = useState<Record<string, string>>({});
    const [pitch, setPitch] = React.useState("");
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link')as string,
                pitch: formData.get('pitch')as string,
            }
            await formschema.parseAsync(formValues)

        }catch (error) {

        } finally {

        }

    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: '', status: "INITIAL"});


  return (
    <form action={() => {}} className='startup-form' >
        <div>
            <label htmlFor="title" className="startup-form_label" >Title</label>
            <Input id="title" name='title' className="startup-form_input" required placeholder='Startup Title'/>
            {error.title && <p className='startup-form_error'>{error.title}</p>}
        </div>
        <div>
            <label htmlFor="description" className="startup-form_label" >Description</label>
            <Textarea id="description" name='description' className="startup-form_textarea" required placeholder='Startup Description'/>
            {error.title && <p className='startup-form_error'>{error.title}</p>}
        </div>
        <div>
            <label htmlFor="category" className="startup-form_label" >Category</label>
            <Input id="category" name='category' className="startup-form_input" required placeholder='Startup Category (Tech, Health, Education, or Etc...)'/>
            {error.category && <p className='startup-form_error'>{error.category}</p>}
        </div>
        <div>
            <label htmlFor="link" className="startup-form_label" >Image URL</label>
            <Input id="link" name='link' className="startup-form_input" required placeholder='Startup Image URL'/>
            {error.link && <p className='startup-form_error'>{error.link}</p>}
        </div>
          <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label" >Pitch</label>
            <MDEditor value={pitch} onChange={(value) => setPitch(value as string)} 
                id='pitch'
                preview='edit'
                height={300}
                style={{borderRadius: 20, overflow: 'hidden'}}
                textareaProps={{
                    placeholder: 'Briefly describe your startup idea and how it works.',
                }}
                previewOptions={{
                    disallowedElements: ["style"],
                }}
                />
            {error.pitch && <p className='startup-form_error'>{error.pitch}</p>}
        </div>
        <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit your Pitch'}
            <Send className='size-6 ml-2' strokeWidth={2.5} />
            </Button>
    </form>
    
  )
}

export default StartupForm