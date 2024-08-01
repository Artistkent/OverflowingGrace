// app/footer.tsx

// Import necessary modules
import Link from 'next/link';
import Image from 'next/image';
import { Bars4Icon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';

// Define the Footer component
export default function Footer() {
  return (
    <footer className='grid bottom-0 w-full'>
  
  <div className=' w-full justify-center h-16 relative'>
  <Image draggable="false"
                    className="aspect-auto object-contain"
                    src={"/house-footer.png"}
                   fill
                    alt={'Footer logo'}
                  />
   </div>

        <a href="https://twitter.com/your-username">
          Connect on Twitter
        </a>
  

    </footer>
  );
}
