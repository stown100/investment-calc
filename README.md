# Investment Calculator

This project is a React-based investment calculator application. It allows users to manage a list of investment projects, view a summary of their total and active investments, and calculate potential returns over various periods based on their selected projects.

## Features

-   **Project Management:** Add, view, and delete investment projects with details such as name, annual percentage, start date, and invested amount.
-   **Investment Summary:** Displays a quick overview of total projects, average annual percentage, total invested amount, and active investments.
-   **Return Calculator:** Calculate potential returns for selected projects over predefined periods (e.g., day, week, month, year, etc.).
-   **Local Storage Persistence:** All project data is saved in your browser's local storage, ensuring data persists across sessions.

## Technology Stack

-   **React 19:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool that provides a lightning-fast development experience.
-   **Mantine:** A React components library for building accessible and customizable user interfaces.
-   **Zustand:** A small, fast, and scalable bear-bones state-management solution.
-   **dayjs:** A minimalist JavaScript library for parsing, validating, manipulating, and formatting dates.
-   **uuid:** For generating unique IDs for projects.
-   **ESLint:** For linting and ensuring code quality.
-   **Sass:** CSS preprocessor for styling.

## Installation

To get a copy of the project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url> # Replace <repository_url> with the actual URL
    cd investment-calc
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

After installing the dependencies, you can run the application in development mode:

```bash
npm run dev
```

This will start the development server, usually at `http://localhost:5173`. You can then open this URL in your web browser.

## Project Structure

The project follows a feature-sliced design methodology, organizing code by features and entities.

-   `src/app/`: Contains application-level configurations and routing.
-   `src/entities/`: Defines core business entities like `project`, including its model (store, sample data, types) and UI components.
-   `src/features/`: Implements specific features such as adding a project, the calculator, and investment summary. Each feature has its own model and UI components.
-   `src/pages/`: Holds page-level components that compose features and entities to form complete views.
-   `src/shared/`: Contains reusable utilities, UI elements, and constants that are shared across the application.
-   `src/widgets/`: Larger UI compositions that combine multiple features or entities.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or want to contribute to the codebase, please feel free to open an issue or submit a pull request.
