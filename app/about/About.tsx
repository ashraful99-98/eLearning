import React from 'react';
import { styles } from '../components/Styles/styles';

type Props = {};

const About = (props: Props) => {
    const eLearningTemplate: any = [
        {
          title: "Introduction",
          subTitle: "Importance of CodeCanvas website",
          description: "Welcome to our CodeCanvas platform, where knowledge meets convenience. In this course, we will explore the various aspects that make eLearning a crucial tool in today's educational landscape.",
        },
        {
          title: "Interactive Learning Resources",
          subTitle: "Engaging and Dynamic Content",
          description: "Our eLearning website offers interactive learning resources, including multimedia content, quizzes, simulations, and real-world projects. This dynamic approach enhances user engagement and facilitates effective learning.",
        },
        {
          title: "Diverse Course Catalog",
          subTitle: "Tailored Learning Paths",
          description: "Explore a diverse catalog of courses catering to various subjects and skill levels. Customize your learning path to align with your interests and career goals, ensuring a personalized and enriching educational experience.",
        },
        {
          title: "Expert Instructors",
          subTitle: "Learn from Industry Leaders",
          description: "Our platform brings together expert instructors, industry professionals, and seasoned educators to provide high-quality and up-to-date content. Benefit from their knowledge and real-world experience in each course.",
        },
        {
          title: "24/7 Accessibility",
          subTitle: "Learn Anytime, Anywhere",
          description: "Enjoy the flexibility of accessing courses at any time and from any location. Whether you're an early riser or a night owl, our platform is available 24/7 to accommodate your schedule.",
        },
        {
          title: "Community and Collaboration",
          subTitle: "Connect with Peers",
          description: "Join a vibrant community of learners. Engage in discussions, collaborate on projects, and share insights with fellow learners from around the world. Learning becomes a collaborative and social experience.",
        },
        {
          title: "Progress Tracking",
          subTitle: "Monitor Your Learning Journey",
          description: "Keep track of your progress with intuitive tools. Set goals, track achievements, and receive personalized feedback to stay motivated and on the path to success.",
        },
        {
          title: "Continuous Updates",
          subTitle: "Stay Ahead of Trends",
          description: "Our courses are regularly updated to reflect the latest trends and advancements in various fields. Stay ahead of the curve and acquire skills that are relevant and in demand in the ever-evolving job market.",
        },
        {
          title: "Responsive Support Team",
          subTitle: "Assistance When You Need It",
          description: "Have questions or need assistance? Our responsive support team is here to help. Reach out via chat, email, or forums to get the support you need throughout your learning journey.",
        },
        // Add more sections as needed
      ];

  return (
    <div className='text-black dark:text-white bg-[#f3f3f3] dark:bg-transparent'>
      <br />
      <div className='mt-20 font-Poppins pb-4'>
        <h1 className={`${styles.title} text-[30px]`}>
          About of{' '}
          <span className='text-blue-500'>CodeCanvas</span>
        </h1>
        <div className='flex items-center flex-col justify-center '>
          {eLearningTemplate.map((section: any, index: number) => (
            <div key={index} className='w-[80%] items-center '>
              <h2 className='text-[24px] font-semibold text-blue-400 mb-1'>{section.title} :</h2>
              <h3 className='text-[20px] font-medium mb-1'>{section.subTitle}.</h3>
              <p className='text-gray-700 dark:text-[#888686] text-[16px] font-[400] mb-2'>{section.description}</p>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
