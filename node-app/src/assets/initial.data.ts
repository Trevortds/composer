import {ComposerDocument, DocumentType} from 'common';
// import {DocumentType} from 'common/src/types/ComposerDocument';

export const fictionBookTemplate: ComposerDocument = {
    id: 'fiction-book-template',
    metaData: [
        { id: '1', title: 'Plot Summary', label: 'Summary',
            content: '', icon: 'font_download',
            allowsChildren: false,
            instructions: 'Provide a summary of the plot for your story' },
        { id: '2', title: 'Setting and Timeline', label: 'Setting',
            content: '', icon: 'warning',
            allowsChildren: false,
            instructions: 'What is the setting, era, and timeline of your story.  Describe it here.' },
        { id: '3', title: 'Characters', label: 'Characters',
            content: '', icon: 'today',
            allowsChildren: true,
            instructions: 'Add your characters here' },
        { id: '4', title: 'Writing Style', label: 'Style',
            content: '', icon: 'print',
            allowsChildren: false,
            instructions: 'Describe the writing style you would like to use.  Like one of your favor authors or a genre.' },
        { id: '5', title: 'Length of Book', label: 'Length',
            content: '', icon: 'style',
            allowsChildren: false,
            instructions: 'How long do you want this story to be in pages, chapters or sentences.' },
    ],
    docOutline: [
        {
            id: 'chapter1',
            label: 'Chapter 1',
            title: 'Chapter 1',
            content: '',

            type: 'textarea',
            allowsChildren: true,
        },
    ],
    title: '',
    author: '',
    documentType: DocumentType.Fiction
};

export function blankFictionDocument(): ComposerDocument {
    // this is the template, bring in the template from the prompt json
    return {
        id: "blank",
        metaData: [
            {
                "id": "1",
                "title": "Plot Summary",
                "label": "Summary",
                "content": "",
                "icon": "font_download",
                "allowsChildren": false,
                "instructions": "Provide a summary of the plot for your story"
            },
            {
                "id": "2",
                "title": "Setting and Timeline",
                "label": "Setting",
                "content": "",
                "icon": "warning",
                "allowsChildren": false,
                "instructions": "What is the setting, era, and timeline of your story.  Describe it here."
            },
            {
                "id": "3",
                "title": "Characters",
                "label": "Characters",
                "content": "",
                "icon": "today",
                "allowsChildren": true,
                "instructions": "Add your characters here"
            },
            {
                "id": "4",
                "title": "Writing Style",
                "label": "Style",
                "content": "",
                "icon": "print",
                "allowsChildren": false,
                "instructions": "Describe the writing style you would like to use.  Like one of your favor authors or a genre."
            },
            {
                "id": "5",
                "title": "Length of Book",
                "label": "Length",
                "content": "",
                "icon": "style",
                "allowsChildren": false,
                "instructions": "How long do you want this story to be in pages, chapters or sentences."
            }
        ],
        docOutline: [],
        title: '',
        author: '',
        documentType: DocumentType.Fiction,
    }
}

