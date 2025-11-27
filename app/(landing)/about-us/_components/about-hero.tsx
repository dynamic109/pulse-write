import Image from "next/image"

export function AboutHero() {
  return (
    <div className="space-y-16">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="relative w-fit mx-auto">
          <div className="relative inline-block">
            <div className="absolute -top-3 -right-3 w-60 h-3 bg-teal-700"></div>
            <div className="absolute -top-3 -right-3 w-5 h-60 bg-teal-700"></div>

            <div className="absolute -bottom-3 -left-3 w-60 h-3 bg-teal-700"></div>
            <div className="absolute -bottom-3 -left-3 w-5 h-60 bg-teal-700"></div>

            <Image
              src="/Rectangle 88.png"
              alt="Two people collaborating on a laptop"
              width={600}
              height={420}
              className="rounded-lg object-cover w-full h-[420px]"
              priority
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-900 leading-relaxed">
            Pulsewrite is a vibrant platform where individuals can share their stories and engage in meaningful
            discourse. We provide a safe and welcoming space for all perspectives to be heard, allowing for a diverse
            range of voices and experiences to flourish.
          </p>
          <p className="text-gray-900 leading-relaxed">
            Our platform is designed to foster a culture of respect and inclusivity, encouraging users to contribute
            their unique insights and narratives. Whether you're a seasoned writer or a beginner, Pulsewrite welcomes
            you with open arms.
          </p>

          <div className="pt-8 space-y-4">
            <h2 className="text-2xl font-bold text-black">Who's Behind it?</h2>
            <p className="text-gray-900 leading-relaxed">
              Pulse Write was created by a small team of writers, designers, and digital misfits who were tired of
              platforms that felt more like spreadsheets than journals. We wanted something different – and we built it.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md">
        <h3 className="text-xl font-semibold text-teal-700 mb-4">Creative Control</h3>
        <p className="text-gray-900 leading-relaxed">
          Customize your writing space, choose your vibe, and publish however you like – daily drops, spontaneous
          bursts, or quiet reflections.
        </p>
      </div>
    </div>
  )
}
