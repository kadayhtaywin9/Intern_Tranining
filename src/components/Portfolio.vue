<template>
  <v-app class="bg-grey-lighten-4">
    <!-- Top Navigation Bar -->
    <v-app-bar flat border-b color="white" height="64" class="px-md-10">
      <div class="d-flex align-center">
        <v-avatar color="primary" size="34" class="mr-2 text-white font-weight-bold text-caption">
          AR
        </v-avatar>
        <span class="font-weight-bold text-subtitle-1 mr-2 text-grey-darken-3">Kaday Htay Win</span>
        <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-medium">
          OPEN TO WORK
        </v-chip>
      </div>

      <v-spacer></v-spacer>

      <div class="d-none d-md-flex align-center ga-1">
        <v-btn variant="text" size="small" prepend-icon="mdi-account-outline" @click="scrollTo('about')">About</v-btn>
        <v-btn variant="text" size="small" prepend-icon="mdi-code-tags" @click="scrollTo('skills')">Skills</v-btn>
        <v-btn variant="text" size="small" prepend-icon="mdi-folder-outline" @click="scrollTo('projects')">Projects</v-btn>
        <v-btn variant="text" size="small" prepend-icon="mdi-briefcase-outline" @click="scrollTo('experience')">Experience</v-btn>
        <v-btn variant="text" size="small" prepend-icon="mdi-email-outline" @click="scrollTo('contact')">Contact</v-btn>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center ga-2">
        <v-btn icon="mdi-weather-night" variant="text" size="small" color="grey-darken-1"></v-btn>
        <v-btn color="primary" rounded="pill" size="small" prepend-icon="mdi-send-outline" class="text-none px-4">
          Hire Me
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container style="max-width: 1040px;" class="py-8">

        <!-- 1. Hero Card -->
        <v-card rounded="xl" elevation="0" class="pa-8 mb-8 border bg-white" id="about">
          <v-row align="center">
            <!-- Left: Avatar & Personal Info -->
            <v-col cols="12" md="4" class="text-center border-md-e pr-md-6">
              <v-avatar size="140" class="mb-4 elevation-1">
                <v-img
                  src="/public/my-photo.jpg"
                  alt="Kaday Htay Win"
                  cover
                ></v-img>
              </v-avatar>
              <h2 class="text-h5 font-weight-bold mb-1">Kaday Htay win</h2>
              <p class="text-caption mb-3 ">
                Computer Engineering B.E. Candidate<br>
                GPA: 3.92 / 4.0 • Expected Grad: May 2026
              </p>
              <div class="d-flex justify-center flex-wrap ga-1">
                <v-chip size="x-small" color="blue-lighten-4" class="text-primary font-weight-medium">
                  • Seeking Internship
                </v-chip>
                <v-chip size="x-small" color="green-lighten-4" class="text-green-darken-2 font-weight-medium">
                  • Open to Relocate
                </v-chip>
              </div>
            </v-col>

            <!-- Right: Bio & Key Numbers -->
            <v-col cols="12" md="8" class="pl-md-8">
              <v-chip color="primary" variant="tonal" size="x-small" class="font-weight-bold mb-3">
                HELLO WORLD • SOFTWARE ENGINEERING INTERN CANDIDATE
              </v-chip>
              <h1 class="text-h5 text-md-h4 font-weight-bold text-grey-darken-4 mb-3" style="line-height: 1.3;">
                Passionate about building scalable web systems & intuitive UI components.
              </h1>
              <p class="text-body-2  mb-6" style="line-height: 1.6;">
                I am a junior CS student dedicated to full-stack web development, software engineering fundamentals,
                and algorithmic optimization. Experienced with modern JavaScript/TypeScript, Python, Vue/Vuetify,
                React, and Cloud Infrastructure. Eager to contribute fresh perspectives, strong problem-solving skills, and
                a relentless work ethic to a dynamic engineering team!
              </p>

              <!-- Quick Metrics Grid -->
              <v-row class="mb-5 text-center text-md-left">
                <v-col cols="4">
                  <div class="text-h5 font-weight-bold text-primary">15+</div>
                  <div class="text-caption">Projects Completed</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-h5 font-weight-bold text-primary">300+</div>
                  <div class="text-caption ">LeetCode Solved</div>
                </v-col>
                <v-col cols="4">
                  <div class="text-h5 font-weight-bold text-primary">3x</div>
                  <div class="text-caption">Dean's List Scholar</div>
                </v-col>
              </v-row>

              <div class="d-flex flex-wrap ga-3">
                <v-btn color="primary" prepend-icon="mdi-email-outline" size="small" class="text-none px-5" @click="scrollTo('contact')">
                  Get In Touch
                </v-btn>
                <v-btn variant="outlined" prepend-icon="mdi-download" size="small" color="grey-darken-2" class="text-none px-5">
                  Download Resume
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <!-- 2. Technical Proficiency Section -->
        <div class="mb-8" id="skills">
          <div class="d-flex align-center mb-1">
            <v-icon icon="mdi-code-tags" color="primary" class="mr-2"></v-icon>
            <h3 class="text-h6 font-weight-bold">Technical Proficiency</h3>
          </div>
          <p class="text-caption mb-4">
            Languages, frameworks, tools & engineering core competencies
          </p>

          <v-card rounded="xl" elevation="0" class="pa-6 border bg-white">
            <!-- Tabs -->
            <v-tabs v-model="skillTab" density="compact" color="primary" class="mb-6">
              <v-tab value="languages" class="text-none text-caption font-weight-bold">
                <v-icon start icon="mdi-code-braces"></v-icon> Languages
              </v-tab>
              <v-tab value="frameworks" class="text-none text-caption font-weight-bold">
                <v-icon start icon="mdi-layers-outline"></v-icon> Frameworks & Web
              </v-tab>
              <v-tab value="tools" class="text-none text-caption font-weight-bold">
                <v-icon start icon="mdi-tools"></v-icon> Tools & Cloud
              </v-tab>
            </v-tabs>

            <!-- Skill Progress Bars -->
            <v-row>
              <v-col cols="12" md="6" v-for="skill in currentSkills" :key="skill.name" class="py-2">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-caption font-weight-medium">{{ skill.name }}</span>
                  <span class="text-caption ">{{ skill.level }}%</span>
                </div>
                <v-progress-linear
                  :model-value="skill.level"
                  color="primary"
                  height="6"
                  rounded
                  bg-color="grey-lighten-3"
                ></v-progress-linear>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <!-- Concepts & Methodologies Badges -->
            <div class="text-caption font-weight-bold text-uppercase mb-3">
              Concepts & Methodologies
            </div>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="concept in concepts"
                :key="concept"
                size="small"
                variant="outlined"
                color="grey-darken-2"
                rounded="lg"
              >
                {{ concept }}
              </v-chip>
            </div>
          </v-card>
        </div>

        <!-- 3. Featured Projects Section -->
        <div class="mb-8" id="projects">
          <div class="d-flex justify-space-between align-center mb-1">
            <div class="d-flex align-center">
              <v-icon icon="mdi-folder-outline" color="primary" class="mr-2"></v-icon>
              <h3 class="text-h6 font-weight-bold">Featured Projects</h3>
            </div>

            <!-- Filter Chips -->
            <v-chip-group v-model="projectFilter" mandatory selected-class="bg-primary text-white">
              <v-chip size="x-small" value="all" filter variant="tonal">All</v-chip>
              <v-chip size="x-small" value="web" filter variant="tonal">Web Apps</v-chip>
              <v-chip size="x-small" value="fullstack" filter variant="tonal">Full-Stack</v-chip>
              <v-chip size="x-small" value="systems" filter variant="tonal">Algorithms</v-chip>
            </v-chip-group>
          </div>
          <p class="text-caption mb-4">
            Showcase work demonstrating software engineering principles
          </p>

          <v-row>
            <v-col cols="12" md="4" v-for="item in filteredProjects" :key="item.title">
              <v-card rounded="xl" elevation="0" class="border bg-white h-100 d-flex flex-column">
                <div class="position-relative">
                  <v-img :src="item.image" height="150" cover class="bg-grey-lighten-2"></v-img>
                  <v-chip
                    size="x-small"
                    :color="item.badgeColor"
                    variant="flat"
                    class="position-absolute font-weight-bold text-white text-uppercase"
                    style="top: 10px; right: 10px;"
                  >
                    {{ item.badge }}
                  </v-chip>
                </div>

                <v-card-item class="pb-1">
                  <v-card-title class="text-subtitle-1 font-weight-bold">{{ item.title }}</v-card-title>
                </v-card-item>

                <v-card-text class="flex-grow-1 pt-0">
                  <p class="text-caption mb-4" style="min-height: 48px;">
                    {{ item.description }}
                  </p>
                  <div class="d-flex flex-wrap ga-1">
                    <v-chip
                      v-for="tech in item.tech"
                      :key="tech"
                      size="x-small"
                      variant="tonal"
                      :color="item.tagColor"
                    >
                      {{ tech }}
                    </v-chip>
                  </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="px-4 py-2">
                  <v-btn variant="text" size="x-small" prepend-icon="mdi-open-in-new" color="primary" class="text-none">
                    Source Code
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon="mdi-github" size="x-small" variant="text" color="grey-darken-1"></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- 4. Education & Experience Timeline -->
        <div class="mb-8" id="experience">
          <div class="d-flex align-center mb-1">
            <v-icon icon="mdi-chart-timeline-variant" color="primary" class="mr-2"></v-icon>
            <h3 class="text-h6 font-weight-bold">Education & Experience</h3>
          </div>
          <p class="text-caption mb-4">
            Academic trajectory and hands-on technical roles
          </p>

          <v-card rounded="xl" elevation="0" class="pa-6 border bg-white">
            <v-timeline density="compact" side="end" line-color="grey-lighten-2">
              <v-timeline-item
                v-for="(history, index) in historyList"
                :key="index"
                :dot-color="history.dotColor"
                size="small"
              >
                <template #icon>
                  <v-icon icon="mdi-circle-small" color="white" size="small"></v-icon>
                </template>
                <div class="d-flex flex-column flex-sm-row justify-space-between mb-1">
                  <div>
                    <span class="text-caption font-weight-medium mr-2">{{ history.period }}</span>
                    <h4 class="text-subtitle-2 font-weight-bold d-inline">{{ history.role }}</h4>
                  </div>
                </div>
                <div class="text-caption text-primary font-weight-medium mb-2">{{ history.institution }}</div>
                <ul class="text-caption pl-4" style="line-height: 1.6;">
                  <li v-for="(bullet, bIndex) in history.bullets" :key="bIndex">
                    {{ bullet }}
                  </li>
                </ul>
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </div>

        <!-- 5. Contact & Internship Inquiries -->
        <div class="mb-8" id="contact">
          <div class="d-flex align-center mb-1">
            <v-icon icon="mdi-email-outline" color="primary" class="mr-2"></v-icon>
            <h3 class="text-h6 font-weight-bold">Contact & Internship Inquiries</h3>
          </div>
          <p class="text-caption mb-4">
            Let's discuss internship opportunities or tech collaborations
          </p>

          <v-card rounded="xl" elevation="0" class="border bg-white overflow-hidden">
            <v-row no-gutters>
              <!-- Left Banner -->
              <v-col cols="12" md="4" class="bg-primary pa-8 d-flex flex-column justify-space-between text-white">
                <div>
                  <h4 class="text-h6 font-weight-bold mb-2">Ready to contribute!</h4>
                  <p class="text-caption mb-6 opacity-80" style="line-height: 1.5;">
                    I am actively seeking a Software Engineering / Full-Stack Developer Internship
                    for Summer 2026. Feel free to reach out directly via email or LinkedIn.
                  </p>

                  <div class="d-flex align-center mb-3 text-caption">
                    <v-icon icon="mdi-email-outline" size="18" class="mr-2"></v-icon>
                    kadayhtaywin9@gmail.com
                  </div>
                  <div class="d-flex align-center mb-3 text-caption">
                    <v-icon icon="mdi-phone-outline" size="18" class="mr-2"></v-icon>
                    09980541231
                  </div>
                  <div class="d-flex align-center text-caption">
                    <v-icon icon="mdi-map-marker-outline" size="18" class="mr-2"></v-icon>
                    Nay Pyi Thaw NaungYoe Area, CA (Open to Remote)
                  </div>
                </div>

                <div class="d-flex ga-2 mt-6">
                  <v-btn icon="mdi-github" size="small" variant="tonal" color="white"></v-btn>
                  <v-btn icon="mdi-linkedin" size="small" variant="tonal" color="white"></v-btn>
                </div>
              </v-col>

              <!-- Right Form -->
              <v-col cols="12" md="8" class="pa-8">
                <v-form @submit.prevent="sendMessage">
                  <v-text-field
                    v-model="contactForm.name"
                    label="Your Full Name *"
                    variant="outlined"
                    density="compact"
                    rounded="lg"
                    class="mb-3"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="contactForm.email"
                    label="Email Address *"
                    type="email"
                    variant="outlined"
                    density="compact"
                    rounded="lg"
                    class="mb-3"
                    required
                  ></v-text-field>

                  <v-textarea
                    v-model="contactForm.message"
                    label="Message / Opportunity Details *"
                    variant="outlined"
                    density="compact"
                    rows="4"
                    rounded="lg"
                    class="mb-4"
                    required
                  ></v-textarea>

                  <v-btn
                    type="submit"
                    color="primary"
                    block
                    rounded="lg"
                    size="large"
                    prepend-icon="mdi-send"
                    class="text-none font-weight-bold"
                  >
                    Send Message
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </div>

      </v-container>
    </v-main>

    <!-- Simple Footer -->
    <v-footer color="white" border-t class="py-4 px-md-10 text-caption text-medium-emphasis d-flex justify-space-between">
      <div>© 2026 Kaday Htay Win. Designed with Vuetify M3 Design.</div>
      <div class="d-flex ga-4">
        <a href="#about" class="text-decoration-none text-medium-emphasis">Back to Top</a>
        <a href="https://github.com/kadayhtaywin9" target="_blank" class="text-decoration-none">GitHub</a>
        <a href="https://linkedin.com" target="_blank" class="text-decoration-none text-medium-emphasis">LinkedIn</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Skills Data & Tabs
