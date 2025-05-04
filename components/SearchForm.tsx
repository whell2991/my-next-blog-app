import React from 'react'

import Form from 'next/form'
import { Search } from 'lucide-react'
import SearchFormReset from './SearchFormReset'

const SearchForm = ({ query }: {query?: string}) => {
    
   
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input name='query'
        type="text"
        defaultValue=""
        className='search-input'
        placeholder='Search Startups' 
        />
        <div className='flex gap-2'>
            {query && <SearchFormReset />}
            <button type='submit' className='search-btn text-white pr-0.5 pt-0.5'>
                <Search className='size-6 stroke-[2.5] pb-0.5 pl-0.5'/>
            </button>
        </div>
    </Form>
  )
}

export default SearchForm