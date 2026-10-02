import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShieldCheck,
  Search,
  MapPin,
  Users,
  ArrowRight,
  Building2,
  KeyRound,
  Handshake,
  Target,
  Eye,
  Heart,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";

export default function About() {
  return (
    <main className="bg-white text-slate-800">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-slate-950">
        {/* Background decoration */}

        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-400 text-sm font-semibold mb-6">
              <Building2 size={16} />
              About PrimePlaceEstate
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              More than property.
              <span className="block text-green-400">
                It's where life happens.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg sm:text-xl text-slate-300 leading-relaxed">
              PrimePlaceEstate is a modern property platform created to
              simplify the way people discover, explore, and connect with
              real estate opportunities. We bring property seekers and
              property owners together through a simple, transparent, and
              convenient digital experience.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to="/search"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
              >
                Explore Properties
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300"
              >
                Join PrimePlaceEstate
              </Link>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          COMPANY INTRODUCTION
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 text-green-600 font-semibold uppercase tracking-wider text-sm">
              <Sparkles size={16} />
              Who We Are
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              A smarter way to navigate real estate.
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              PrimePlaceEstate is a technology-driven real-estate platform
              focused on making property discovery easier for everyone.
              Instead of navigating complicated property searches and
              disconnected information, users can explore listings,
              understand property details, discover locations, and connect
              with opportunities from one convenient platform.
            </p>

            <p className="mt-5 text-slate-600 leading-relaxed">
              Our platform is designed with both property seekers and
              property owners in mind. Whether you're searching for a home,
              looking for an investment opportunity, or looking to showcase
              your property, PrimePlaceEstate provides the digital tools to
              support your journey.
            </p>

            <div className="mt-8 flex items-center gap-3 text-slate-900 font-semibold">
              <CheckCircle2
                size={21}
                className="text-green-500"
              />
              Simple
            </div>

            <div className="mt-3 flex items-center gap-3 text-slate-900 font-semibold">
              <CheckCircle2
                size={21}
                className="text-green-500"
              />
              Transparent
            </div>

            <div className="mt-3 flex items-center gap-3 text-slate-900 font-semibold">
              <CheckCircle2
                size={21}
                className="text-green-500"
              />
              User-focused
            </div>

          </div>


          {/* Right */}

          <div className="grid grid-cols-2 gap-4">

            <div className="group rounded-3xl bg-slate-950 p-7 sm:p-8 text-white shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                <Home
                  size={25}
                  className="text-green-400"
                />
              </div>

              <h3 className="text-xl font-bold">
                Property
              </h3>

              <p className="mt-3 text-slate-400 leading-relaxed text-sm">
                Discover homes, rentals, investments and other property
                opportunities.
              </p>

            </div>


            <div className="group rounded-3xl bg-green-500 p-7 sm:p-8 text-white shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <MapPin
                  size={25}
                  className="text-white"
                />
              </div>

              <h3 className="text-xl font-bold">
                Locations
              </h3>

              <p className="mt-3 text-green-50 leading-relaxed text-sm">
                Explore property locations and understand the areas around
                each listing.
              </p>

            </div>


            <div className="group rounded-3xl bg-slate-100 p-7 sm:p-8 hover:-translate-y-1 transition-all duration-300">

              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                <Search
                  size={25}
                  className="text-green-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Discovery
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                Search and filter properties according to your preferences.
              </p>

            </div>


            <div className="group rounded-3xl bg-slate-100 p-7 sm:p-8 hover:-translate-y-1 transition-all duration-300">

              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck
                  size={25}
                  className="text-green-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Confidence
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                Access detailed listing information to help you evaluate
                opportunities.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMPANY STATS
      ====================================================== */}

      <section className="bg-slate-950">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center lg:text-left">

              <div className="text-4xl sm:text-5xl font-bold text-white">
                24/7
              </div>

              <p className="mt-2 text-slate-400">
                Property discovery
              </p>

            </div>


            <div className="text-center lg:text-left">

              <div className="text-4xl sm:text-5xl font-bold text-green-400">
                100%
              </div>

              <p className="mt-2 text-slate-400">
                Digital experience
              </p>

            </div>


            <div className="text-center lg:text-left">

              <div className="text-4xl sm:text-5xl font-bold text-white">
                One
              </div>

              <p className="mt-2 text-slate-400">
                Connected platform
              </p>

            </div>


            <div className="text-center lg:text-left">

              <div className="text-4xl sm:text-5xl font-bold text-green-400">
                People
              </div>

              <p className="mt-2 text-slate-400">
                At the centre
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMPANY STORY
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 text-green-600 font-semibold uppercase tracking-wider text-sm">
            <Building2 size={16} />
            Our Story
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Built around a simple idea.
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Finding the right property should not feel complicated. The
            property journey can involve searching through countless
            listings, comparing information, understanding locations, and
            communicating with owners.
          </p>

          <p className="mt-5 text-slate-600 leading-relaxed">
            PrimePlaceEstate was created to bring these experiences together
            in one modern platform. Our goal is to use technology to make
            property discovery more convenient while giving property owners
            an effective way to present their listings.
          </p>

          <p className="mt-5 text-slate-600 leading-relaxed">
            As the platform grows, we aim to continue improving the property
            experience through better technology, useful tools, and a
            customer-focused approach.
          </p>

        </div>

      </section>


      {/* =====================================================
          WHAT WE DO
      ====================================================== */}

      <section className="bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 text-green-600 font-semibold uppercase tracking-wider text-sm">
              <Target size={16} />
              What We Do
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Helping people move closer to the right property.
            </h2>

            <p className="mt-5 text-slate-600 text-lg leading-relaxed">
              Our platform connects the key parts of the property discovery
              journey in one place.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            {/* Card 1 */}

            <div className="bg-white rounded-3xl p-7 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                <Search
                  size={26}
                  className="text-green-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Property Discovery
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Search and discover properties based on location, property
                type, price and other relevant preferences.
              </p>

            </div>


            {/* Card 2 */}

            <div className="bg-white rounded-3xl p-7 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                <KeyRound
                  size={26}
                  className="text-green-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Property Listings
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Property owners can showcase their properties with
                descriptions, images, pricing and important details.
              </p>

            </div>


            {/* Card 3 */}

            <div className="bg-white rounded-3xl p-7 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                <MapPin
                  size={26}
                  className="text-green-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Location Discovery
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Understand where properties are located and explore their
                surrounding areas.
              </p>

            </div>


            {/* Card 4 */}

            <div className="bg-white rounded-3xl p-7 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                <Handshake
                  size={26}
                  className="text-green-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Connections
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Create opportunities for property seekers and owners to
                connect through the platform.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION / VISION
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Mission */}

          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 sm:p-12 lg:p-14">

            <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative">

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Target
                  size={28}
                  className="text-green-400"
                />
              </div>

              <p className="mt-8 text-green-400 font-semibold uppercase tracking-wider text-sm">
                Our Mission
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                Simplifying the property journey.
              </h2>

              <p className="mt-5 text-slate-400 leading-relaxed">
                Our mission is to make property discovery more accessible,
                convenient and transparent by bringing useful property
                information and digital tools together in one platform.
              </p>

            </div>

          </div>


          {/* Vision */}

          <div className="rounded-3xl bg-green-500 p-8 sm:p-12 lg:p-14">

            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <Eye
                size={28}
                className="text-white"
              />
            </div>

            <p className="mt-8 text-green-50 font-semibold uppercase tracking-wider text-sm">
              Our Vision
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              A connected future for real estate.
            </h2>

            <p className="mt-5 text-green-50 leading-relaxed">
              We envision a modern property ecosystem where technology helps
              people discover opportunities, make informed decisions, and
              connect with the right people more efficiently.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ====================================================== */}

      <section className="bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

          <div className="text-center max-w-2xl mx-auto">

            <div className="inline-flex items-center gap-2 text-green-600 font-semibold uppercase tracking-wider text-sm">
              <Heart size={16} />
              Our Values
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
              What guides PrimePlaceEstate
            </h2>

            <p className="mt-4 text-slate-600">
              The principles behind how we build our platform and serve our
              users.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            <div className="bg-white p-7 rounded-3xl border border-slate-200">

              <Users
                size={30}
                className="text-green-600"
              />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                People First
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                We design experiences around the needs of the people using
                our platform.
              </p>

            </div>


            <div className="bg-white p-7 rounded-3xl border border-slate-200">

              <ShieldCheck
                size={30}
                className="text-green-600"
              />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Trust
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                We value clear information and experiences that help users
                navigate property decisions with confidence.
              </p>

            </div>


            <div className="bg-white p-7 rounded-3xl border border-slate-200">

              <TrendingUp
                size={30}
                className="text-green-600"
              />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Progress
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                We continuously look for better ways to use technology to
                improve the property experience.
              </p>

            </div>


            <div className="bg-white p-7 rounded-3xl border border-slate-200">

              <Sparkles
                size={30}
                className="text-green-600"
              />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Simplicity
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                We believe powerful technology should still feel simple and
                easy to use.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOR PROPERTY OWNERS
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="rounded-3xl overflow-hidden bg-slate-950">

          <div className="grid lg:grid-cols-2">

            <div className="p-8 sm:p-12 lg:p-16">

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Building2
                  size={28}
                  className="text-green-400"
                />
              </div>

              <p className="mt-8 text-green-400 font-semibold uppercase tracking-wider text-sm">
                For Property Owners
              </p>

              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
                Give your property the visibility it deserves.
              </h2>

              <p className="mt-5 text-slate-400 leading-relaxed">
                PrimePlaceEstate gives property owners a convenient digital
                space to showcase their properties and provide potential
                clients with useful information.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2
                    size={20}
                    className="text-green-400 shrink-0"
                  />
                  Create detailed property listings
                </div>

                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2
                    size={20}
                    className="text-green-400 shrink-0"
                  />
                  Add property images and information
                </div>

                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2
                    size={20}
                    className="text-green-400 shrink-0"
                  />
                  Showcase pricing and property features
                </div>

                <div className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2
                    size={20}
                    className="text-green-400 shrink-0"
                  />
                  Reach people actively exploring property
                </div>

              </div>

              <Link
                to="/create-listing"
                className="inline-flex items-center gap-2 mt-9 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                List Your Property
                <ArrowRight size={18} />
              </Link>

            </div>


            <div className="bg-green-500 p-8 sm:p-12 lg:p-16 flex items-center">

              <div>

                <KeyRound
                  size={44}
                  className="text-white"
                />

                <h3 className="mt-7 text-3xl font-bold text-white">
                  Your property.
                  <span className="block text-green-950">
                    Your opportunity.
                  </span>
                </h3>

                <p className="mt-5 text-green-50 leading-relaxed">
                  Present your property professionally and make it easier
                  for potential buyers, renters and investors to discover
                  what you have to offer.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY PRIMEPLACEESTATE
      ====================================================== */}

      <section className="bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <div className="inline-flex items-center gap-2 text-green-600 font-semibold uppercase tracking-wider text-sm">
                <ShieldCheck size={16} />
                Why PrimePlaceEstate
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                Designed around a better property experience.
              </h2>

              <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                From the first property search to exploring listing details,
                our platform is designed to make every step easier.
              </p>

            </div>


            <div className="space-y-5">

              <div className="flex gap-5 bg-white p-6 rounded-2xl border border-slate-200">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-green-100 flex items-center justify-center">
                  <Search
                    size={23}
                    className="text-green-600"
                  />
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    Easy property discovery
                  </h3>

                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    Powerful search and filtering tools help users narrow
                    down properties according to their needs.
                  </p>

                </div>

              </div>


              <div className="flex gap-5 bg-white p-6 rounded-2xl border border-slate-200">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-green-100 flex items-center justify-center">
                  <MapPin
                    size={23}
                    className="text-green-600"
                  />
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    Location-focused information
                  </h3>

                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    Property locations help users understand where
                    opportunities are situated.
                  </p>

                </div>

              </div>


              <div className="flex gap-5 bg-white p-6 rounded-2xl border border-slate-200">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-green-100 flex items-center justify-center">
                  <Handshake
                    size={23}
                    className="text-green-600"
                  />
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    Built for connection
                  </h3>

                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    We bring property seekers and property owners together
                    through a single platform.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT STRIP
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8 sm:p-10">

          <div className="grid md:grid-cols-3 gap-8 items-center">

            <div className="md:col-span-1">

              <p className="text-green-600 font-semibold uppercase tracking-wider text-sm">
                Let's Connect
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
                Have a property question?
              </h2>

            </div>


            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                <Phone
                  size={20}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Get in touch
                </p>

                <p className="font-semibold text-slate-900">
                  We're here to help
                </p>
              </div>

            </div>


            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                <Mail
                  size={20}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Property enquiries
                </p>

                <p className="font-semibold text-slate-900">
                  Connect through our platform
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="bg-slate-950">

        <div className="max-w-5xl mx-auto px-6 py-20 lg:py-24 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold">
            <Home size={16} />
            Your next property could be here
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to explore PrimePlaceEstate?
          </h2>

          <p className="mt-5 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore available properties, discover new opportunities and
            take the next step toward finding a place that fits your needs.
          </p>

          <div className="mt-9 flex justify-center gap-4 flex-wrap">

            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300"
            >
              Browse Properties
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300"
            >
              Create an Account
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}