'use client'; // مهم علشان تقدر تستخدم useRouter في الكومبوننت ده

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import {X} from 'lucide-react'; // لو عايز تستخدم أي أيقونات تانية، ممكن تستخدم مكتبة مثل lucide-react أو react-icons

const SearchFormReset = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleReset = () => {
    formRef.current?.reset();         // يمسح القيم في الفورم
    router.push('/');                 // يشيل ?query= من الـ URL
  };

  return (
    <button
      type='button' // مهم: ما تستخدمش 'reset' عشان إحنا هنديرها يدوي
      onClick={handleReset} // يمسح القيم في الفورم ويشيل ?query= من الـ URL
      className='search-btn text-white'
    >
      <X className='w-6 h-6 stroke-[2.5]' /> {/* استخدم أي أيقونة تحبها هنا */}
    </button>
  );
};

export default SearchFormReset;