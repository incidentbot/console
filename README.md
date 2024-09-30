# Incident Bot Console

A web interface for [Incident Bot](https://github.com/incidentbot/incidentbot).

Built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [TanStack Query](https://tanstack.com/query), [TanStack Router](https://tanstack.com/router) and [Chakra UI](https://chakra-ui.com/).

## Usage

Since the console depends on connectivity to the Incident Bot API, your setup should meet the following requirements:

* The API must be enabled for your Incident Bot deployment. See the documentation [here](https://docs.incidentbot.io/configuration/#api).
* All API routes within the backend application are only meant to serve the console application. As such, they are secured using JWT auth. They will not work otherwise.
* It is your responsibility to determine how best to expose Incident Bot's API, but the API endpoint must be reachable from the client application in order for it to work.

## Building and Deploying

You will need to build your own image using the Dockerfile in this repository, passing in the following args:

* `VITE_API_URL` - The URL where the API for Incident Bot is made available.
* `NODE_ENV` - example: `production`

Once the image has been built, you can deploy it using the Helm chart.

There is a default base image you may reference that adds the repository contents but does not run `npm run build`, allowing you to reference this base image, provide this argument, and build downsteam without having to clone this repository.

Example:

```dockerfile
FROM eb129/incidentbot-console:v0.1.0 AS build
WORKDIR /app
ARG VITE_API_URL=${VITE_API_URL}
RUN npm run build
FROM nginx:1
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf
```

## Development

Install the required version of Node.js:

```bash
# If using fnm
fnm install

# If using nvm
nvm install
```

Once the installation is complete, switch to the installed version:

```bash
# If using fnm
fnm use 

# If using nvm
nvm use
```

Install required packages:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Interface is available at  http://localhost:5173/ by default.

This is purely for local development and doesn't build any files. For production purposes, reference the Dockerfile or check out the contents of `package.json` to see the recommended method for compiling.

## Code Structure

* `src` - The main UI code.
* `src/assets` - Static assets.
* `src/client` - The generated OpenAPI client.
* `src/components` - UI components.
* `src/hooks` - Custom hooks.
* `src/routes` - Routes.
* `src/theme.tsx` - The Chakra UI custom theme.
* `tests` - Any configured tests.

## End-to-End Testing with Playwright

The UI includes initial end-to-end tests using Playwright. To run the tests, you need to have the Docker Compose stack running. Start the stack with the following command:

```bash
docker compose up -d
```

Then, you can run the tests with the following command:

```bash
npx playwright test
```

You can also run your tests in UI mode to see the browser and interact with it running:

```bash
npx playwright test --ui
```

To stop and remove the Docker Compose stack and clean the data created in tests, use the following command:

```bash
docker compose down -v
```

To update the tests, navigate to the tests directory and modify the existing test files or add new ones as needed.

For more information on writing and running Playwright tests, refer to the official [Playwright documentation](https://playwright.dev/docs/intro).
