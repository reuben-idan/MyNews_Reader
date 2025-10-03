'use client';

import Image from 'next/image';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const TeamSection = () => {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former journalist with 10+ years at major news outlets. Passionate about democratizing quality information.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      social: {
        twitter: '@sarahchen',
        linkedin: 'sarahchen-newsflow',
        github: 'sarahchen',
      },
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Tech entrepreneur and AI specialist. Previously led engineering teams at Fortune 500 companies.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      social: {
        github: 'marcusr',
        linkedin: 'marcus-rodriguez',
      },
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Head of Content',
      bio: 'PhD in Journalism with expertise in media ethics and content curation. Former editor at BBC News.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      social: {
        linkedin: 'priya-patel-phd',
        twitter: '@drpriyapatel',
      },
    },
    {
      name: 'Alex Kim',
      role: 'Lead Designer',
      bio: 'Award-winning UX designer focused on creating intuitive and accessible user experiences.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      social: {
        linkedin: 'alexkim-design',
        twitter: '@alexkimdesign',
      },
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Meet Our Team
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          The passionate individuals behind NewsFlow, working to revolutionize how you consume news
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Member Image */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Member Info */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                {member.role}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {member.social.github && (
                  <a
                    href={`https://github.com/${member.social.github}`}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${member.social.linkedin}`}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={`https://twitter.com/${member.social.twitter}`}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <FiTwitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join Us CTA */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">Join Our Mission</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for quality journalism and innovative technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@newsflow.app"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiMail className="w-4 h-4 mr-2" />
              View Open Positions
            </a>
            <a
              href="mailto:hello@newsflow.app"
              className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              <FiMail className="w-4 h-4 mr-2" />
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