const skillTab = ref('languages')
const languages = [
  { name: 'JavaScript (ES6+) / TypeScript', level: 90 },
  { name: 'Python (Django / FastAPI / Scikit-learn)', level: 85 },
  { name: 'Java (Data Structures & OOP)', level: 85 },
  { name: 'C / C++ (Systems Programming)', level: 75 },
  { name: 'SQL (PostgreSQL, MySQL)', level: 80 },
  { name: 'HTML5 / CSS3 / Tailwind', level: 95 }
]
const frameworks = [
  { name: 'Vue.js 3 / Vuetify', level: 90 },
  { name: 'React.js / Next.js', level: 80 },
  { name: 'Node.js / Express', level: 82 },
  { name: 'ASP.NET Core', level: 78 }
]
const tools = [
  { name: 'Git & GitHub', level: 92 },
  { name: 'Docker / Linux', level: 80 },
  { name: 'PostgreSQL / Supabase', level: 85 },
  { name: 'AWS / Cloud Deployment', level: 72 }
]

const currentSkills = computed(() => {
  if (skillTab.value === 'languages') return languages
  if (skillTab.value === 'frameworks') return frameworks
  return tools
})

const concepts = [
  'Agile / Scrum',
  'Object-Oriented Design',
  'CI/CD Pipelines',
  'Unit Testing (Jest, PyTest)',
  'Material Design 3',
  'System Architecture'
]

