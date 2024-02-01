import React from 'react'
import { styles } from '../components/Styles/styles';

type Props = {}

const Policy = (props: Props) => {

    const eLearningPolicy: any = [
  
      
        {
          title: "User Privacy and Data Security",
          subTitle: "Ensuring Confidentiality in eLearning",
          description: "We prioritize the privacy and security of user data on our eLearning platform. This section outlines our commitment to safeguarding user information and ensuring a secure online learning environment.",
          longDescription: `
            User privacy and data security are paramount in our eLearning platform. We employ robust measures to protect user information and adhere to data protection regulations. Our commitment is to provide a safe and confidential space for all learners and instructors.
          `,
        },
        {
          title: "Assessment and Grading Policies",
          subTitle: "Fair and Transparent Evaluation",
          description: "Understanding how assessments and grading are conducted is crucial for learners. This section details our policies on evaluations, grading criteria, and the principles that guide fair assessments.",
          longDescription: `
            Our assessment and grading policies are designed to be fair, transparent, and reflective of each learner's understanding. We provide clear criteria for evaluations, ensuring that learners receive constructive feedback and recognition for their efforts.
          `,
        },
        {
          title: "Code of Conduct",
          subTitle: "Promoting Respectful Online Behavior",
          description: "Maintaining a positive and respectful online environment is vital for effective learning. Our code of conduct establishes guidelines for user behavior, fostering a community of mutual respect and collaboration.",
          longDescription: `
            Our code of conduct sets the standard for respectful and collaborative behavior on our eLearning platform. Users are encouraged to engage in discussions, share ideas, and contribute positively to the learning community while adhering to ethical standards.
          `,
        },
        {
          title: "Technical Requirements",
          subTitle: "Ensuring Seamless Learning Experiences",
          description: "To provide a seamless learning experience, it's important to understand the technical requirements for our platform. This section outlines the recommended devices, browsers, and internet connectivity for optimal performance.",
          longDescription: `
            We want to ensure that every learner has a seamless experience on our platform. This section provides information on the technical requirements for accessing our courses, including supported devices, recommended browsers, and internet connectivity guidelines.
          `,
        },
        {
          title: "Feedback and Improvement",
          subTitle: "Continuous Enhancement of Learning",
          description: "We value user feedback as it helps us enhance our platform continuously. This section encourages users to provide feedback on courses, instructors, and the overall learning experience.",
          longDescription: `
            Feedback from our users is essential for the continuous improvement of our platform. This section encourages learners and instructors to share their insights, suggestions, and experiences to help us enhance the overall learning environment.
          `,
        },
        {
          title: "Accessibility and Inclusivity",
          subTitle: "Creating an Inclusive Learning Environment",
          description: "Our commitment to accessibility ensures that our platform is inclusive for all learners. This section outlines our efforts to provide accessible content and accommodations for diverse learning needs.",
          longDescription: `
            We are dedicated to creating an inclusive learning environment. This section highlights our commitment to accessibility, including the provision of accessible content and accommodations for learners with diverse needs.
          `,
        },
        {
          title: "Intellectual Property Rights",
          subTitle: "Respecting Intellectual Property",
          description: "Respecting intellectual property is fundamental to academic integrity. This section clarifies our policies on intellectual property rights, plagiarism, and the importance of citing sources in academic work.",
          longDescription: `
            Upholding intellectual property rights is crucial in maintaining academic integrity. This section outlines our policies on respecting intellectual property, avoiding plagiarism, and the significance of citing sources in academic work.
          `,
        },
        {
          title: "Learning Resources",
          subTitle: "Access to Additional Learning Materials",
          description: "In addition to course content, we provide access to supplementary learning resources. This section informs users about the availability of extra materials to further enrich their learning experience.",
          longDescription: `
            We go beyond course content by providing additional learning resources. This section informs users about the availability of supplementary materials, allowing them to explore further and deepen their understanding of the subjects.
          `,
        },
        {
          title: "Community Events",
          subTitle: "Engaging in Community Activities",
          description: "Our platform hosts community events to foster interaction and engagement. This section highlights upcoming events, webinars, and opportunities for users to connect with peers and instructors.",
          longDescription: `
            Community events play a crucial role in fostering interaction and engagement. This section provides information about upcoming events, webinars, and opportunities for users to connect with peers, instructors, and industry professionals.
          `,
        },
      ];
      
  return (
    <div className='text-black dark:text-white bg-[#f3f3f3] dark:bg-transparent'>
    <br />
    <div className='mt-20 font-Poppins pb-4'>
      <h1 className={`${styles.title} text-[30px]`}>
        Platfrom Team {' '}
        <span className='text-blue-500'>&</span>{' '} Condition
      </h1>
      <div className='flex items-center flex-col justify-center'>
        {eLearningPolicy.map((section: any, index: number) => (
          <div key={index} className='w-[80%] items-center mb-6'>
            <h2 className='text-[24px] font-semibold text-blue-400 mb-1'>{section.title} :</h2>
            <h3 className='text-[20px] font-medium mb-1'>{section.subTitle}.</h3>
            <p className='text-black dark:text-[#f6f6f6]  text-[18px] font-[400] mb-2'>{section.description}</p>
            <small className='text-gray-700 dark:text-[#888686] text-[14px] font-[400]'>{section.longDescription}</small>
            <br />
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
export default Policy;