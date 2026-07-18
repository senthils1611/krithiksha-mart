"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-[4px] font-semibold">
            KRITHIKSHA MART
          </p>

          <h1 className="text-5xl font-extrabold mt-2">
            Contact Us
          </h1>

          <p className="text-muted-foreground mt-4">
            We'd love to hear from you. Reach us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}

          <div className="bg-surface rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Send a Message
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full h-14 border-2 border-border rounded-xl px-5 focus:border-primary outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-14 border-2 border-border rounded-xl px-5 focus:border-primary outline-none"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full h-14 border-2 border-border rounded-xl px-5 focus:border-primary outline-none"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full border-2 border-border rounded-xl p-5 focus:border-primary outline-none"
              />

              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-highlight text-white font-bold hover:scale-105 transition">
                Send Message
              </button>

            </div>

          </div>

          {/* Contact Info */}

          <div className="space-y-6">

            <div className="bg-surface rounded-3xl shadow-xl p-6 flex items-center gap-4">
              <Mail className="text-primary" size={28} />
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-muted-foreground">
                  support@krithikshamart.com
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl p-6 flex items-center gap-4">
              <Phone className="text-success" size={28} />
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-muted-foreground">
                  +91 9876543210
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl p-6 flex items-center gap-4">
              <MapPin className="text-danger" size={28} />
              <div>
                <h3 className="font-bold text-lg">Address</h3>
                <p className="text-muted-foreground">
                  Pollachi, Tamil Nadu, India
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl p-6 flex items-center gap-4">
              <Clock className="text-secondary" size={28} />
              <div>
                <h3 className="font-bold text-lg">Business Hours</h3>
                <p className="text-muted-foreground">
                  Mon - Sat : 9:00 AM - 8:00 PM
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}