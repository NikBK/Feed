# Feed - Social Media Application

## Overview

Feed is a social media application where users can connect, share images, and engage with each other. Built with React + Vite, the application leverages AppWrite for backend functionalities, including authentication, storage, file upload, and database management. Tanstack Query is used for efficient data fetching.

## Features

1. **User Authentication:**
   - Users can sign up and log in using their email accounts.

2. **Post Creation:**
   - Create posts with images, captions, locations, and tags.

3. **Home Section:**
   - View a feed of posts from different users.
   - Like and save posts directly from the home feed.
   - Infinite scroll for a seamless browsing experience.

4. **Saved Posts:**
   - Access a separate section to view all saved posts.

5. **Explore Section:**
   - Search for posts based on keywords or tags.
   - Infinite scroll for an endless exploration.

6. **Create Post Page:**
   - Dedicated page for users to easily create and share new posts.

7. **Post Management:**
   - Users can edit and delete their own posts.
   - View profiles of other users as well as their own.

## Tech Stack

- **Frontend Tools and Dependencies:**
  - React
  - TypeScript
  - Vite
  - Tanstack Query
  - TailwindCSS
  - React DropZone

- **Backend:**
  - AppWrite (Authentication, Storage, Database)

## AppWrite Configuration

Ensure that you have AppWrite configured with the necessary credentials and settings for authentication, storage, and database operations. Update the AppWrite configuration in the application accordingly.

## Tanstack Query Integration

Tanstack Query is seamlessly integrated for efficient data fetching. Queries and mutations are defined in the queries file, allowing for a clean and maintainable data management layer.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests to improve the application.

## License

This project is licensed under the MIT License
