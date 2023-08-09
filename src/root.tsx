import './root.css';
// @refresh reload
import { Suspense } from 'solid-js';
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <div class="flex flex-col justify-start items-center p-16 bg-zinc-100 min-h-screen text-zinc-800">
              <A href="/" class="pb-6">
                <h1 class="text-xl font-bold">Hacker News</h1>
              </A>
              <main class="max-w-3xl w-full space-y-4">
                <Routes>
                  <FileRoutes />
                </Routes>
              </main>
            </div>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