// Project Filter & Data
const projectFilter = ref('all')
const projectList = [
  {
    title: 'DevMetrics Analytics Platform',
    badge: 'Full-Stack',
    badgeColor: 'blue-darken-2',
    tagColor: 'primary',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    description: 'Real-time developer productivity tracker featuring Vue 3, Vuetify components, Node.js microservices, and interactive D3.js charts.',
    tech: ['Vue 3', 'Node.js', 'PostgreSQL']
  },
  {
    title: 'AlgoVisualizer Engine',
    badge: 'Web App',
    badgeColor: 'teal-darken-1',
    tagColor: 'teal',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    description: 'Interactive sorting and pathfinding algorithm visualizer with step-by-step playback, customizable speed, and memory usage tracking.',
    tech: ['TypeScript', 'React', 'Tailwind']
  },
  {
    title: 'Lightweight Key-Value Store',
    badge: 'Systems',
    badgeColor: 'purple-darken-1',
    tagColor: 'purple',
    category: 'systems',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'High-performance embedded key-value storage engine implemented in C++ featuring log-structured merge-tree (LSM) design and persistence.',
    tech: ['C++17', 'Systems', 'Google Test']
  }
]

const filteredProjects = computed(() => {
  if (projectFilter.value === 'all') return projectList
  return projectList.filter(p => p.category === projectFilter.value)
})

