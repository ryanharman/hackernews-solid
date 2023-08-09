import { For, Show } from 'solid-js';
import { createRouteData, useParams, useRouteData } from 'solid-start';
import { CommentRender } from '~/components/Comment';
import { Summary } from '~/components/Summary';

export type PostResponse = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  type: string;
  url: string;
  domain: string;
  content: string;
  comments: Comment[];
  comments_count: number;
  isPost: boolean;
};

export type Comment = {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: Comment[];
};

export function routeData() {
  const params = useParams();
  return createRouteData(async () => {
    const post: PostResponse = await fetch(
      `https://node-hnapi.herokuapp.com/item/${params.id}`
    ).then((r) => r.json());
    return post;
  });
}

export default function Home() {
  const data = useRouteData();

  return (
    <Show when={data()} fallback={<div>loading...</div>}>
      <Summary item={data() as PostResponse} />
      <div class="w-full border-b my-6 border-slate-400" />
      <For each={(data() as PostResponse).comments}>
        {(comment) => (
          <div class="mb-6">
            <CommentRender comment={comment} nestedLevel={0} />
          </div>
        )}
      </For>
    </Show>
  );
}
