import { Component } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgOptimizedImage } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-profile-stacks',
  standalone: true,
  imports: [NzToolTipModule, NgOptimizedImage, NzImageModule],
  templateUrl: './profile-stacks.component.html',
  styleUrl: './profile-stacks.component.scss'
})
export class ProfileStacksComponent {
  stacks: any = [
    {
      name: "Angular",
      link: "../../../assets/icons/stacks/angular.svg",
      description: `My first ever JavaScript / TypeScript framework that I have mastered 
          during my first internship, continue being utilized in my second internship 
          and remained as one of my main framework aside from React's NextJS as this
          framework offers better management capabilities for enterprise-level applications.`,
      offset: 40,
      opacity: 'selected'
    },
    {
      name: "NextJS",
      link: "../../../assets/icons/stacks/next.svg",
      description: `My second JavaScript / TypeScript framework that I have explored on
          and is in the progress of mastering due to the fact that this framework being beginner-friendly
          than the Angular framework (true but to a certain extend) and most important of all it offers 
          more support in terms of animation libraries (such as Motion Framer) which Angular lacks.`,
      offset: 55,
      opacity: 'selected'
    },
    {
      name: "SCSS",
      link: "../../../assets/icons/stacks/scss.svg",
      description: `An extended version of CSS that has various different features that provides the css
                code with more structure and readability which I have used a lot during both my internships, freelancing
                and for assignments which led me to be very well-versed in this aspect.`,
      offset: 35,
      opacity: 'selected'
    },
    {
      name: "Tailwind",
      link: "../../../assets/icons/stacks/tailwind.svg",
      description: `A CSS framework that simplifies the process for coding the components css as it only 
                requires defining the css in the HTML page of the component, reducing the sizes of css related files,
                making it very efficient and time-saving.`,
      offset: 30,
      opacity: 'selected'
    },
    {
      name: "Java",
      link: "../../../assets/icons/stacks/java.svg",
      description: `A high-level, class-based OOP language that I have utilized for developing various different
                type of applications that include Enterprise-Level application (Java EE), Desktop Applications (Swing), 
                and Backend Development (Java Spring Boot).`,
      offset: 30,
      opacity: 'selected'
    },
    {
      name: "Firebase",
      link: "../../../assets/icons/stacks/firebase.svg",
      description: `A great access to cloud services by Google that is integral to my portfolio, offering 
                essential tools for NoSQL Cloud Database storage, application hosting, deployment, and streamlined user 
                authentication, facilitating seamless project development and management.`,
      offset: 35,
      opacity: 'selected'
    },
    {
      name: "GitHub",
      link: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
      description: `GitHub stands as a cornerstone in my portfolio, serving as the hub where I store, manage,
                and showcase my code. It's an essential tool woven into both my professional ventures and personal projects, 
                elevating them with meticulously crafted README.md files that captivate and inform.`,
      offset: 40,
      opacity: 'selected'
    },
    {
      name: "Python",
      link: "../../../assets/icons/stacks/python.svg",
      description: `Despite Python's reputation as a highly versatile language suitable for a wide range of applications, 
                I have only been utilizing it in developing AI models and APIs. This preference is largely influenced by the 
                vibrant community, which consistently introduces new libraries and updates, enhancing Python's capabilities.`,
      offset: 90,
      opacity: 'selected'
    },
    {
      name: "TensorFlow",
      link: "../../../assets/icons/stacks/tensorflow.svg",
      description: `A free and open-source software library for machine learning and artificial intelligence, which I have
                personally utilized in building Deep Learning models and explored on the many different pre-trained models' codes
                offered in this library.`,
      opacity: 'selected'
    },
    {
      name: "NodeJS",
      link: "../../../assets/icons/stacks/nodejs.svg",
      description: `Node.js is a cross-platform, open-source JavaScript runtime environment which I have utilized in
                creating the back-end for web applications, and in the context of AI Model Development, it is more used on
                creating an API for the model to be callable from the front-end.`,
      opacity: 'selected'
    },
    {
      name: "Azure Functions",
      link: "../../../assets/icons/stacks/azure.svg",
      description: `An event-driven, serverless compute platform that I've used a serverless compute platform for the 
                ClassInsight project's transcribe video API. It's triggered on demand, making it efficient, but it can only 
                handle videos up to 20 minutes long due to the limitations imposed.`,
      opacity: 'selected'
    },
    {
      name: "Azure OpenAI",
      link: "../../../assets/icons/stacks/openai.svg",
      description: `A REST API which includes language models such as GPT-3 and GPT-4, I've seamlessly integrated it 
                into the ClassInsight project, facilitating the summarization of extensive two-hour lectures into concise, 
                digestible content, condensing key points into a five-minute read, enhancing learning efficiency.`,
      opacity: 'selected'
    },
    {
      name: "MySQL",
      link: "../../../assets/icons/stacks/mysql.svg",
      description: `My first Relational DBMS and have continued to use it in both work and hobby projects
                alike. It is powerful compared to some NoSQL databases due to unique functionalities offered, such as
                stored procedures, and etc.
                `,
      opacity: 'selected'
    },
    {
      name: "Firebase",
      link: "../../../assets/icons/stacks/firebase.svg",
      description: `A great access to cloud services by Google that is integral to my portfolio, offering 
                essential tools for NoSQL Cloud Database storage, application hosting, deployment, and streamlined user 
                authentication, facilitating seamless project development and management.`,
      opacity: 'selected'
    },
    {
      name: "Azure CosmoDB",
      link: "../../../assets/icons/stacks/cosmodb.png",
      description: `Can't really say I am very well-versed with this DBMS as I have only utilized a handful of
                times, mostly for Azure Related Hackathons. Even so, one advantage I can see when compared to traditional
                databases are the ability to scale and efficient global distribution.`,
      opacity: 'selected'
    },
    {
      name: "MongoDB",
      link: "../../../assets/icons/stacks/mongodb.svg",
      description: `Another NoSQL DBMS that I have utilized in conjunction with Angular and React frameworks for
                personal projects and work. But, compared to MySQL, this is a bit lesser and though the case, from using it,
                I can see its viability in terms of being document-oriented (JSON-like), making it easy for handling.`,
      opacity: 'selected'
    },
  ]
  animationPlayed: boolean = false;
  fallback = "data:image/png;base64,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";

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.playStackAnimation();
    }, 1000)
  }

  // changeStack(filterValue: string) {
  //   // Update the state of the filters array
  //   this.filters.forEach((filter: any) => {
  //     filter.state = filter.shorthand === filterValue ? "Active" : "Inactive";
  //   });

  //   stacks.forEach((category: any) => {
  //     category.languages.forEach((language: any) => {
  //       language.opacity = 'unselected';
  //     });
  //   });

  //   if (filterValue == "All") {
  //     // If 'All' is selected, set opacity of all languages to 'selected'
  //     stacks.forEach((category: any) => {
  //       category.languages.forEach((language: any) => {
  //         language.opacity = 'selected';
  //       });
  //     });
  //   } else {
  //     // Filter the stacks array based on the shorthand
  //     const filteredCategory = stacks.find((stack: any) => stack.shorthand === filterValue);

  //     // Set opacity of languages in the filtered category to 'selected'
  //     filteredCategory.languages.forEach((language: any) => {
  //       language.opacity = 'selected';
  //     });
  //   }
  // }

  removeAnimationInlineStyles() {
    setTimeout(() => {
      const filterElements = document.querySelectorAll('.profile-stack-header-filter');
      filterElements.forEach(element => {
        element.removeAttribute('style');
      });

      // const stackElements = document.querySelectorAll('.profile-stack-icon-container');
      // stackElements.forEach(element => {
      //   element.removeAttribute('style');
      // });
    }, 5000)
  }

  playStackAnimation() {

    // if (this.animationPlayed == false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    //   anime({
    //     targets: '.profile-stack-header-filter',
    //     translateX: ['800px', 0], // Move from left (-100%) to current position (0)
    //     opacity: [0, 1], // Fade from transparent (0) to opaque (1)
    //     delay: anime.stagger(200, { start: 500 }), // Use easing for smoother animation
    //   });

    //   anime({
    //     targets: '.profile-stack-icon-container',
    //     translateY: ['500px', 0], // Move from left (-100%) to current position (0)
    //     delay: anime.stagger(150, { start: 500 }), // Use easing for smoother animation
    //   });

    //   this.removeAnimationInlineStyles();
    //   this.animationPlayed = true;
    // }
  }
}
