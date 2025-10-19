# 📰 News Aggregator (Frontend)

A small React + TypeScript single-page app created as a frontend for a news-aggregator demo. The app is container-ready and served using Nginx in the provided Dockerfile.

## 🚀 Getting started

These instructions help you run the app locally for development and build a production image with Docker.

### Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- Docker (optional — for containerized production build)

### Local development

Install dependencies and start the dev server:

```bash
npm install
npm start
```

The development server runs at [http://localhost:3000](http://localhost:3000) by default.

Available npm scripts (from `package.json`):

- `npm start` - start the development server
- `npm run build` - create an optimized production build in the `build/` folder
- `npm test` - run the test runner
- `npm run eject` - eject from Create React App (one-way operation)

### 🐳 Docker

Build the Docker image (this produces a static build served by Nginx):

```bash
npm run build
docker build -t news-aggregator .
```

Run the container locally and map port 80 in the container to 3000 on the host:

```bash
docker run -p 3000:80 news-aggregator
```

Then open [http://localhost:3000](http://localhost:3000)

## 📁 Project structure (important files)

```text
src
 ├─ components  # contains encapsulated, isolated UI units 
    ├─ app         # serves as the root UI component
    ├─ news        # news related UI components
 ├─ services    # pure business logics 
 ├─ shared      # application level units
 ├─ utils       # any reusable tools across the application
    
```

## 🛠 Tech stack

- React 19 + TypeScript
- Tailwind CSS
- React Query (@tanstack/react-query) for data fetching/cache
- Create React App (react-scripts)

## 📌 Notes

### How to add a News API as a new source

This application applies the Strategy Pattern to remain open for extension but closed for modification (in line with the SOLID principles) when integrating support for new news APIs. To achieve this goal:

- Add a new implementation of the `Source` interface to the `AVAILABLE_NEWS_SOURCES` array, located at: `src/service/news/available-news-source.ts`
- The `Source` interface provides:

```typescript
export interface Source {
    name: string;
    displayName: string;
    /**
     * Returns the API endpoint URL for the source based on the provided filters.
     * @param filters 
     * @returns 
     */
    apiEndpoint: (filters: Filters) => string;
    /**
     * Parses the raw API response into a more usable format.
     * @param raw api response
     * @returns 
     */
    apiResponseParser: (raw: any) => Article[];

    /**
     * Determines if the source can support the given filters.
     * @param filters 
     * @returns 
     */
    canSupportFilters: (filters: Filters) => boolean;
}
```

- Implement your instance to specify how the application should behave in the following cases:
  - **Generating the API endpoint URL** by implementing the `apiEndpoint` method
  - **Mapping the API response** into the Article interface by implementing the `apiResponseParser` method
  - **Determining filter compatibility** by implementing the `canSupportFilters` method, which indicates whether this API can handle the current filter

---
