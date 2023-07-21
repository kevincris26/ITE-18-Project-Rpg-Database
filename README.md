# RPG Database - Project README

Welcome to the RPG Database project! This README file will guide you through the setup, configuration, and usage of this application. The RPG Database is a web application for exploring and discovering various role-playing games (RPGs). It provides a list of RPGs, detailed information about each game, and allows users to log in to access additional features.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Contributing](#contributing)

## Project Overview

The project is built using Next.js for the frontend and Strapi as the headless CMS (Content Management System) to manage the RPG data. It uses Tailwind CSS for styling and SWR for data fetching. User authentication is implemented using JSON Web Tokens (JWT) with the help of cookies.

The main components of the project are as follows:

1. **Layout Component (components/Layout.js):** This component represents the layout of the application and contains the navigation bar, which displays the RPG logo, links to home and RPGs pages, and login/logout functionality.

2. **Nav Component (components/Nav.js):** This component provides the navigation bar that is included in the Layout. It allows users to navigate to the Home, RPGs, and Login/Logout pages. Users can log in with their credentials to access additional features.

3. **Rpgs Component (components/Rpgs.js):** This component displays the list of RPGs fetched from the Strapi CMS. Each RPG item is a link to the detailed page of that specific RPG.

4. **Rpg Component (pages/rpg/[slug].js):** This page displays detailed information about a specific RPG based on its slug (unique identifier). It fetches data from the Strapi CMS.

5. **Home Component (pages/index.js):** This is the Home page of the application, which welcomes users to the RPG Database.

6. **RpgsList Component (pages/rpgs.js):** This page displays a paginated list of RPGs. Users must log in to view the RPGs list.

7. **Auth Context (lib/authContext.js):** This is a custom React context used to manage the user's authentication state.

8. **Authentication Helper Functions (lib/auth.js):** These functions handle user authentication, set and unset tokens, and retrieve user data from cookies.

9. **Fetcher Function (lib/api.js):** This function is used to fetch data from the Strapi API.

10. **Next.js Configuration Files:** The project includes Next.js configuration files, such as _app.js and _document.js.

11. **Tailwind CSS Configuration File (tailwind.config.js):** The Tailwind CSS configuration file contains the custom theme and plugins.

## Requirements

Before running the application, make sure you have the following software installed on your system:

- Node.js (version 14.x or higher)
- npm (Node Package Manager)

## Installation

To set up the RPG Database project, follow these steps:

1. Clone the repository to your local machine using Git:

git clone <repository-url>

2. Change to the project directory:

cd rpg-database


3. Install the project dependencies using npm:

npm install


## Configuration

Before running the application, you need to configure the Strapi API URL. Open the .env.local file in the root of the project and replace the placeholder with your Strapi API URL:

NEXT_PUBLIC_STRAPI_URL=<your-strapi-api-url>


Make sure to start the Strapi server and have the RPG data available at the specified API URL.

## Usage

To run the RPG Database application locally, use the following command:

npm run dev


This command will start the Next.js development server, and you can access the application in your web browser at http://localhost:3000.

## Contributing

We welcome contributions to the RPG Database project! If you have any bug fixes, enhancements, or new features to add, please feel free to open an issue or submit a pull request on GitHub.


The RPG Database project is open-source.