export const fictionExample: ComposerDocument = {
    author: 'Trevor', docOutline: [], id: 'example-fiction-doc', title: 'Example Fiction Doc',
    "documentType": DocumentType.Fiction,
    "metaData": [
    {
        "id": "1",
        "title": "Plot Summary",
        "label": "Summary",
        "content": "A group of adventurers go on a quest for a magical artifact, facing physical challenges and monsters along the way. Late in the story in a twist it becomes clear that the adventurers are actually mice, that they are in a kitchen, and that the monsters are people and cats",
        "icon": "font_download",
        "allowsChildren": false,
        "instructions": "Provide a summary of the plot for your story"
    },
    {
        "id": "2",
        "title": "Setting and Timeline",
        "label": "Setting",
        "content": "(secretly) a home kitchen, but from the perspective of most of the story a fantasy setting.",
        "icon": "warning",
        "allowsChildren": false,
        "instructions": "What is the setting, era, and timeline of your story.  Describe it here."
    },
    {
        "id": "3",
        "title": "Characters",
        "label": "Characters",
        "content": "Arthur: the hero who leads the group, Steven: a ranger and tracker who saves Arthur early on and becomes a companion, Ares: the monster (a cat) who follows them.",
        "icon": "today",
        "allowsChildren": true,
        "instructions": "Add your characters here"
    },
    {
        "id": "4",
        "title": "Writing Style",
        "label": "Style",
        "content": "Epic fantasy",
        "icon": "print",
        "allowsChildren": false,
        "instructions": "Describe the writing style you would like to use.  Like one of your favor authors or a genre."
    },
    {
        "id": "5",
        "title": "Length of Book",
        "label": "Length",
        "content": "Full length novel, 300 pages, with some occasional illustrations and interludes, 25 total chapters",
        "icon": "style",
        "allowsChildren": false,
        "instructions": "How long do you want this story to be in pages, chapters or sentences."
    }
]
}



export const resumeCoverLetterBookTemplate: ComposerDocument = {
    id: 'resume-cover-letter-book-template',
    metaData: [
            {
                "id": "1",
                "title": "Personal Description",
                "label": "Personal",
                "content": "",
                "icon": "font_download",
                "allowsChildren": false,
                "instructions": "Provide a description of yourself, your experience, and your goals"
            },
            {
                "id": "2",
                "title": "Previous Resume",
                "label": "Resume",
                "content": "",
                "icon": "warning",
                "allowsChildren": false,
                "instructions": "Please include your previous general purpose resume here."
            },
            {
                "id": "3",
                "title": "Reason for Writing",
                "label": "Reason",
                "content": "",
                "icon": "today",
                "allowsChildren": true,
                "instructions": "What is the reason you are applying to this job? What appeals to you about it?"
            },
            {
                "id": "4",
                "title": "Writing Style",
                "label": "Style",
                "content": "",
                "icon": "print",
                "allowsChildren": false,
                "instructions": "Provide an example of your writing style. This can be a blog post, a short story, or a chapter from a book you've written"
            },
            {
                "id": "5",
                "title": "Job Description",
                "label": "Description",
                "content": "",
                "icon": "style",
                "allowsChildren": false,
                "instructions": "The content of the job posting you intend to apply for."
            }
        ],
    docOutline: [
        {
            id: 'resume',
            label: 'resume',
            title: 'Resume',
            content: '',

            type: 'textarea',
            allowsChildren: true,
        },
        {
            id: 'cover-letter',
            label: 'Cover Letter',
            title: 'Cover Letter',
            content: '',
            type: 'textarea',
            allowsChildren: false,
        }
    ],
    title: '',
    author: '',
    documentType: DocumentType.ResumeCoverLetter
};

export function blankResumeCoverLetterDocument(): ComposerDocument {
    // this is the template, bring in the template from the prompt json
    return {
        id: 'blank-resume-cover-letter',
        "metaData": [
            {
                "id": "1",
                "title": "Personal Description",
                "label": "Personal",
                "content": "",
                "icon": "font_download",
                "allowsChildren": false,
                "instructions": "Provide a description of yourself, your experience, and your goals"
            },
            {
                "id": "2",
                "title": "Previous Resume",
                "label": "Resume",
                "content": "",
                "icon": "warning",
                "allowsChildren": false,
                "instructions": "Please include your previous general purpose resume here."
            },
            {
                "id": "3",
                "title": "Reason for Writing",
                "label": "Reason",
                "content": "",
                "icon": "today",
                "allowsChildren": true,
                "instructions": "What is the reason you are applying to this job? What appeals to you about it?"
            },
            {
                "id": "4",
                "title": "Writing Style",
                "label": "Style",
                "content": "",
                "icon": "print",
                "allowsChildren": false,
                "instructions": "Provide an example of your writing style. This can be a blog post, a short story, or a chapter from a book you've written"
            },
            {
                "id": "5",
                "title": "Job Description",
                "label": "Description",
                "content": "",
                "icon": "style",
                "allowsChildren": false,
                "instructions": "The content of the job posting you intend to apply for."
            }
        ],
        docOutline: [],
        title: '',
        author: '',
        documentType: DocumentType.ResumeCoverLetter,
    }
}


