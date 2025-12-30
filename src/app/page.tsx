import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect root to admin by default
  // Change this to your preferred default page
  redirect('/admin')
}
