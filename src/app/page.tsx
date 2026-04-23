import ImageCompareSlider from "../components/ImageCompareSlider";
import { siteContent } from "../data/content";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-24">
      {/* Main Layout Container: Vertical on Mobile, Horizontal on Desktop/Tablet */}
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Section 1: Value Proposition & Details */}
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            {siteContent.home.hero.title} <br />
            <span className="text-indigo-600">
              {siteContent.home.hero.highlight}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {siteContent.home.hero.descriptionPre}{" "}
            <strong className="text-gray-900 font-semibold">
              {siteContent.home.hero.formats.slice(0, 3).join(", ")},
            </strong>{" "}
            and <strong className="text-gray-900 font-semibold">GIF</strong>.
          </p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">
              {siteContent.home.features.title}
            </h3>
            <ul className="space-y-4 text-indigo-800">
              {siteContent.home.features.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-2xl leading-none">{item.icon}</span>
                  <span>
                    {item.textPre}{" "}
                    {item.highlight && (
                      <strong className="font-bold">{item.highlight}</strong>
                    )}{" "}
                    {item.textPost}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 2: Interactive Before & After Slider */}
        <div className="flex-1 w-full">
          <ImageCompareSlider />
        </div>
      </div>

      {/* How it Works Section */}
      <section className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-16 border border-white/50 shadow-sm">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {siteContent.home.howItWorks.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {siteContent.home.howItWorks.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {siteContent.home.howItWorks.steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                {step.id}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
