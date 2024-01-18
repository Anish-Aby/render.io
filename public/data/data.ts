import { blogsTable } from "./blogsTable";

export const blogs = [
  {
    id: 0,
    author: "Anish Aby",
    date: "December 02, 2023",
    readTime: "6 mins read",
    blogTitle: "Hashnode's Feed Architecture",
    blogSubTitle: "How Hashnode calculates feeds on scale and serverless",
    likesCount: 12,
    commentsCount: 5,
    category: "Technology",
    isFeatured: true,
    blogImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1699961744035/51aa7ebc-e811-44bd-97e1-ed00e3506fbc.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    blogContent: 1,
  },

  {
    id: 1,
    blogTitle: "Setting Up Post Schedules with EventBridge Scheduler & CDK",
    blogSubTitle: "How Hashnode calculates feeds on scale and serverless",
    readTime: "6 mins read",
    likesCount: 7,
    commentsCount: 5,
    author: "Sarthak Pattnaik",
    date: "December 02, 2023",
    category: "Technology",
    isFeatured: false,
    blogImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1705398436877/326e3f9d-8632-4949-be8c-13657e8b4fe3.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    blogContent: function () {
      return blogsTable[this.id];
    },
  },

  {
    id: 2,
    blogTitle: "Day 4 of 100days of code.🙆‍♀️😅",
    blogSubTitle:
      "Hello 💕, and welcome to Day 4 of my challenge. Today, I'm taking it a step further💪.",
    readTime: "6 mins read",
    likesCount: 11,
    commentsCount: 0,
    author: "Susan",
    date: "December 02, 2023",
    category: "Technology",
    isFeatured: false,
    blogImage:
      "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/UYsBCu9RP3Y/upload/60bb80b1ff6d7904fb7e2c771b83697e.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    blogContent: function () {
      return blogsTable[this.id];
    },
  },

  {
    id: 3,
    blogTitle: "How To Create A Custom 404 Page In Next Js App Router",
    blogSubTitle: "How Hashnode calculates feeds on scale and serverless",
    readTime: "6 mins read",
    likesCount: 0,
    commentsCount: 0,
    author: "Ben Adams",
    date: "December 02, 2023",
    category: "Technology",
    isFeatured: true,
    blogImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1705575636475/46e03408-a5a1-48eb-b534-36c4445f73c5.gif?w=1600&h=840&fit=crop&crop=entropy&auto=format,compress&gif-q=60&format=webm",
    blogContent: function () {
      return blogsTable[this.id];
    },
  },

  {
    id: 4,
    blogTitle: "GIT Cheat Sheet",
    blogSubTitle: "Commands",
    readTime: "6 mins read",
    likesCount: 5,
    commentsCount: 0,
    author: "KnightBits",
    date: "December 02, 2023",
    category: "Technology",
    isFeatured: false,
    blogImage:
      "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/KPAQpJYzH0Y/upload/6da76f18f3503c2ae470a187b6b754fe.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    blogContent: function () {
      return blogsTable[this.id];
    },
  },

  {
    id: 5,
    blogTitle: "Navigating the World of CDNs",
    blogSubTitle: "How Hashnode calculates feeds on scale and serverless",
    readTime: "6 mins read",
    likesCount: 10,
    commentsCount: 0,
    author: "Dan Richards",
    date: "December 02, 2023",
    category: "Technology",
    isFeatured: false,
    blogImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1705581288211/8e23e522-43de-45a0-97ef-44908ba44bb1.webp?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    blogContent: function () {
      return blogsTable[this.id];
    },
  },
];