// Experience Timeline Data
const historyList = [
  {
    period: 'Sep 2025 - Present',
    dotColor: 'primary',
    role: 'Computer Engineering Peer Tutor / Teaching Assistant',
    institution: 'Department of Computer Engineering — University Of Technology (Yatanarpon CyberCity)',
    bullets: [
      'Mentor 40+ students weekly in Data Structures, Object-Oriented Programming, and Discrete Math.',
      'Conduct weekly code reviews for C++ and Java assignments prioritizing clean code practices.',
      'Collaborate with faculty to design automated grading scripts in Python saving 15+ grading hours per lab.'
    ]
  },
  {
    period: 'May 2024 - Aug 2024',
    dotColor: 'primary',
    role: 'Open Source Fellowship Contributor',
    institution: 'Open Source Dev Community',
    bullets: [
      'Submitted 12 pull requests to community-maintained web UI libraries focusing on accessibility (a11y) fixes.',
      'Authored comprehensive documentation for REST API integration benefiting 2,000+ developers.'
    ]
  },
  {
    period: '2022 - 2026 (Exp.)',
    dotColor: 'teal',
    role: 'B.E. in Computer Engineering',
    institution: 'University Of Technology (Yatanarpon CyberCity)— GPA: 3.92 / 4.00',
    bullets: [
      'Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Software Engineering Principles, Web Development, Computer Architecture, Operating Systems.'
    ]
  }
]

// Contact Form
const contactForm = reactive({
  name: '',
  email: '',
  message: ''
})

const sendMessage = () => {
  alert(`Thank you, ${contactForm.name}! Message sent.`)
  contactForm.name = ''
  contactForm.email = ''
  contactForm.message = ''
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
.border {
  border: 1px solid #e2e8f0 !important;
}
</style>