import {
  Atom,
  BookUser,
  Building2,
  CircleDollarSign,
  Eclipse,
  HandPlatter,
  Inbox,
  LayoutDashboard,
  Megaphone,
  Rabbit,
  Settings,
  Sheet,
  UserRoundCog,
  Users2,
} from "lucide-react";

export const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Atom,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Eclipse,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Rabbit,
      plan: "Free",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      permission: "dashboard",
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //     icon: History,
      //     description: "View your recent prompts",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //     icon: Star,
      //     description: "Browse your starred prompts",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //     icon: Settings2,
      //     description: "Configure your playground",
      //   },
      // ],
    },
    {
      title: "Leads",
      url: "/leads",
      icon: Users2,
      permission: "leads",
    },
    {
      title: "Contact",
      url: "/contact",
      icon: BookUser,
      permission: "contact",
    },
    {
      title: "Account",
      url: "/account",
      icon: Building2,
      permission: "company",
    },
    {
      title: "Campaigns",
      url: "/campaigns",
      icon: Megaphone,
      permission: "campaigns",
    },
    {
      title: "Opportunities",
      url: "/opty",
      icon: CircleDollarSign,
      permission: "opportunity",
    },
    {
      title: "Orders",
      url: "/orders",
      icon: Inbox,
      permission: "orders",
    },
    {
      title: "Service Requests",
      url: "/service-request",
      icon: HandPlatter,
      permission: "ticket",
    },
    {
      title: "User Management",
      url: "/user-management",
      icon: UserRoundCog,
      permission: "user",
    },
    {
      title: "Reports",
      url: "/reports",
      icon: Sheet,
      permission: "reports",
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      permission: "*",
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
  // searchResults: [
  //   {
  //     title: "Routing Fundamentals",
  //     teaser:
  //       "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
  //     url: "#",
  //   },
  //   {
  //     title: "Layouts and Templates",
  //     teaser:
  //       "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
  //     url: "#",
  //   },
  //   {
  //     title: "Data Fetching, Caching, and Revalidating",
  //     teaser:
  //       "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
  //     url: "#",
  //   },
  //   {
  //     title: "Server and Client Composition Patterns",
  //     teaser:
  //       "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
  //     url: "#",
  //   },
  //   {
  //     title: "Server Actions and Mutations",
  //     teaser:
  //       "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
  //     url: "#",
  //   },
  // ],
};
