import Link from "next/link"

import {
  BookOpen,
  Users,
  HelpCircle,
  ShieldCheck,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
   InstagramIcon,
} from "lucide-react"

export default function Footer() {
  return (
    <footer    className="
    mt-5 
    bg-[#fcf2ff] 
    text-[#1C1D1F]
    border-t-2 border-transparent
    [border-image:linear-gradient(to_right,rgba(86,36,208,0.4),rgba(176,14,165,0.4))_1]
  "

>
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent">
  MentorHub
</span>
            <p className="mt-3 text-sm text-[#6A6F73]">
              Learn, grow, and connect with expert mentors worldwide.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BookOpen size={18} /> Learn
            </h3>
            <ul className="space-y-2 text-sm text-[#6A6F73]">
              <li><Link href="/courses" className="hover:text-[#5624D0]">Courses</Link></li>
              <li><Link href="/categories" className="hover:text-[#5624D0]">Categories</Link></li>
              <li><Link href="/blogs" className="hover:text-[#5624D0]">Blogs</Link></li>
            </ul>
          </div>

          {/* Mentors */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users size={18} /> Mentors
            </h3>
            <ul className="space-y-2 text-sm text-[#6A6F73]">
              <li><Link href="/mentors" className="hover:text-[#5624D0]">Find Mentors</Link></li>
              <li><Link href="/become-mentor" className="hover:text-[#5624D0]">Become a Mentor</Link></li>
              <li><Link href="/pricing" className="hover:text-[#5624D0]">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <HelpCircle size={18} /> Support
            </h3>
            <ul className="space-y-2 text-sm text-[#6A6F73]">
              <li><Link href="/faq" className="hover:text-[#5624D0]">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[#5624D0]">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#5624D0]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#5624D0]">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>

        {/* Social + Bottom */}
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <Link href="#" className="text-[#6A6F73] hover:text-[#5624D0]">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-[#6A6F73] hover:text-[#5624D0]">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-[#6A6F73] hover:text-[#5624D0]">
            <InstagramIcon size={20} />


            </Link>
            <Link href="#" className="text-[#6A6F73] hover:text-[#5624D0]">
              <Linkedin size={20} />
            </Link>
          </div>

          <p className="text-sm text-[#6A6F73]">
            © {new Date().getFullYear()} MentorHub. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}