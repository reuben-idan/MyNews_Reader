'use client';

const AboutContent = () => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Our Story */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              Founded in 2024, NewsFlow emerged from a simple observation: in an age of information overload,
              people need more than just news—they need a curated, intelligent companion that understands
              their interests and delivers content that matters.
            </p>
            <p>
              Our team of journalists, developers, and AI specialists came together with a shared vision:
              to create a news platform that doesn't just aggregate content, but curates experiences.
              We believe that quality journalism deserves a platform that respects both the content and
              the reader.
            </p>
            <p>
              Today, NewsFlow serves thousands of users worldwide, delivering personalized news experiences
              that adapt to individual preferences while maintaining the highest standards of journalistic integrity.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Mission</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              To democratize quality information by making credible, curated news accessible to everyone.
              We strive to cut through the noise of the digital age and deliver content that informs,
              engages, and empowers our readers.
            </p>
            <p>
              We're committed to transparency in our curation process, respect for user privacy, and
              continuous innovation in how we deliver news. Every feature we build, every algorithm we
              refine, serves our core mission: helping you stay informed without feeling overwhelmed.
            </p>
            <p>
              In a world where attention is the scarcest resource, NewsFlow exists to make every moment
              spent reading news truly worthwhile.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Our Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Precision</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Every story curated with accuracy and attention to detail
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Privacy</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your reading habits and personal data always remain private
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Balance</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Diverse perspectives and sources for comprehensive understanding
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Innovation</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Continuously evolving to serve you better
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
