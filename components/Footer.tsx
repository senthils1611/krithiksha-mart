import Link from "next/link";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">

            {/* Top */}

            <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                {/* Brand */}

                <div>

                    <h2 className="text-3xl font-bold">
                        KRITHIKSHA
                        <span className="text-orange-500"> Mart</span>
                    </h2>

                    <p className="mt-5 text-gray-300 leading-7">
                        Your trusted online shopping destination for
                        electronics, fashion, home essentials and much more.
                    </p>

                    <div className="flex gap-4 mt-6">

                        <FaFacebook className="cursor-pointer hover:text-blue-400 transition" />
                        <FaInstagram className="cursor-pointer hover:text-pink-400 transition" />
                        <FaTwitter className="cursor-pointer hover:text-sky-400 transition" />
                        <FaYoutube className="cursor-pointer hover:text-red-500 transition" />

                    </div>

                </div>

                {/* Quick Links */}

                {/* Quick Links */}

                <div>

                    <h3 className="text-xl font-semibold mb-5">
                        Quick Links
                    </h3>

                    <div className="space-y-3">

                        <Link href="/" className="block hover:text-orange-400 transition">
                            Home
                        </Link>

                        <Link href="/products" className="block hover:text-orange-400 transition">
                            Products
                        </Link>

                        <Link href="/wishlist" className="block hover:text-orange-400 transition">
                            Wishlist
                        </Link>

                        <Link href="/cart" className="block hover:text-orange-400 transition">
                            Cart
                        </Link>

                        <Link href="/orders" className="block hover:text-orange-400 transition">
                            My Orders
                        </Link>

                        <Link href="/profile" className="block hover:text-orange-400 transition">
                            My Profile
                        </Link>

                    </div>

                </div>

                {/* Customer Service */}

                {/* Customer Service */}

                <div>

                    <h3 className="text-xl font-semibold mb-5">
                        Customer Service
                    </h3>

                    <div className="space-y-3">

                        <Link href="/login" className="block hover:text-orange-400 transition">
                            Login
                        </Link>

                        <Link href="/register" className="block hover:text-orange-400 transition">
                            Register
                        </Link>

                        <Link href="/address" className="block hover:text-orange-400 transition">
                            My Address
                        </Link>

                        <Link href="/search" className="block hover:text-orange-400 transition">
                            Search
                        </Link>

                        <Link href="/contact" className="block hover:text-orange-400 transition">
                            Contact Us
                        </Link>

                        <Link href="/about" className="block hover:text-orange-400 transition">
                            About Us
                        </Link>

                        <Link href="/privacy-policy" className="block hover:text-orange-400 transition">
                            Privacy Policy
                        </Link>

                        <Link href="/terms" className="block hover:text-orange-400 transition">
                            Terms & Conditions
                        </Link>

                    </div>

                </div>

                {/* Contact */}

                <div>

                    <h3 className="text-xl font-semibold mb-5">
                        Contact
                    </h3>

                    <div className="space-y-4 text-gray-300">

                        <div className="flex gap-3">
                            <MdLocationOn size={20} />
                            <span>Pollachi, Tamil Nadu, India</span>
                        </div>

                        <div className="flex gap-3">
                            <MdPhone size={20} />
                            <span>+91 XXXXX XXXXX</span>
                        </div>

                        <div className="flex gap-3">
                            <MdEmail size={20} />
                            <span>support@krithikshamart.com</span>
                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom */}

            <div className="border-t border-gray-700">

                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

                    <p className="text-gray-400">
                        © 2026 Krithiksha Mart. All Rights Reserved.
                    </p>

                    <div className="flex gap-6 text-gray-400 mt-4 md:mt-0">

                        <span>Visa</span>
                        <span>MasterCard</span>
                        <span>UPI</span>
                        <span>Razorpay</span>

                    </div>

                </div>

            </div>

        </footer>
    );
}