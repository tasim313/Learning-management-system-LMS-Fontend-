import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
   <>
   <div>
    {/* customized this user Button and remove this button . Here we use new component for user Sign In and Sign Out component.  */}
    <UserButton 
    afterSignOutUrl='/'
    />
   </div>
   
   
   </>
  )
}