export const ResumeCoverLetterExample: ComposerDocument = {
    author: 'Trevor', docOutline: [], id: 'example-coverletter', title: 'Example Resume Cover Letter',
    "documentType": DocumentType.ResumeCoverLetter,

    // const personal = document.metaData.find(item => item.label === "Personal")?.content || "";
    // const resume = document.metaData.find(item => item.label === "Resume")?.content || "";
    // const reason = document.metaData.find(item => item.label === "Reason")?.content || "";
    // const style = document.metaData.find(item => item.label === "Style")?.content || "";
    // const description = document.metaData.find(item => item.label === "Description")?.content || "";
    // Previous Resume: {resume}
    // Reason for interest in this job: {reason}
    // Writing Style Sample: {style}
    // Description: {description}
    //
    //
    "metaData": [
        {
            "id": "1",
            "title": "Personal Description",
            "label": "Personal",
            "content": "I am a NLP developer with 6 years of experience in the data science and software development.  I have worked on a variety of projects and have a wide range of skills.  I am looking for a new opportunity to grow and learn.",
            "icon": "font_download",
            "allowsChildren": false,
            "instructions": "Provide a description of yourself, your experience, and your goals"
        },
        {
            "id": "2",
            "title": "Previous Resume",
            "label": "Resume",
            "content": " \n" +
                "Trevor Sullivan\n" +
                "Full Stack Development | Natural Language Processing | Artificial Intelligence\n" +
                "Lead Full Stack Developer— Deloitte Consulting LLP\n" +
                "SEPTEMBER 2021 - JUNE 2023\n" +
                "Led Trueserve DNA’s multinational development team, taking it  from a mocked-up prototype to a certified-to-sell product through its first client sale to a major corporation. \n" +
                "Normalized database and refactored API to eliminate concurrency conflicts and reduce typical network request size by 90% \n" +
                "Directed and conducted a major frontend refactor from Vue 2 to Vue 3, Vuex to Pinia, Class to Composition API, Plotly to eCharts, unlocking better performance and faster ongoing development. \n" +
                "Refactored multiple originally-incompatible applications into a monorepo architecture, cutting the CI, QA, and ticket process overhead for large tickets by two thirds.\n" +
                "Created automations and cloud-ops scripts to accelerate development and client deployment. \n" +
                "Served as primary liaison to test users to collect feedback and turn them into actionable bug reports and feature requests.\n" +
                "AI Development Consultant — Deloitte Consulting LLP\n" +
                "OCTOBER 2020 - SEPTEMBER 2021\n" +
                "Developed a reinforcement learning AI for a leading healthcare company, utilizing predictive analytics on years of public access data to optimize consumer outreach strategy.\n" +
                "Designed and implemented a machine learning-based decision engine that improved claims-management processes and supported data-driven decision making for a healthcare provider.\n" +
                "Professional Services Engineer — Ayfie Inc\n" +
                "MAY 2017 - MARCH 2020\n" +
                "Developed clause-aware contract analyzer tool\n" +
                "Built law search system for a Norwegian educational institution \n" +
                "Created many product demos and one-off POCs for sales teams\n" +
                "NLP Research Intern — VirtualWorks Inc.\n" +
                "MAY 2016 - JANUARY 2017\n" +
                "Junior Developer — Arizona Phonological Imaging Lab\n" +
                "OCTOBER 2013 - MAY 2016\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "EDUCATION\n" +
                "M.S. Human Language Technology\n" +
                "University of Arizona, 2017\n" +
                "Thesis: Approximate Prefix Search Query Prediction\n" +
                "B.A. Linguistics, \n" +
                "B.A. Computer Science\n" +
                "University of Arizona, 2016\n" +
                "SKILLS\n" +
                "Professional Skills\n" +
                "Agile Development\n" +
                "Functional Programming\n" +
                "Object-Oriented Programming\n" +
                "Machine Learning\n" +
                "Cloud Operations\n" +
                "Programming Languages\n" +
                "Typescript\n" +
                "Python\n" +
                "Java\n" +
                "Scala\n" +
                "Technologies\n" +
                "Vue.js\n" +
                "Express.js\n" +
                "Flask\n" +
                "Django\n" +
                "Elasticsearch\n" +
                "Postgres\n" +
                "Kubernetes\n" +
                "Terraform\n" +
                "Serverless\n" +
                "GIS\n" +
                "HUMAN INTERESTS\n" +
                "Rock Climbing, Cycling, Photography, Music Production, Flight Simulators\n" +
                "\n" +
                "\n" +
                "\n" +
                "SIDE PROJECTS & FREELANCE WORK\n" +
                "LLM-Powered Long Structured Document Composition Tool\n" +
                "MAY  2023 - PRESENT\n" +
                "Prototype project for a desktop, mobile, and web app that leverages several LLM backends to support outline-guided document writing, including classical NLP techniques to reduce hallucination errors.\n" +
                "Tools used:  LangChain, OpenAI (GPT3.5), VueJS, MongoDB, Quasar\n" +
                "Geological Sample Storage And Analysis Webapp\n" +
                "JULY 2020 - SEPTEMBER 2020\n" +
                "Freelance project for a geology firm, developing a mobile-friendly webapp to support tracking the collection and analysis of soil samples, generating accurate stray current maps to enhance geological analysis, and exporting of client-friendly reports.\n" +
                "Tools used:  Python Django, PostgreSQL pyGIS, DigitalOcean\n" +
                "Medical Equipment Rental Prototype\n" +
                "APRIL 2020\n" +
                "Freelance project involving the prototyping and initial development of a medical equipment rental e-commerce service for a high-profile client, laying the foundation for a streamlined rental process and improved customer experience.\n" +
                "Tools used: Python Django, Javascript, SQLITE, Stripe, deployed on DigitalOcean.\n" +
                "Fast Document-Based Fuzzy Prefix Search\n" +
                "JANUARY 2017 - MAY 2017, APRIL 2020\n" +
                "Implemented a pair of novel fuzzy prefix search algorithms that perform well without requiring prior human queries as input in python, deployed as a prototype for Expoune as a very short uncompensated freelance project.\n" +
                "Tools used: Python, Javascript, Vue.js\n" +
                "Heavy Metal Lyric Generator\n" +
                "FEBRUARY 2017 - MAY 2017\n" +
                "Implemented LSTM neural networks in PyTorch to train a text generator that outputs meter- and rhyme-aware heavy metal lyrics. \n" +
                "Tools used: Python, PyTorch, Keras, Web Scraping\n" +
                "Minimalist Machine for Persian\n" +
                "August 2015 - May 2016\n" +
                "Implemented Chomsky’s Minimalist Program for applications to the Persian language, including complex predicates\n" +
                "Tools used: Prolog\n" +
                "\n" +
                "\n",
            "icon": "warning",
            "allowsChildren": false,
            "instructions": "Please include your previous general purpose resume here."
        },
        {
            "id": "3",
            "title": "Reason for Writing",
            "label": "Reason",
            "content": "This isn't exactly the perfect job for me, there doesn't seem to be anything langauge processy in the job description, but it still caters to my data sci and machine learning skills, and there may be opportunities to apply NLP that aren't obvious from the outside. It depends on what they are looking for someone to work on.",
            "icon": "today",
            "allowsChildren": true,
            "instructions": "What is the reason you are applying to this job? What appeals to you about it?"
        },
        {
            "id": "4",
            "title": "Writing Style",
            "label": "Style",
            "content": "It was great talking with you today. Here are some references, as requested:\n" +
                "\n" +
                "Jon. product manager and lead designer, was kind of the visionary for Red Square and also on our side project Fly Swatter which has stalled out a bit in the last month as I've been focused on my job hunt and other personal goings on. He's currently on vacation in Southeast Asia, I think he's back in the states on Friday the 12th\n" +
                "\n" +
                "Cassandra. senior technical manager, she was a tech lead who came onto the Red Square project during year 2 to help guide it out of the prototype phase and take over some of the decision making responsibility from me as a person with more experience. We had a very positive collaborative relationship, she was shocked and furious when my layoff notice came and ran all the way up the chain to attempt to prevent it, and then when that failed my understanding is that she attempted to create a new position to rehire me that was not successful.\n" +
                "\n" +
                "If needed I can also dig up some more references other employers and projects.",
            "icon": "print",
            "allowsChildren": false,
            "instructions": "Provide an example of your writing style. This can be a blog post, a short story, or a chapter from a book you've written"
        },
        {
            "id": "5",
            "title": "Job Description",
            "label": "Description",
            "content": "COMPANY OVERVIEW\n" +
                "\n" +
                "Founded in 2010, Lynx Analytics is a predictive analytics company run by world-class quantitative marketing scientists and industry-experienced data scientists. Our focus is to become a leading analytics solution provider in our chosen fields of expertise (telecom, retail, life sciences, and financial services) while advancing graph analytics technology.\n" +
                "\n" +
                "Lynx is headquartered in Singapore with operations in Hong Kong, Germany, USA, Hungary, South Africa, Indonesia, and several other Southeast Asian countries. We work with some of the world's largest companies and are constantly looking to expand our knowledge base and geographical footprint. Lynx Analytics' technology is deployed with various Clients across Asia and has significant growth potential.\n" +
                "\n" +
                "We have a diverse and inclusive global team comprising Professors, PhDs, MSc's, and MBAs from Ivy Leagues, INSEAD and NUS with a broad spectrum of experience in start-ups and blue-chip companies (Google, SAP, Vodafone, GE, Morgan Stanley, Barclays, HSBC to name but a few). It is the combination of our industry insight and experience, scalable proprietary technology, and highly qualified people that drives our compelling value proposition.\n" +
                "\n" +
                "KEY RESPONSIBILITIES\n" +
                "\n" +
                "Establish scalable, efficient, automated processes for data analyses, model development, validation and implementation\n" +
                "Work closely with data scientists and analysts to create and deploy new features\n" +
                "Write efficient and well-organized software to ship products in an iterative, continual-release environment\n" +
                "Monitor and plan out core infrastructure enhancements\n" +
                "Ability to optimize model performance, push model into performance, track and test, refactor code\n" +
                "Contribute to and promote good software engineering practices across the team\n" +
                "Communicate clearly and effectively to technical and non-technical audiences\n" +
                "Actively contribute to and re-use community best practices\n" +
                "\n" +
                "REQUIREMENTS\n" +
                "\n" +
                "Relevant tertiary qualification\n" +
                "2 to 4+ years of experience with at least 1 year of experience in Machine Learning Engineering\n" +
                "Strong knowledge of Python and SQL\n" +
                "Good problem-solving skills\n" +
                "Familiarity with cloud provider solutions such as AWS / GCP / Azure and severless code development\n" +
                "Experience with data pipeline and workflow management\n" +
                "Experience in software engineering methodology (i.e. code reviews, unit testing etc.)\n" +
                "Experience developing predictive models in a production environment, MLOps and model integration into larger scale applications",
            "icon": "style",
            "allowsChildren": false,
            "instructions": "The content of the job posting you intend to apply for."
        }
    ]
}
