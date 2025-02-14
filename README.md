# **10K Step Path Generator**
# 🚚 Repository Migration Announcement 🚚

Hello everyone!

We are excited to announce that our repository is moving to a new home! Starting today, we will be migrating from GitHub to GitLab to better serve our community and improve our development workflow.

## New Repository Location

You can find our new repository at:

[**GitLab: itishermann/10k-steps**](https://gitlab.com/itishermann/10k-steps.git)

## What This Means for You

- **Contributors**: Please update your remote URLs to point to the new GitLab repository.
- **Users**: If you have cloned the repository, make sure to update your local clone to the new URL.
- **Issues and Pull Requests**: We will be transferring open issues and pull requests to the new repository. Please bear with us during this transition.

## Why GitLab?

GitLab offers a comprehensive suite of tools for version control, issue tracking, and CI/CD, all integrated into a single platform. This move will help us streamline our development process and provide a better experience for our contributors and users.

## Thank You!

We appreciate your support and understanding during this transition. If you have any questions or run into issues, please don't hesitate to reach out.

Happy coding!

---

*Please note that the GitHub repository will be archived soon. Make sure to update your bookmarks and clone URLs accordingly.*

---

10K Step Path Generator is a fitness app that helps users achieve their daily walking goals by generating personalized looped walking routes. Using **OpenRouteService API**, it calculates paths tailored to your step length and visualizes them on an interactive **Leaflet map**. With support for **GPX downloads**, offline use, and persistent local storage, this app makes fitness simple and fun!

---


## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [How It Works](#how-it-works)
6. [Contributing](#contributing)
7. [License](#license)

---

## **Features**
- Create looped walking paths to meet daily step goals.
- Leverages **OpenRouteService API** for optimized paths.
- Step-length calculator based on height and gender.
- Visualize routes on an interactive **Leaflet map**.
- Save routes in a **Dexie database (IndexedDB)** for persistence.
- Download GPX files for offline navigation.
- Customizable routes and user preferences.

---

## **Technologies Used**
- **[Bun](https://bun.sh/):** An ultra-fast all-in-one JavaScript runtime used for developing this application.
- **[Mise](https://github.com/jdx/mise):** An dev-tools manager for nearly everything.
- **OpenRouteService API:** For route generation and optimization.
- **Leaflet.js:** For map visualization and interactivity.
- **Dexie.js:** For storing routes and persistent data in IndexedDB.
- **React & Next.js:** For building the app’s interactive user interface.

---

## **Installation**

1. Clone the repository:
    ```bash
    git clone https://gitlab.com/itishermann/10k-steps.git
    cd 10k-steps
    ```
2. Ensure [Bun](https://bun.sh/) is installed.  
   Check with:
    ```bash
    bun -v
    ```
   If not installed, install the version 1.2.0 or higher with mise:
    ```bash
      mise trust
      mise install bun
    ```

3. Install dependencies using Bun:
    ```bash
    bun install
    ```
4. Start the development server:
    ```bash
    bun dev
    ```
5. Open your browser and navigate to `http://localhost:3000` to view your app.

---

## **Usage**
1. Input your height and gender to calculate your step length.
2. Set your desired step goal (default: 10,000 steps).
3. Generate a personalized walking route based on your preferences.
4. Preview the route on the map.
5. Save the route to local storage or download the GPX file for offline navigation.
6. Hit the path and start walking toward your fitness goals!

---

## **How It Works**
1. **Step Length Calculation**: The app calculates your individual step length based on height and gender to optimize path planning.
2. **Path Generation**: Uses the **OpenRouteService API** to calculate looped walking paths that match your desired step count.
3. **Visualization**: Routes are displayed on a **Leaflet.js map**, allowing you to easily preview the distance and terrain.
4. **Storage**: Routes are stored in an IndexedDB-powered **Dexie database** for future retrieval.
5. **GPX File Export**: Save routes as GPX files for offline use on compatible fitness trackers and apps.

---

## **Contributing**
Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch (`git checkout -b your-feature-branch`).
3. Make your changes and commit (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin your-feature-branch`) and open a pull request.

---

## **License**
This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to customize this file further based on your preferences or additional features you might add! Let me know if you'd like specific sections expanded. 😊
