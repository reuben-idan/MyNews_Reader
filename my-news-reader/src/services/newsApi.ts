import type { NewsApiResponse, Article } from '../types';

// Mock data for development
const mockNewsResponse: NewsApiResponse = {
  status: 'ok',
  totalResults: 8,
  articles: [
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Dr. Sarah Chen',
      title: 'The Future of AI in Modern Applications: Revolutionizing Industries',
      description: 'Exploring how artificial intelligence is transforming modern applications and what the future holds for technology integration across industries.',
      url: 'https://example.com/ai-future',
      urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2025-10-02T12:00:00Z',
      content: `Artificial Intelligence is rapidly changing the way we interact with technology, work, and live our daily lives. From healthcare to finance, AI is revolutionizing industries at an unprecedented pace.

Recent breakthroughs in machine learning algorithms have enabled AI systems to perform tasks that were once thought to be exclusively human. Computer vision, natural language processing, and predictive analytics are just a few areas where AI is making significant strides.

The integration of AI into modern applications is not just about automation—it's about augmentation. AI systems are now capable of enhancing human decision-making, providing insights that would be impossible to obtain through traditional methods alone.

Looking ahead, the future of AI in applications seems limitless. We're seeing the emergence of AI-powered tools that can write code, create art, and even engage in sophisticated conversations. This raises important questions about the role of humans in an AI-augmented world.

However, with great power comes great responsibility. As AI becomes more integrated into our daily lives, we must address ethical considerations, data privacy concerns, and the potential for job displacement in certain sectors.

The key to successful AI integration lies in responsible development and deployment. Companies and developers must prioritize transparency, fairness, and accountability in their AI systems.

As we move forward, the focus should be on human-AI collaboration rather than replacement. The most successful applications will be those that leverage the unique strengths of both humans and machines.`
    },
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: 'Dr. Michael Thompson',
      title: 'Climate Change: New Study Shows Alarming Acceleration Trends',
      description: 'Recent comprehensive research highlights the accelerating impacts of climate change across the globe, with unprecedented data revealing faster-than-expected changes.',
      url: 'https://example.com/climate-change-study',
      urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2025-10-01T15:30:00Z',
      content: `A comprehensive new study published in Nature Climate Change has revealed alarming acceleration in climate change trends, showing that global temperatures are rising at rates faster than previously predicted by climate models.

The research, conducted by an international team of scientists from 15 countries, analyzed data from over 1,000 monitoring stations worldwide. The findings indicate that the rate of Arctic sea ice melt has increased by 40% compared to the previous decade, while extreme weather events have become 60% more frequent.

"These findings are deeply concerning," said lead researcher Dr. Elena Rodriguez. "The acceleration we're seeing suggests that climate change is not just a future threat—it's a current crisis that requires immediate and decisive action."

The study highlights several key areas of concern:

1. **Rapid Arctic Changes**: Arctic temperatures are rising at twice the global average rate, leading to unprecedented ice melt and permafrost thaw.

2. **Ocean Acidification**: The world's oceans are absorbing carbon dioxide at an alarming rate, with pH levels dropping faster than scientific predictions.

3. **Extreme Weather Events**: Heatwaves, droughts, floods, and storms are becoming more intense and frequent worldwide.

4. **Biodiversity Loss**: Species extinction rates have accelerated, with ecosystems struggling to adapt to rapid environmental changes.

The implications of these findings extend far beyond environmental concerns. Economic impacts are already being felt, with agricultural disruption, infrastructure damage, and increased healthcare costs associated with climate-related illnesses.

Governments and international organizations are being urged to accelerate their climate action plans. The study suggests that current commitments under the Paris Agreement may not be sufficient to prevent catastrophic climate change.

"Time is running out," warns Dr. Rodriguez. "We need immediate, coordinated global action to reduce greenhouse gas emissions and transition to sustainable energy sources. Every fraction of a degree matters."

The research team emphasizes that while the situation is dire, there are still pathways to mitigate the worst effects of climate change through rapid decarbonization and ecosystem restoration efforts.`
    },
    {
      source: { id: 'cnn', name: 'CNN' },
      author: 'Dr. Robert Kim',
      title: 'Tech Giants Announce Major Breakthrough in Quantum Computing Capabilities',
      description: 'Leading technology companies achieve significant milestone in quantum computing, opening new possibilities for computational power and scientific research.',
      url: 'https://example.com/quantum-computing-breakthrough',
      urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2025-09-30T09:15:00Z',
      content: `In a groundbreaking announcement that has sent shockwaves through the technology and scientific communities, leading tech companies have revealed a major breakthrough in quantum computing capabilities. This achievement represents a significant leap forward in computational power that could revolutionize fields ranging from drug discovery to financial modeling.

The breakthrough, achieved through a collaborative effort between researchers at Google, IBM, and several academic institutions, demonstrates quantum supremacy in solving complex computational problems that were previously thought to be intractable for classical computers.

"This is a watershed moment in computing history," said Dr. Lisa Park, Chief Quantum Scientist at Google Quantum AI. "We've successfully demonstrated quantum advantage in practical applications, not just theoretical benchmarks."

The key breakthrough involves a new quantum error correction technique that dramatically improves the stability and reliability of quantum systems. Previous quantum computers were plagued by high error rates that limited their practical utility.

The new approach uses a novel error correction code that can detect and correct quantum errors in real-time, improving system fidelity by orders of magnitude. This advancement makes quantum computers viable for real-world applications for the first time.

Among the potential applications of this breakthrough:

1. **Drug Discovery**: Quantum computers can simulate molecular interactions with unprecedented accuracy, potentially accelerating drug development by years.

2. **Financial Modeling**: Complex risk analysis and portfolio optimization can be performed in minutes rather than days.

3. **Cryptography**: While quantum computers pose a threat to current encryption methods, they also enable the development of quantum-safe cryptography.

4. **Climate Modeling**: More accurate climate predictions become possible with the ability to model complex atmospheric interactions.

5. **Materials Science**: Discovery of new materials with specific properties can be accelerated through quantum simulation.

The announcement has sparked both excitement and debate within the scientific community. While the breakthrough is undeniably significant, questions remain about scalability, cost-effectiveness, and the timeline for widespread adoption.

Industry analysts predict that quantum computing could become a multi-trillion-dollar industry within the next decade, with applications across virtually every sector of the economy.

However, experts caution that significant technical and engineering challenges remain before quantum computers become as ubiquitous as classical computers. Issues such as cryogenic cooling requirements, system stability, and programming complexity must be addressed.

Despite these challenges, the breakthrough represents a major step toward the era of practical quantum computing. As Dr. Park noted, "We're not just building faster computers—we're unlocking new realms of computational possibility that could fundamentally change how we understand and interact with the world."`
    },
    {
      source: { id: 'reuters', name: 'Reuters' },
      author: 'Maria Santos',
      title: 'Revolutionary Electric Vehicle Technology Promises 1000-Mile Range',
      description: 'New battery breakthrough delivers unprecedented energy density, potentially revolutionizing the electric vehicle industry with dramatically extended range capabilities.',
      url: 'https://example.com/ev-battery-breakthrough',
      urlToImage: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2025-09-29T14:20:00Z',
      content: `A revolutionary breakthrough in battery technology has been announced by researchers at Stanford University, promising to deliver electric vehicles with a 1000-mile range on a single charge. This development could fundamentally transform the electric vehicle industry and accelerate the transition to sustainable transportation.

The new battery technology, based on a solid-state lithium-metal design, achieves an energy density of 500 watt-hours per kilogram—nearly double that of current lithium-ion batteries. This breakthrough addresses one of the major limitations of electric vehicles: range anxiety.

"Range anxiety has been one of the biggest barriers to widespread EV adoption," said Dr. James Wilson, lead researcher on the project. "With this new technology, we're eliminating that concern entirely."

The key innovation lies in the use of a solid electrolyte instead of the liquid electrolytes found in conventional lithium-ion batteries. This change eliminates the risk of thermal runaway and allows for much higher energy density.

Additional advantages of the new technology include:

1. **Faster Charging**: The batteries can be charged to 80% capacity in under 10 minutes using high-power charging stations.

2. **Improved Safety**: Solid-state design eliminates the risk of fires associated with liquid electrolyte batteries.

3. **Longer Lifespan**: The batteries maintain 95% of their capacity after 1,000 charge cycles.

4. **Wider Temperature Range**: The batteries perform consistently across a wide range of temperatures.

The implications for the automotive industry are profound. Major manufacturers including Tesla, Volkswagen, and traditional automakers are already in discussions with the research team about licensing the technology.

Environmental organizations have hailed the breakthrough as a major step toward reducing transportation-related carbon emissions. "This could be the tipping point that makes electric vehicles the default choice for consumers," said Sarah Martinez of the Environmental Defense Fund.

However, challenges remain in scaling up production and reducing costs. Current estimates suggest that vehicles equipped with the new technology would initially cost 20-30% more than conventional electric vehicles.

Industry analysts predict that mass production could bring costs down significantly within 3-5 years, making the technology accessible to mainstream consumers.

The research team is also exploring applications beyond automotive, including grid-scale energy storage and aerospace applications.

"This is just the beginning," Dr. Wilson emphasized. "The fundamental breakthrough in solid-state battery technology opens up possibilities we haven't even imagined yet."`
    },
    {
      source: { id: 'forbes', name: 'Forbes' },
      author: 'Dr. Amanda Foster',
      title: 'Mental Health in the Digital Age: Navigating Technology\'s Impact',
      description: 'Comprehensive analysis of how digital technology affects mental health, offering strategies for maintaining psychological well-being in an increasingly connected world.',
      url: 'https://example.com/mental-health-digital-age',
      urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2025-09-28T11:45:00Z',
      content: `The rapid proliferation of digital technology has fundamentally transformed how we live, work, and interact with one another. While these technological advances have brought numerous benefits, they have also introduced new challenges to mental health and psychological well-being.

A comprehensive study published in the Journal of Digital Psychology reveals that excessive screen time, social media usage, and constant connectivity are contributing to increased rates of anxiety, depression, and sleep disorders among digital natives.

"The always-on nature of modern technology creates a state of constant partial attention," explains Dr. Jennifer Walsh, lead author of the study. "This cognitive fragmentation makes it difficult for people to be fully present and can lead to chronic stress."

The study identifies several key areas of concern:

1. **Social Media and Self-Esteem**: Curated social media feeds create unrealistic comparisons and can negatively impact self-worth.

2. **Sleep Disruption**: Blue light from screens interferes with circadian rhythms, leading to poor sleep quality.

3. **Information Overload**: The constant influx of information can lead to decision fatigue and reduced cognitive capacity.

4. **Fear of Missing Out (FOMO)**: The pressure to stay constantly connected can create anxiety and compulsive checking behaviors.

However, the relationship between technology and mental health is not entirely negative. The study also highlights potential benefits:

1. **Teletherapy Accessibility**: Digital platforms make mental health services more accessible to underserved populations.

2. **Support Communities**: Online communities provide support for individuals dealing with specific mental health challenges.

3. **Mindfulness Apps**: Technology can deliver evidence-based interventions for stress reduction and mental wellness.

4. **Remote Work Flexibility**: The ability to work remotely can reduce commute-related stress and improve work-life balance.

The key to navigating the digital age while maintaining mental health lies in intentional and mindful technology use. Experts recommend several strategies:

**Digital Hygiene Practices:**
- Establish "tech-free zones" in the home
- Use apps that track and limit screen time
- Practice the "20-20-20 rule" (every 20 minutes, look 20 feet away for 20 seconds)
- Disable non-essential notifications

**Mindful Social Media Use:**
- Curate feeds to include positive, uplifting content
- Set time limits for social media browsing
- Remember that social media often presents a highlight reel, not reality

**Sleep Optimization:**
- Use blue light filters on devices
- Avoid screens for at least one hour before bedtime
- Create a consistent sleep schedule

The study emphasizes that technology itself is not the problem—it's how we use it. "Technology is a tool," Dr. Walsh notes. "Like any tool, it can be used constructively or destructively. The key is developing awareness and intentionality in our digital interactions."

As we continue to integrate technology into every aspect of our lives, developing digital literacy and mental health awareness will become increasingly important skills for individuals, families, and society as a whole.`
    },
    {
      source: { id: 'nasa', name: 'NASA News' },
      author: 'Dr. Kevin Zhang',
      title: 'Historic Discovery: Potentially Habitable Exoplanet Found in Nearby Star System',
      description: 'NASA\'s latest telescope observations reveal an Earth-like planet in the habitable zone of a nearby star, opening new possibilities for the search for extraterrestrial life.',
      url: 'https://example.com/exoplanet-discovery',
      urlToImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2025-09-27T08:30:00Z',
      content: `In a discovery that has captivated the scientific community and the public alike, NASA's James Webb Space Telescope has identified a potentially habitable exoplanet in the nearby star system of TRAPPIST-1. The planet, designated TRAPPIST-1g, orbits in the habitable zone where liquid water could exist on its surface.

"This is one of the most significant discoveries in the search for life beyond Earth," announced Dr. Natalie Chen, principal investigator for the TRAPPIST-1 observation program. "The conditions on this planet appear remarkably similar to those on Earth."

TRAPPIST-1g is approximately the same size as Earth and receives about the same amount of stellar radiation as our planet does from the Sun. The star it orbits, TRAPPIST-1, is a cool red dwarf located about 40 light-years from Earth in the constellation Aquarius.

Key characteristics of the discovery:

1. **Earth-Like Size**: The planet has a radius about 1.05 times that of Earth, suggesting a rocky composition similar to our planet.

2. **Habitable Zone**: It orbits at a distance where temperatures could allow for liquid water, assuming an atmosphere similar to Earth's.

3. **Stellar Environment**: The TRAPPIST-1 system consists of seven known planets, three of which are in the habitable zone.

4. **Atmospheric Potential**: Preliminary spectroscopic data suggests the presence of water vapor and other molecules that could indicate a substantial atmosphere.

The James Webb Space Telescope's advanced instruments allowed scientists to analyze the planet's atmosphere in unprecedented detail. "We're seeing chemical signatures that are very promising," Dr. Chen explained. "The presence of water vapor, carbon dioxide, and methane in the atmosphere suggests active geological or biological processes."

While the discovery doesn't confirm the presence of life, it significantly narrows the search parameters. "This planet meets more criteria for habitability than any other exoplanet discovered so far," noted Dr. Chen.

The implications of this discovery extend far beyond astronomy:

**Scientific Impact:**
- Provides a benchmark for understanding planetary habitability
- Offers insights into the diversity of planetary systems
- Advances our understanding of planetary formation and evolution

**Technological Advancement:**
- Demonstrates the capabilities of next-generation telescopes
- Paves the way for more detailed atmospheric characterization
- Informs the design of future space missions

**Philosophical and Cultural Significance:**
- Renews interest in the search for extraterrestrial life
- Raises questions about humanity's place in the universe
- Inspires future generations of scientists and explorers

NASA plans to conduct follow-up observations with both the James Webb Space Telescope and other observatories to gather more detailed information about TRAPPIST-1g's atmosphere and potential habitability.

"This is just the beginning of what promises to be an exciting new chapter in our exploration of the cosmos," Dr. Chen concluded. "Who knows what other worlds we might discover in the coming years?"`
    },
    {
      source: { id: 'hollywood', name: 'Hollywood Reporter' },
      author: 'Jessica Martinez',
      title: 'Streaming Revolution: Interactive Entertainment Transforms Viewer Experience',
      description: 'New interactive streaming technology allows viewers to influence story outcomes in real-time, fundamentally changing how we consume entertainment content.',
      url: 'https://example.com/interactive-streaming',
      urlToImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2025-09-26T16:15:00Z',
      content: `The entertainment industry is undergoing a revolutionary transformation with the introduction of interactive streaming technology that allows viewers to influence story outcomes in real-time. This breakthrough, pioneered by a coalition of major streaming platforms, promises to fundamentally change how audiences engage with content.

"Interactive entertainment isn't just a feature—it's a paradigm shift," explains Sarah Thompson, Chief Innovation Officer at StreamTech, one of the leading companies behind the technology. "We're moving from passive consumption to active participation."

The new platform, called "StoryStream," enables viewers to make decisions that affect plot development, character relationships, and story outcomes. Using a combination of AI algorithms and real-time audience voting, the system adapts content dynamically based on collective viewer choices.

How Interactive Streaming Works:

1. **Real-Time Decision Points**: At key moments in the story, viewers are presented with multiple choice options that affect the narrative direction.

2. **Collective Intelligence**: The system aggregates viewer choices across the entire audience to determine the most popular path forward.

3. **Branching Narratives**: Stories are designed with multiple branching paths, creating virtually infinite story possibilities.

4. **AI Enhancement**: Machine learning algorithms analyze viewer preferences to optimize future content and predict audience desires.

The technology has been tested with several pilot programs, including an interactive mystery series where viewers collectively solve crimes alongside detectives, and a romance story where audience members influence relationship developments.

Early results have been remarkable:

- **Increased Engagement**: Viewers spend 40% more time with interactive content compared to traditional streaming
- **Higher Retention**: Completion rates for interactive episodes are 25% higher than linear content
- **Social Sharing**: Interactive content generates 60% more social media discussion

Industry analysts predict that interactive streaming could become a $50 billion market within the next five years, potentially rivaling traditional film and television production values.

However, the transition isn't without challenges:

**Content Creation Complexity:**
- Writers must create multiple narrative branches
- Production costs increase due to the need for alternative scenes
- Quality control becomes more complex with numerous possible outcomes

**Technical Infrastructure:**
- Requires robust servers to handle real-time audience input
- Bandwidth considerations for simultaneous global streaming
- Algorithm optimization for smooth content delivery

**Creative Considerations:**
- Balancing authorial intent with audience influence
- Maintaining narrative coherence across multiple paths
- Ensuring accessibility for all viewers

Despite these challenges, entertainment executives are optimistic about the future. "Interactive streaming represents the next evolution of storytelling," notes Michael Chen, CEO of a major streaming service. "It's not just about watching—it's about experiencing."

The technology also opens up new possibilities for educational content, training simulations, and therapeutic applications. Interactive documentaries could allow viewers to explore different perspectives on historical events, while educational programs could adapt to individual learning styles.

As the technology matures, experts predict we'll see increasingly sophisticated interactive experiences, potentially incorporating virtual reality, augmented reality, and even haptic feedback systems.

"This is just the beginning," Thompson concludes. "The line between creator and audience is becoming increasingly blurred, and that's an exciting development for the future of entertainment."`
    },
    {
      source: { id: 'espn', name: 'ESPN' },
      author: 'Coach David Miller',
      title: 'Olympic Champion Announces Retirement After Stellar 15-Year Career',
      description: 'Decorated athlete reflects on incredible journey from humble beginnings to global stardom, leaving an indelible mark on the sport and inspiring future generations.',
      url: 'https://example.com/olympic-retirement',
      urlToImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2025-09-25T13:45:00Z',
      content: `In an emotional press conference that brought tears to the eyes of fans and fellow athletes alike, Olympic champion Maria Rodriguez announced her retirement from competitive athletics after a stellar 15-year career that redefined excellence in track and field.

"I've given everything I have to this sport," Rodriguez said, her voice breaking with emotion. "It's time to pass the torch to the next generation while I still have the wisdom to guide them."

Rodriguez's career highlights read like a sports legend's highlight reel:

**Career Achievements:**
- 4 Olympic gold medals (2008, 2012, 2016, 2020)
- 7 World Championship titles
- 15 national records across multiple events
- World record holder in the 400m and 800m events
- Named World Athlete of the Year three times

**Journey from Humble Beginnings:**
Born in a small rural town in Mexico, Rodriguez discovered her talent for running at age 12 when she won a local school competition. "I never dreamed I'd stand on an Olympic podium," she recalled. "Running was my escape from the challenges of daily life."

Her breakthrough came at the 2008 Beijing Olympics, where she shocked the world by winning gold in both the 400m and 800m events as a virtual unknown. "That moment changed everything," Rodriguez reflected. "I went from being a girl with a dream to a symbol of possibility."

Throughout her career, Rodriguez has been as renowned for her sportsmanship and advocacy as for her athletic achievements. She has been a vocal proponent for gender equality in sports, clean competition, and using athletics as a tool for social change.

**Off-Track Impact:**
- Founded the "Run for Change" foundation, which provides athletic opportunities for underprivileged youth worldwide
- Served as a UNICEF Goodwill Ambassador for 10 years
- Advocated for increased funding for women's sports programs
- Mentored over 50 young athletes who have gone on to compete at national and international levels

The announcement has sparked tributes from across the sporting world. "Maria Rodriguez isn't just an athlete—she's an inspiration," said International Olympic Committee President Thomas Bach. "Her impact extends far beyond the track."

Fellow competitors have expressed mixed emotions. "I'm sad to see her go, but I'm grateful for everything she's taught me," said rising star athlete Sofia Johnson. "Maria showed us that with dedication and heart, anything is possible."

As Rodriguez transitions into retirement, she plans to focus on her foundation work and coaching the next generation of athletes. "I want to give back in a different way now," she explained. "The track gave me everything—now it's time for me to give back to the sport that made me who I am."

The athletics community will undoubtedly feel Rodriguez's absence in competition, but her legacy as one of the greatest athletes of all time is secure. "Records are made to be broken," Rodriguez concluded, "but the impact we have on people's lives—that's what truly endures."`
    }
  ]
};

export const fetchTopHeadlines = async (): Promise<NewsApiResponse> => {
  try {
    // In a real app, you would use the actual NewsAPI
    // For now, we'll return mock data
    return mockNewsResponse;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    // In a real app, you would make an API call to get a specific article
    // For now, we'll find the article by ID in our mock data
    const numericId = parseInt(id);
    if (numericId > 0 && numericId <= mockNewsResponse.articles.length) {
      return mockNewsResponse.articles[numericId - 1];
    }
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};
