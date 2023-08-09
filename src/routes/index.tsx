import { For, Show } from 'solid-js';
import { useRouteData, useSearchParams } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { Summary } from '~/components/Summary';

export type NewsResponse = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
  isPost?: boolean;
};

export function routeData() {
  const [params] = useSearchParams();

  return createServerData$(
    async (page) => {
      const items: NewsResponse[] = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      ).then((r) => r.json());
      return items;
    },
    { key: () => params.page || 1 }
  );
}

export default function Home() {
  const data = useRouteData();
  const [params, setParams] = useSearchParams();

  function prevPage() {
    if (Number(params.page) === 1 || !params.page) return;
    setParams({ page: +params.page - 1 });
  }

  function nextPage() {
    setParams({ page: +params.page + 1 });
  }

  return (
    <Show when={data()} fallback={<div>loading...</div>}>
      <For each={data() as NewsResponse[]}>
        {(item) => <Summary item={item} />}
      </For>
      <div class="flex justify-between mt-4">
        <button class="hover:underline" onclick={prevPage}>
          Prev page
        </button>
        <button class="hover:underline" onclick={nextPage}>
          Next page
        </button>
      </div>
    </Show>
  );
}
